# Adversarial & Empirical Challenge Analysis: Milestone 1

**Agent**: `challenger_m1_1` (EMPIRICAL CHALLENGER — critic, specialist)  
**Parent Conversation ID**: `98f2c2df-d5b7-4184-9482-d1ebefd0829b`  
**Working Directory**: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/challenger_m1_1`  
**Application Directory**: `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`  
**Date**: 2026-09-07  
**Verdict**: ❌ **REQUEST_CHANGES**

---

## Executive Summary

An empirical challenge harness (`scripts/challenge_m1_ssr_integrity.mjs`) was authored and executed directly against the compiled React Router 7 SSR production bundle (`./build/server/index.js`). The audit evaluated three core dimensions of Milestone 1:

1. **Invoicing Redirect Integrity (`/checkouts/*`, `/checkout`, `/cart/*`)**: **PASS (22/22 tests passed)**.
   - All routes return HTTP 307 Temporary Redirect pointing directly to `https://hatcompanydallas.myshopify.com`.
   - Preserves POST request method verb semantics (preventing browser downgrade to GET).
   - Preserves complex multi-key query strings, URL-encoded spaces, special characters (`%23`, `%2B`, `%26`, `%5B`, `%5D`), and deep checkout subpaths with 100% parameter fidelity.
2. **Blank Routes Resilience**: **PASS (12/12 tests passed)**.
   - Nonexistent blank models (`/blanks/nonexistent-model-xyz`, `/blanks/fake-hat-123`, etc.) cleanly throw HTTP 404 responses without unhandled 500 runtime crashes.
   - Blanks catalog index (`/blanks`) responds with HTTP 200, contains valid Schema.org `CollectionPage` and `BreadcrumbList` JSON-LD, and provides direct links to all 6 models.
   - All 6 blank models (`richardson-112`, `richardson-115`, `sport-tek-stc26`, `sport-tek-stc27`, `comfort-colors-1717`, `comfort-colors-1566`) respond with HTTP 200, valid `Product` and `BreadcrumbList` structured data, and interactive inquiry forms.
3. **MOQ Compliance Across Rendered HTML**: ❌ **FAIL (12 route violations detected)**.
   - While `worker_m1` successfully remediated `lp.3d-puff.tsx`, `blanks.$model.tsx`, and `FloatingSpecHud.tsx` to 12 units, **several critical files explicitly designated in `PROJECT.md` under Feature F7 and in `ORIGINAL_REQUEST.md` were left untouched**.
   - As a result, rendered HTML across the application's root layout, home page, regional corridors, and quote modals continues to emit conflicting and outdated MOQ copy ("24-unit minimums", "24 Hat Minimum Order", "20 Hat Minimum Order", "18 Hat Minimum Order", and "24 - 48 (Minimum)").

Because `ORIGINAL_REQUEST.md` (R3) and `PROJECT.md` (F7) mandate a canonical 12-unit MOQ across all customer touchpoints, an unambiguous verdict of **REQUEST_CHANGES** is issued.

---

## Detailed Empirical Findings

### 1. Invoicing Redirect Edge-Cases (`/checkouts/*`, `/checkout`, `/cart/*`)

#### Methodology
A hermetic test matrix of 22 requests was executed against `createRequestHandler(serverBuild, "production")`. The matrix covered:
- Standard GET and POST requests
- Multi-parameter search queries (`?key=val&utm_source=meta&locale=en-US`)
- URL-encoded spaces (`%20`), plus symbols, and special characters (`%23`, `%2B`, `%26`, brackets `%5B`/`%5D`)
- Nested checkout subpaths (`/checkouts/c1/information/shipping_method?step=shipping`)
- Cart subpaths (`/cart/clear`, multi-item cart permalinks)

#### Results
| Path & Verb | Expected Status | Actual Status | Redirect Target (Location Header) | Query Fidelity | Verdict |
|---|---|---|---|---|---|
| `GET /checkout` | 307 | 307 | `https://hatcompanydallas.myshopify.com/checkout` | N/A | PASS |
| `POST /checkout` | 307 | 307 | `https://hatcompanydallas.myshopify.com/checkout` | N/A | PASS |
| `GET /checkouts/c1` | 307 | 307 | `https://hatcompanydallas.myshopify.com/checkouts/c1` | N/A | PASS |
| `POST /checkouts/c1` | 307 | 307 | `https://hatcompanydallas.myshopify.com/checkouts/c1` | N/A | PASS |
| `GET /cart/123456:1` | 307 | 307 | `https://hatcompanydallas.myshopify.com/cart/123456:1` | N/A | PASS |
| `POST /cart/123456:1` | 307 | 307 | `https://hatcompanydallas.myshopify.com/cart/123456:1` | N/A | PASS |
| `GET /checkouts/c1?key=val&utm_source=meta&locale=en-US` | 307 | 307 | `.../checkouts/c1?key=val&utm_source=meta&locale=en-US` | 100% match | PASS |
| `POST /checkouts/c1?key=val&utm_source=meta&locale=en-US` | 307 | 307 | `.../checkouts/c1?key=val&utm_source=meta&locale=en-US` | 100% match | PASS |
| `GET /checkout?step=contact_information&discount=SAVE10&ref=meta_ad&currency=USD` | 307 | 307 | `.../checkout?step=contact_information&discount=SAVE10&ref=meta_ad&currency=USD` | 100% match | PASS |
| `POST /checkout?step=contact_information&discount=SAVE10&ref=meta_ad&currency=USD` | 307 | 307 | `.../checkout?step=contact_information&discount=SAVE10&ref=meta_ad&currency=USD` | 100% match | PASS |
| `GET /cart/123456:2,789012:1?note=Embroidery%20front%20and%20back&attributes[po]=PO-9912&locale=en` | 307 | 307 | `.../cart/123456:2,789012:1?note=Embroidery+front+and+back&attributes%5Bpo%5D=PO-9912&locale=en` | 100% match | PASS |
| `POST /cart/123456:2,789012:1?note=Embroidery%20front%20and%20back&attributes[po]=PO-9912&locale=en` | 307 | 307 | `.../cart/123456:2,789012:1?note=Embroidery+front+and+back&attributes%5Bpo%5D=PO-9912&locale=en` | 100% match | PASS |
| `GET /checkouts/order%20123?note=hello%20world&tag=texas%20sports` | 307 | 307 | `.../checkouts/order%20123?note=hello+world&tag=texas+sports` | 100% match | PASS |
| `POST /checkouts/order%20123?note=hello%20world&tag=texas%20sports` | 307 | 307 | `.../checkouts/order%20123?note=hello+world&tag=texas+sports` | 100% match | PASS |
| `GET /checkout?discount=SUMMER%20SALE&ref=email%2Bblast&symbol=%23vip%26priority` | 307 | 307 | `.../checkout?discount=SUMMER+SALE&ref=email%2Bblast&symbol=%23vip%26priority` | 100% match | PASS |
| `POST /checkout?discount=SUMMER%20SALE&ref=email%2Bblast&symbol=%23vip%26priority` | 307 | 307 | `.../checkout?discount=SUMMER+SALE&ref=email%2Bblast&symbol=%23vip%26priority` | 100% match | PASS |
| `GET /cart/item%20sku%201:1?attributes[custom%20text]=Dallas%20%26%20Fort%20Worth` | 307 | 307 | `.../cart/item%20sku%201:1?attributes%5Bcustom+text%5D=Dallas+%26+Fort+Worth` | 100% match | PASS |
| `POST /cart/item%20sku%201:1?attributes[custom%20text]=Dallas%20%26%20Fort%20Worth` | 307 | 307 | `.../cart/item%20sku%201:1?attributes%5Bcustom+text%5D=Dallas+%26+Fort+Worth` | 100% match | PASS |
| `GET /checkouts/c1/information/shipping_method?step=shipping` | 307 | 307 | `.../checkouts/c1/information/shipping_method?step=shipping` | 100% match | PASS |
| `POST /checkouts/c1/information/shipping_method?step=shipping` | 307 | 307 | `.../checkouts/c1/information/shipping_method?step=shipping` | 100% match | PASS |
| `GET /cart/clear` | 307 | 307 | `https://hatcompanydallas.myshopify.com/cart/clear` | N/A | PASS |
| `POST /cart/clear` | 307 | 307 | `https://hatcompanydallas.myshopify.com/cart/clear` | N/A | PASS |

#### Observations on Redirect Semantics
- In HTTP/1.1 and HTTP/2 (RFC 9110 Section 15.4.8), HTTP 307 specifies that the user agent **must not** change the request method when following the redirection. Emitting HTTP 307 rather than HTTP 302 ensures that customer checkout sessions initiated via POST retain their POST method, headers, and payload when handed off to Shopify.
- Query parameter encoding properly follows WHATWG standard application/x-www-form-urlencoded format, where spaces in query strings are serialized as `+` and decoded back to spaces by Shopify's servers.

---

### 2. Blank Routes Verification

#### Methodology
Tested SSR handling of invalid models, the newly implemented `/blanks` catalog overview route, and all 6 production blank models.

#### Results
| Route | Requested Path | Expected Status | Actual Status | Key Validations | Verdict |
|---|---|---|---|---|---|
| Non-existent 1 | `/blanks/nonexistent-model-xyz` | 404 | 404 | Thrown 404 response; 0 server crashes | PASS |
| Non-existent 2 | `/blanks/fake-hat-123` | 404 | 404 | Thrown 404 response; 0 server crashes | PASS |
| Non-existent 3 | `/blanks/richardson-999` | 404 | 404 | Thrown 404 response; 0 server crashes | PASS |
| Non-existent 4 | `/blanks/invalid` | 404 | 404 | Thrown 404 response; 0 server crashes | PASS |
| Non-existent 5 | `/blanks/unknown-model` | 404 | 404 | Thrown 404 response; 0 server crashes | PASS |
| Blanks Index | `/blanks` | 200 | 200 | `CollectionPage` + `BreadcrumbList` schemas, links to 6 models | PASS |
| Richardson 112 | `/blanks/richardson-112` | 200 | 200 | `Product` + `BreadcrumbList` schema, inquiry form | PASS |
| Richardson 115 | `/blanks/richardson-115` | 200 | 200 | `Product` + `BreadcrumbList` schema, inquiry form | PASS |
| Sport-Tek STC26 | `/blanks/sport-tek-stc26` | 200 | 200 | `Product` + `BreadcrumbList` schema, inquiry form | PASS |
| Sport-Tek STC27 | `/blanks/sport-tek-stc27` | 200 | 200 | `Product` + `BreadcrumbList` schema, inquiry form | PASS |
| Comfort Colors 1717 | `/blanks/comfort-colors-1717` | 200 | 200 | `Product` + `BreadcrumbList` schema, inquiry form | PASS |
| Comfort Colors 1566 | `/blanks/comfort-colors-1566` | 200 | 200 | `Product` + `BreadcrumbList` schema, inquiry form | PASS |

#### Observations on Blank Routes
- Adding defensive handling `Object.entries(utmAttribution || {})` in `RegionalInquiryForm.tsx` successfully cured the `TypeError: Cannot convert undefined or null to object` runtime crash on blank routes.
- The `app/routes/blanks._index.tsx` route functions cleanly without collision against `blanks.$model.tsx`.

---

### 3. MOQ Compliance Across Rendered HTML Output

#### Defect Analysis & Verbatim Observations
While `worker_m1` resolved MOQ in `lp.3d-puff.tsx` and `blanks.$model.tsx`, an audit of full rendered SSR HTML across 23 core pages revealed **12 routes containing conflicting or outdated MOQ statements**.

#### Confirmed Defect Locations

##### Defect 1: `app/root.tsx` (Line 30)
```tsx
// app/root.tsx:25-32
export const meta: MetaFunction = () => [
  { title: "HatCo. Stitch and Print | Industrial Headwear & Custom Apparel Engine" },
  {
    name: "description",
    content:
      "Dallas TX contract manufacturer for custom headwear, embroidery, screen print & DTF. 3D puff embroidery on Ricoma multi-head machines. 24-unit minimums. Free mockups in 24 hours.",
  },
];
```
- **Observation**: `PROJECT.md` Feature F7 explicitly specified `root.tsx` as a target for MOQ harmonization ("Canonical MOQ 12 units everywhere (fix 18 on lp.3d-puff, fix 24/48 on blanks.$model, root.tsx, FloatingSpecHud)").
- **Impact**: Because `root.tsx` defines default metadata, any route without an explicit overriding description tag (including `/sample-kit`, `/inspiration`, `/custom`, `/shop`, `/lp/3d-puff`) renders `"24-unit minimums."` in its `<head>` HTML output.

##### Defect 2: `app/routes/_index/route.tsx` (Line 160)
```tsx
// app/routes/_index/route.tsx:159-161
export const meta: MetaFunction = () => [
  { name: "description", content: "Dallas TX industrial contract manufacturer for custom headwear, 3D puff embroidery, screen print & DTF on Ricoma commercial multi-head machines. 24-unit minimums." },
];
```
- **Observation**: The Home Page metadata directly claims `"24-unit minimums."`, conflicting with `HeroSection.tsx` on the same page which claims `"low 12-unit minimums (1 dozen)"`.

##### Defect 3: `app/components/ui/PricingGuide.tsx` (Lines 110, 134, 155)
```tsx
// app/components/ui/PricingGuide.tsx
Line 110: <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">24 Hat</strong> Minimum Order</span></li>
Line 134: <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-white">20 Hat</strong> Minimum Order</span></li>
Line 155: <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">18 Hat</strong> Minimum Order</span></li>
```
- **Observation**: The `PricingGuide` component is rendered directly on the Home page (`/`). It explicitly lists "24 Hat Minimum Order", "20 Hat Minimum Order", and "18 Hat Minimum Order" under its Basic, Standard, and Premium headwear tiers.
- **Impact**: Prospective B2B customers viewing the pricing calculator see tier minimums of 18, 20, and 24 hats directly below a hero banner advertising 12-unit minimums.

##### Defect 4: `app/routes/tx.$city.tsx` (Line 264)
```tsx
// app/routes/tx.$city.tsx:263-265
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono mb-4">
  <span className="hidden sm:inline">24-Unit Minimums</span>
</div>
```
- **Observation**: Rendered across all 7 Texas regional corridors (`/tx/dallas`, `/tx/fort-worth`, `/tx/arlington`, `/tx/plano`, `/tx/frisco`, `/tx/austin`, `/tx/houston`) in the regional trust badge.

##### Defect 5: `app/components/forms/DigitalMockupModal.tsx` (Line 228)
```tsx
// app/components/forms/DigitalMockupModal.tsx:227-229
<select ...>
  <option value="">Select quantity</option>
  <option value="24-48">24 - 48 (Minimum)</option>
  <option value="49-99">49 - 99</option>
```
- **Observation**: The interactive digital mockup modal presents "24 - 48 (Minimum)" as the entry tier, rather than accommodating the 12-unit entry run (e.g. "12 - 24 (1 Dozen MOQ)").

---

## Actionable Remediation Instructions for `worker_m1`

To achieve 100% pass status and full approval, `worker_m1` must apply the following code fixes:

1. **In `app/root.tsx`**:
   - Update line 30: Replace `24-unit minimums.` with `12-unit minimums (1 dozen).`.
2. **In `app/routes/_index/route.tsx`**:
   - Update line 160: Replace `24-unit minimums.` with `12-unit minimums (1 dozen).`.
3. **In `app/components/ui/PricingGuide.tsx`**:
   - Update lines 110, 134, 155: Replace `24 Hat Minimum Order`, `20 Hat Minimum Order`, and `18 Hat Minimum Order` with `12 Hat Minimum Order (1 Dozen MOQ)`.
4. **In `app/routes/tx.$city.tsx`**:
   - Update line 264: Replace `24-Unit Minimums` with `12-Unit Minimums (1 Dozen)`.
5. **In `app/components/forms/DigitalMockupModal.tsx`**:
   - Update line 228: Replace `<option value="24-48">24 - 48 (Minimum)</option>` with `<option value="12-24">12 - 24 (1 Dozen MOQ)</option>`.

---

## Verification Method

Run the empirical challenge harness:
```bash
cd /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
npm run build
node scripts/challenge_m1_ssr_integrity.mjs
```
*Current Result*: 45/57 checks passed (12 MOQ failures).  
*Target Result*: 57/57 checks passed (0 failures).
