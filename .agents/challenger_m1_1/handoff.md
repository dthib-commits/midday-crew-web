# Handoff Report — challenger_m1_1

**Task**: Empirical Challenge of Milestone 1: Routing Integrity, Invoicing & Business Rules  
**Parent Conversation ID**: `98f2c2df-d5b7-4184-9482-d1ebefd0829b`  
**Working Directory**: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/challenger_m1_1`  
**Application Directory**: `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`  
**Type**: Hard Handoff  
**Verdict**: ❌ **REQUEST_CHANGES**

---

## 1. Observation

Direct empirical execution of the adversarial challenge test harness (`scripts/challenge_m1_ssr_integrity.mjs`) against the React Router 7 SSR server build (`./build/server/index.js`) yielded the following verbatim results:

### 1.1 Invoicing Redirect Edge Cases (22/22 Tests PASSED)
- `GET /checkout` -> `HTTP 307` (`Location: https://hatcompanydallas.myshopify.com/checkout`)
- `POST /checkout` -> `HTTP 307` (`Location: https://hatcompanydallas.myshopify.com/checkout`)
- `GET /checkouts/c1` -> `HTTP 307` (`Location: https://hatcompanydallas.myshopify.com/checkouts/c1`)
- `POST /checkouts/c1` -> `HTTP 307` (`Location: https://hatcompanydallas.myshopify.com/checkouts/c1`)
- `GET /cart/123456:1` -> `HTTP 307` (`Location: https://hatcompanydallas.myshopify.com/cart/123456:1`)
- `POST /cart/123456:1` -> `HTTP 307` (`Location: https://hatcompanydallas.myshopify.com/cart/123456:1`)
- `GET /checkouts/c1?key=val&utm_source=meta&locale=en-US` -> `HTTP 307` (`Location: https://hatcompanydallas.myshopify.com/checkouts/c1?key=val&utm_source=meta&locale=en-US`)
- `POST /checkouts/c1?key=val&utm_source=meta&locale=en-US` -> `HTTP 307`
- `GET /cart/123456:2,789012:1?note=Embroidery%20front%20and%20back&attributes[po]=PO-9912&locale=en` -> `HTTP 307` (all parameters decoded and verified identical)
- `POST /cart/123456:2,789012:1?note=Embroidery%20front%20and%20back&attributes[po]=PO-9912&locale=en` -> `HTTP 307`
- `GET /checkout?discount=SUMMER%20SALE&ref=email%2Bblast&symbol=%23vip%26priority` -> `HTTP 307`
- `POST /checkout?discount=SUMMER%20SALE&ref=email%2Bblast&symbol=%23vip%26priority` -> `HTTP 307`
- `GET /checkouts/c1/information/shipping_method?step=shipping` -> `HTTP 307`
- `POST /checkouts/c1/information/shipping_method?step=shipping` -> `HTTP 307`
- `GET /cart/clear` and `POST /cart/clear` -> `HTTP 307`

### 1.2 Blank Routes Resilience (12/12 Tests PASSED)
- `GET /blanks/nonexistent-model-xyz` -> `HTTP 404` (Clean 404 response without 500 crashes)
- `GET /blanks/fake-hat-123` -> `HTTP 404`
- `GET /blanks/richardson-999` -> `HTTP 404`
- `GET /blanks/invalid` -> `HTTP 404`
- `GET /blanks/unknown-model` -> `HTTP 404`
- `GET /blanks` -> `HTTP 200` (`CollectionPage` + `BreadcrumbList` schemas present, links to 6 models)
- `GET /blanks/richardson-112` -> `HTTP 200` (`Product` schema with offers + `BreadcrumbList`)
- `GET /blanks/richardson-115` -> `HTTP 200`
- `GET /blanks/sport-tek-stc26` -> `HTTP 200`
- `GET /blanks/sport-tek-stc27` -> `HTTP 200`
- `GET /blanks/comfort-colors-1717` -> `HTTP 200`
- `GET /blanks/comfort-colors-1566` -> `HTTP 200`

### 1.3 MOQ Compliance Across Rendered HTML (12 Route Failures Observed)
Direct inspection of SSR rendered HTML string output revealed 12 routes emitting outdated MOQ strings:
1. `app/root.tsx` (Line 30):
   ```tsx
   content: "Dallas TX contract manufacturer for custom headwear, embroidery, screen print & DTF. 3D puff embroidery on Ricoma multi-head machines. 24-unit minimums. Free mockups in 24 hours."
   ```
   Renders in `<meta name="description">` on `/sample-kit`, `/inspiration`, `/custom`, `/shop`, and `/lp/3d-puff`.
2. `app/routes/_index/route.tsx` (Line 160):
   ```tsx
   content: "Dallas TX industrial contract manufacturer for custom headwear, 3D puff embroidery, screen print & DTF on Ricoma commercial multi-head machines. 24-unit minimums."
   ```
