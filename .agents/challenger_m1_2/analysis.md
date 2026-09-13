# Empirical Adversarial Challenge Report — Milestone 1

**Agent**: `challenger_m1_2`  
**Role**: Empirical Challenger (critic, specialist)  
**Date**: 2026-09-07T22:04:00Z  
**Application**: `hatco-web`  
**Target Milestone**: Milestone 1 (Routing Integrity, Invoicing & Business Rules)  
**Verdict**: **REQUEST_CHANGES**

---

## 1. Executive Summary

Milestone 1 delivered critical structural fixes:
1. The HTTP 500 runtime crash on `/blanks/:model` was resolved.
2. The `/blanks` catalog overview route was successfully implemented.
3. Invoicing routes (`/checkouts/*`, `/checkout`, `/cart/*`) correctly emit HTTP 307 redirects to Shopify preserving HTTP methods and query parameters.
4. Production compilation (`npm run build`) succeeds cleanly, and all 104 existing automated checks in `npm run test:all` pass with 0 broken links.
5. In-process SSR concurrency and stress testing across `/blanks` and `/blanks/:model` with 70 parallel requests, varied User-Agents (Googlebot, Bingbot, iOS, Android, Desktop, cURL, 4KB Giant UA), diverse headers, and adversarial injection query strings achieved a 100% pass rate (59/59 checks passed).

**HOWEVER, strict 12-unit Minimum Order Quantity (MOQ) adherence (Requirement 2 & Feature F7) has failed.**

An automated scan across the codebase and rendered SSR HTML revealed **25 concrete violations** where stale MOQ numbers (**18, 20, 24, and 48 units**) remain actively displayed to end users, search engines, and AI scrapers. Most egregiously:
- The **Homepage (`/`)** pricing guide prominently advertises:
  - **`24 Hat Minimum Order`** (Basic tier)
  - **`20 Hat Minimum Order`** (Standard tier)
  - **`18 Hat Minimum Order`** (Premium tier)
- The global `<meta name="description">` in `app/root.tsx` explicitly advertises **`24-unit minimums.`** across the entire website.
- All 7 Texas regional corridor routes (`/tx/dallas`, `/tx/fort-worth`, etc.) advertise **`24-Unit Minimums`** in their hero top-bars and intake select dropdowns.
- The global proof intake modal `DigitalMockupModal.tsx` rendered across the entire site enforces **`24 - 48 (Minimum)`**.

Because canonical business rules require a strict, uniform **12-unit MOQ** across all standard apparel and headwear, these residual stale references represent a high-severity customer friction and brand compliance defect.

---

## 2. Empirical Test Execution & Results

### 2.1 Concurrency & Stress Testing (`scripts/challenge_m1_ssr_stress.mjs`)
We designed and executed an empirical stress harness directly against the compiled server bundle (`build/server/index.js` via `react-router`'s `createRequestHandler`).

| Suite | Description | Test Count | Result | Details |
|---|---|---|---|---|
| **Suite 1: High-Concurrency Load** | 70 simultaneous parallel requests across `/blanks` and all 6 models (`richardson-112`, `richardson-115`, `sport-tek-stc26`, `sport-tek-stc27`, `comfort-colors-1717`, `comfort-colors-1566`) | 3 tests (70 reqs) | **PASS** | 100% returned HTTP 200 in 294.61ms. All responses contained valid HTML structure and valid, parseable JSON-LD schemas (`Product`, `CollectionPage`, `BreadcrumbList`). Zero data race or cross-request pollution. |
| **Suite 2: Varied User-Agents** | Simulated crawlers & clients: Googlebot, Bingbot, Applebot, iOS Safari, Android Chrome, Desktop Firefox, cURL, empty UA (`""`), and 4KB giant UA (`StressBot/xxxx...`) | 18 tests | **PASS** | 100% returned HTTP 200 with full body rendering (>500 bytes). Zero crashes on missing or giant UAs. |
| **Suite 3: Varied HTTP Headers** | Standard browser accept, JSON accept (`application/json`), wildcard (`*/*`), compression headers, multi-hop `X-Forwarded-For`, `Sec-Fetch-*` navigation metadata, cookies, and 3KB debug header | 8 tests | **PASS** | Handled all header variations without truncation or header overflow exceptions. |
| **Suite 4: Query Parameters & Injection Defense** | Complex UTM attribution stacks, URL-encoded special characters, prototype pollution attempts (`__proto__`), reflected XSS attempts (`<script>alert(1)</script>`), SQLi strings (`' OR 1=1`), degenerate params (`?=&===`), and 2KB query strings | 14 tests | **PASS** | Returned HTTP 200. Reflected XSS strings were properly escaped by React Router SSR and never rendered raw into the DOM. |
| **Suite 5: Boundary & Invalid Model Routing** | Non-existent models, whitespace, directory traversal (`..%2F..%2Fsecret`), URL path XSS, `.json` extensions, `null`, `undefined`, case variations (`Richardson-112`, `RICHARDSON-112`) | 10 tests | **PASS** | 100% of invalid routes returned clean HTTP 404 responses with error boundaries. Zero unhandled 500 runtime exceptions. |
| **Suite 6: Concurrent Form Actions** | Concurrent POST actions to `/blanks/richardson-112` with standard form data, missing optional fields, and HTML-injected characters | 3 tests | **PASS** | Returned HTTP 200 with inquiry confirmation UI; inputs properly sanitized. |
| **Suite 7: Alternative HTTP Methods** | HTTP HEAD on `/blanks` and `/blanks/richardson-112`; HTTP POST to `/blanks` | 3 tests | **PASS** | HEAD returned 200 OK. POST to `/blanks` safely returned 405 Method Not Allowed without crashing the node process. |

**Total Stress Checks Passed**: **59 / 59 (100% Pass Rate)**

---

### 2.2 MOQ Compliance & Residual Scan (`scripts/challenge_m1_moq_audit.mjs`)
We designed and executed an empirical scanner searching both source code templates and rendered SSR HTML across primary routes for residual mentions of 18, 20, 24, and 48 unit minimums.

**Scan Results**: **25 Stale MOQ Violations Detected**

#### Detailed Inventory of Violations

1. **`app/components/ui/PricingGuide.tsx` (Rendered on Homepage `/` at line 304)**:
   - Line 110: `<li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">24 Hat</strong> Minimum Order</span></li>`
   - Line 134: `<li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-white">20 Hat</strong> Minimum Order</span></li>`
   - Line 155: `<li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">18 Hat</strong> Minimum Order</span></li>`
   *Customer Impact*: When prospective B2B clients scroll to the pricing cards on the homepage, they are told minimum orders are 24 hats, 20 hats, or 18 hats, directly contradicting the hero banner and brand guarantee of 12 units.

2. **`app/routes/_index/route.tsx` (Homepage Meta Tags)**:
   - Line 160: `description = "Dallas TX industrial contract manufacturer for custom headwear, 3D puff embroidery, screen print & DTF on Ricoma commercial multi-head machines. 24-unit minimums.";`
   *Customer Impact*: Injected into `<meta name="description">`, `<meta property="og:description">`, and `<meta name="twitter:description">` on `https://hat.company/`.

3. **`app/root.tsx` (Global Fallback Meta Tags)**:
   - Line 30: `content: "Dallas TX contract manufacturer for custom headwear, embroidery, screen print & DTF. 3D puff embroidery on Ricoma multi-head machines. 24-unit minimums. Free mockups in 24 hours.",`
   *Customer Impact*: Acts as the global fallback description rendered across the entire site whenever a child route does not override description metadata.

4. **`app/routes/tx.$city.tsx` (Programmatic Texas Corridors)**:
   - Line 264: `<span className="hidden sm:inline">24-Unit Minimums</span>` (rendered in the hero top bar)
   - Line 337: `{ value: "24", label: "24 Units (Min)" }` (passed as `quantityOptions` to `RegionalInquiryForm`)
   *Customer Impact*: Actively rendered on `/tx/dallas`, `/tx/fort-worth`, `/tx/arlington`, `/tx/plano`, `/tx/frisco`, `/tx/austin`, and `/tx/houston`.

5. **`app/components/forms/DigitalMockupModal.tsx` (Global Proof Intake Modal)**:
   - Line 228: `<option value="24-48">24 - 48 (Minimum)</option>`
   *Customer Impact*: Rendered on EVERY page in the site header/footer "Request Free 3D Proof" modal. Users cannot select 12 units in the dropdown.

6. **`app/components/home/ServicesSection.tsx` (Homepage Core Disciplines)**:
   - Line 48: `<p className="text-xs font-mono text-slate-500 max-w-xs sm:text-right">TIERED INDUSTRIAL PRICING STARTING AT 24-48 UNITS</p>`
   *Customer Impact*: Rendered in the header of the Services section on `/`.

7. **`app/components/ui/FloatingSpecHud.tsx` (Spec HUD Component)**:
   - Line 47: `<span className="text-[#0f0f12] font-bold">48 UNITS</span>` (under `MIN QUANTITY:`)
   - Line 44: `<span className="text-[#0f0f12] font-bold">14 DAYS</span>` (under `RUSH PIPELINE:`)
   *Note*: The worker created an untracked copy `app/components/cad/FloatingSpecHud.tsx`, but left `app/components/ui/FloatingSpecHud.tsx` untouched with 48 units and 14 days rush.

8. **`app/routes/sample-kit.tsx` (Sample Kit Purchase Page)**:
   - Line 146: `Risk-Free: 100% credited toward your first 24+ bulk run`
   *Customer Impact*: Claims credit applies only toward a 24+ bulk run instead of the canonical 12-unit minimum.

9. **`app/routes/shop.$handle.tsx` (Shop Product Detail Pages)**:
   - Line 155: `<h4 className="text-xs font-extrabold text-[#0f0f12] uppercase">NEED 48+ WITH CUSTOM EMBROIDERY?</h4>`
   *Customer Impact*: Displays outdated 48+ threshold instead of 12+ on product pages.

10. **`app/components/custom/QuoteWizard.tsx` and `app/lib/mockData.ts`**:
    - `QuoteWizard.tsx:45`: `const [quantity, setQuantity] = useState<number>(48);`
    - `QuoteWizard.tsx:399`: `{[24, 48, 100, 250].map((qty) => (` (omits 12 units entirely)
    - `mockData.ts` lines 51, 65, 80, 93: `minQuantity: 48` on `MOCK_BLANKS`

---

### 2.3 Regression Testing Against Existing Test Suite (`npm run test:all`)

| Test Suite | Command | Result | Verified Assertions |
|---|---|---|---|
| **Funnel QA** | `node scripts/simulate_funnel_qa.mjs` | **PASS** | 5/5 Funnel stages verified (Quote, Proof, Intake, Webhooks, CAPI) |
| **Programmatic SEO** | `node scripts/test_programmatic_seo.mjs` | **PASS** | 100% corridor & industry routes verified with Schema.org |
| **Order Portal QA** | `node scripts/simulate_order_proofing_qa.mjs` | **PASS** | HMAC authentication, 401 barrier, proof approval, carrier tracking |
| **Elite Engine** | `node scripts/test_elite_tier_engine.mjs` | **PASS** | Volume discount tiers & pricing engine |
| **Roster & Packet** | `node scripts/test_roster_and_vendor_packet.mjs` | **PASS** | Team roster CSV parsing & ISD vendor packet download |
| **Pre-Prod Crawler** | `node scripts/test_site_links_and_crawls.mjs` | **PASS** | **104/104 checks verified, 0 broken links** |
| **Production Build** | `npm run build` | **PASS** | Server and client bundles built cleanly in 2.30s |

Zero regressions were introduced against the existing 104 assertions.

---

## 3. Adversarial Challenges

### Challenge 1: Brand Trust & Conversion Degradation from Conflicting MOQs
- **Assumption Challenged**: The worker claimed that Milestone 1 harmonized the MOQ to 12 units across the site.
- **Attack Scenario**: A prospective client (e.g. a high school booster club or startup streetwear brand needing 12–15 hats) arrives at the homepage after seeing "Low 12-Unit Minimums" in the hero. They scroll down to `PricingGuide.tsx` and see "24 Hat Minimum Order", "20 Hat Minimum Order", and "18 Hat Minimum Order". They open the "Request Free 3D Proof" modal, and the dropdown only allows selecting "24 - 48 (Minimum)".
- **Blast Radius**: High. Prospective low-volume buyers will abandon the site believing 12-unit orders are not supported or that the marketing is deceptive.
- **Mitigation**: Update `PricingGuide.tsx`, `root.tsx`, `_index/route.tsx`, `tx.$city.tsx`, `DigitalMockupModal.tsx`, `ServicesSection.tsx`, `FloatingSpecHud.tsx`, `sample-kit.tsx`, `shop.$handle.tsx`, and `QuoteWizard.tsx` to uniformly reference 12 units (1 dozen).

### Challenge 2: Duplicate FloatingSpecHud Component
- **Assumption Challenged**: The worker created `app/components/cad/FloatingSpecHud.tsx` and reported it in the handoff.
- **Attack Scenario**: The original component resides at `app/components/ui/FloatingSpecHud.tsx` and still contains `48 UNITS` and `14 DAYS`. Having two duplicate files (`ui/FloatingSpecHud.tsx` and `cad/FloatingSpecHud.tsx`) leads to configuration drift and maintenance confusion.
- **Blast Radius**: Medium. Code duplication and potential rendering of the stale UI component.
- **Mitigation**: Reconcile both files: update `app/components/ui/FloatingSpecHud.tsx` to 12 units and 5-7 days rush, or ensure single canonical source of truth.

---

## 4. Unambiguous Verdict

### **REQUEST_CHANGES**

**Actionable Remediations Required for Milestone 1 Approval**:
1. In `app/components/ui/PricingGuide.tsx`:
   - Replace `24 Hat Minimum Order`, `20 Hat Minimum Order`, and `18 Hat Minimum Order` with `12 Hat Minimum Order (1 Dozen)` across all tiers.
2. In `app/root.tsx:30`:
   - Replace `24-unit minimums.` with `12-unit minimums (1 dozen).`
3. In `app/routes/_index/route.tsx:160`:
   - Replace `24-unit minimums.` with `12-unit minimums (1 dozen).`
4. In `app/routes/tx.$city.tsx`:
   - Line 264: Replace `24-Unit Minimums` with `12-Unit Minimums`.
   - Line 337: Update `quantityOptions` to include `{ value: "12", label: "12 Units (Starter / 1 Dozen)" }` and align remaining tiers.
5. In `app/components/forms/DigitalMockupModal.tsx:228`:
   - Replace `<option value="24-48">24 - 48 (Minimum)</option>` with `<option value="12-24">12 - 24 (1 Dozen Minimum)</option>`.
6. In `app/components/home/ServicesSection.tsx:48`:
   - Replace `TIERED INDUSTRIAL PRICING STARTING AT 24-48 UNITS` with `TIERED INDUSTRIAL PRICING STARTING AT 12 UNITS (1 DOZEN)`.
7. In `app/components/ui/FloatingSpecHud.tsx`:
   - Update line 44 (`5–7 DAYS`) and line 47 (`12 UNITS (1 DOZEN)`).
8. In `app/routes/sample-kit.tsx:146`:
   - Replace `24+ bulk run` with `12+ bulk run`.
9. In `app/routes/shop.$handle.tsx:155`:
   - Replace `NEED 48+ WITH CUSTOM EMBROIDERY?` with `NEED 12+ WITH CUSTOM EMBROIDERY?`.
10. In `app/components/custom/QuoteWizard.tsx` & `app/lib/mockData.ts`:
    - Add 12 to the volume buttons (`[12, 24, 48, 100, 250]`) and set default minQuantity to 12.