3. `app/components/ui/PricingGuide.tsx` (Lines 110, 134, 155):
   - Line 110: `24 Hat Minimum Order`
   - Line 134: `20 Hat Minimum Order`
   - Line 155: `18 Hat Minimum Order`
   Rendered in the pricing table on the Home Page (`/`).
4. `app/routes/tx.$city.tsx` (Line 264):
   ```tsx
   <span className="hidden sm:inline">24-Unit Minimums</span>
   ```
   Rendered across all 7 Texas corridors (`/tx/dallas`, `/tx/fort-worth`, `/tx/arlington`, `/tx/plano`, `/tx/frisco`, `/tx/austin`, `/tx/houston`).
5. `app/components/forms/DigitalMockupModal.tsx` (Line 228):
   ```tsx
   <option value="24-48">24 - 48 (Minimum)</option>
   ```

---

## 2. Logic Chain

1. **Invoicing Redirect Semantics (F2)**:
   - Observation: All checkout and cart requests return HTTP 307 with `Location: https://hatcompanydallas.myshopify.com...`.
   - Inference: RFC 9110 Section 15.4.8 specifies that user agents must not rewrite the HTTP method on HTTP 307 redirections. This ensures that any customer or form submitting a POST to `/checkouts/*`, `/checkout`, or `/cart/*` preserves the POST verb when following the redirect to Shopify. Parameter encoding faithfully transfers all query parameters.
   - Conclusion: Invoicing redirect implementation is complete and robust.

2. **Blank Routes Resilience (F1)**:
   - Observation: All 6 blank models return HTTP 200; `/blanks` returns HTTP 200; nonexistent models return HTTP 404.
   - Inference: Defensive object mapping in `RegionalInquiryForm.tsx` (`utmAttribution || {}`) prevents runtime `TypeError` crashes, and flat routing in `blanks._index.tsx` satisfies the catalog overview requirement without shadowing the parameterized route.
   - Conclusion: Blank route implementation is complete and robust.

3. **MOQ Business Rule Compliance (F7)**:
   - Observation: `ORIGINAL_REQUEST.md` (R3) mandates "Minimum Order Quantity (MOQ): 12 units." `PROJECT.md` Feature F7 explicitly defines: "Canonical MOQ 12 units everywhere (fix 18 on lp.3d-puff, fix 24/48 on blanks.$model, root.tsx, FloatingSpecHud)".
   - Observation: `worker_m1` modified `lp.3d-puff.tsx`, `blanks.$model.tsx`, and `FloatingSpecHud.tsx`, but did not update `root.tsx`, `_index/route.tsx`, `PricingGuide.tsx`, `tx.$city.tsx`, or `DigitalMockupModal.tsx`.
   - Inference: Because `root.tsx` provides default meta tags and `PricingGuide.tsx` renders directly on the home page, the deployed application continues to advertise 18, 20, and 24-unit minimums to prospective customers and search crawlers, contradicting brand specifications.
   - Conclusion: Milestone 1 cannot be approved until MOQ harmonization is completed across all rendered HTML surfaces.

---

## 3. Caveats

- In accordance with the Review-Only constraint, `challenger_m1_1` did not modify application implementation files.
- The test harness `scripts/challenge_m1_ssr_integrity.mjs` was created to provide a repeatable, automated audit script for subsequent verification.
- Local sandboxed environment network isolation appropriately simulates Shopify external host redirects without requiring live external DNS resolution.

---

## 4. Conclusion & Verdict

**Verdict**: ❌ **REQUEST_CHANGES**

`worker_m1` must execute the following targeted remediations:
1. `app/root.tsx`: Replace `24-unit minimums.` with `12-unit minimums (1 dozen).` on line 30.
2. `app/routes/_index/route.tsx`: Replace `24-unit minimums.` with `12-unit minimums (1 dozen).` on line 160.
3. `app/components/ui/PricingGuide.tsx`: Replace `24 Hat Minimum Order`, `20 Hat Minimum Order`, and `18 Hat Minimum Order` with `12 Hat Minimum Order (1 Dozen MOQ)` on lines 110, 134, 155.
4. `app/routes/tx.$city.tsx`: Replace `24-Unit Minimums` with `12-Unit Minimums (1 Dozen)` on line 264.
5. `app/components/forms/DigitalMockupModal.tsx`: Replace `<option value="24-48">24 - 48 (Minimum)</option>` with `<option value="12-24">12 - 24 (1 Dozen MOQ)</option>` on line 228.

Once these updates are applied, re-building and executing `scripts/challenge_m1_ssr_integrity.mjs` will yield a clean 57/57 pass.

---

## 5. Verification Method

To independently verify these findings:

```bash
cd /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
npm run build
node scripts/challenge_m1_ssr_integrity.mjs
```

- **Pass Criterion**: All 57 checks pass (22/22 redirects, 12/12 blank routes, 23/23 MOQ compliance).
- **Invalidation Condition**: Any route emitting `24-unit minimum`, `18-unit minimum`, or `24/20/18 Hat Minimum Order` in rendered HTML.
