# Comprehensive Route, Crawl Surface, Media, and SSR Endpoint Survey
**HatCo Web (v2 Enhancement & Fortune 100 QC Audit)**  
**Auditor**: `explorer_survey_routes`  
**Date**: 2026-09-07  
**Working Directory**: `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`  
**Git Branch**: `preview/v2-enhancements`

---

## 1. Executive Summary

A comprehensive, multi-layer survey was executed across all routes, crawl surfaces, media assets, internal navigation links, hash anchors, and SSR endpoints within `hatco-web`. The evaluation audited 61 distinct endpoint variations across in-process production SSR handlers and local client builds, alongside an investigation of live Vercel staging behaviors (`https://hatco-website-afna1xzbr-foraefactory.vercel.app`).

### Key Survey Metrics
- **Total Route Variations Audited**: 61 endpoints
- **Passing Routes**: 51 / 61 (83.6%)
- **Failing / Defective Routes**: 10 / 61 (16.4%)
- **Static Assets Verified**: 57 unique media/script references indexed; 0 missing in `public/` or `build/client/`
- **Internal Navigation & Schema Anchors Inspected**: 98 link targets
- **Critical Defects Discovered**: 2 (Server 500 crash on all `/blanks/:model` routes; HTTP 302 vs 307 on `/checkouts/*` invoicing redirects)
- **High/Medium Defects Discovered**: 6 (Missing `/blanks` 404 endpoint; invalid HMAC token in `llms.txt`; dead `#locations` Schema.org anchor; 18-unit MOQ inconsistency in `lp.3d-puff.tsx`; 24-48 unit MOQ inconsistency in `blanks.$model.tsx`; WCAG 2.1 AA modal dialog/label omissions in `TechPackPdfModal` and `CartDrawer`)

---

## 2. Complete Route Enumeration & Architecture

HatCo Web utilizes React Router v7 (`@react-router/dev` v7.12.0) with flat route discovery configured via `@react-router/fs-routes` in `app/routes.ts`.

### 2.1 Core Routes
| Route Path | Source File | Expected Status | Actual Status | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `app/routes/_index/route.tsx` | 200 OK | **200 OK** | Main B2B landing page, interactive pricing guide, video tour, portfolio, FAQ, intake form |
| `/custom` | `app/routes/custom.tsx` | 200 OK | **200 OK** | Interactive CAD Cap Studio, silhouette selector, custom quote intake |
| `/sample-kit` | `app/routes/sample-kit.tsx` | 200 OK | **200 OK** | B2B Sample Box product presentation ($25 credited back), tactile stitch-out display |
| `/inspiration` | `app/routes/inspiration.tsx` | 200 OK | **200 OK** | Client production drop archive and Instagram showcase (@hatco.stitchprint) |
| `/shop` | `app/routes/shop._index.tsx` | 200 OK | **200 OK** | Retail & blank cap deployment catalog with search and category filters |
| `/shop/:handle` | `app/routes/shop.$handle.tsx` | 200 OK / 404 | **200 OK / 404** | Product detail page with variant selection and cart addition (12 curated products) |
| `/blanks/:model` | `app/routes/blanks.$model.tsx` | 200 OK | **500 ERROR** | **CRITICAL DEFECT**: Runtime SSR crash due to unpassed `utmAttribution` prop |
| `/lp/3d-puff` | `app/routes/lp.3d-puff.tsx` | 200 OK | **200 OK** | High-density 3D puff embroidery paid ad landing page (isolated layout without header/footer) |

### 2.2 Programmatic Texas Manufacturing Corridors (`/tx/:city`)
Dynamic route handler: `app/routes/tx.$city.tsx` powered by `TEXAS_CORRIDORS` in `app/lib/seoData.ts`.
| Route Path | City Slug | Metro Area | Status | Featured Blanks |
| :--- | :--- | :--- | :--- | :--- |
| `/tx/dallas` | `dallas` | Dallas, TX | **200 OK** | Richardson 112, Sport-Tek STC26, Richardson 115, Comfort Colors 1717 |
| `/tx/fort-worth` | `fort-worth` | Fort Worth, TX | **200 OK** | Richardson 112, Richardson 115, Comfort Colors 1566, Sport-Tek STC27 |
| `/tx/arlington` | `arlington` | Arlington, TX | **200 OK** | Richardson 112, Sport-Tek STC26, Sport-Tek STC27, Comfort Colors 1717 |
| `/tx/plano` | `plano` | Plano, TX | **200 OK** | Richardson 115, Sport-Tek STC26, Richardson 112, Comfort Colors 1566 |
| `/tx/frisco` | `frisco` | Frisco, TX | **200 OK** | Sport-Tek STC26, Sport-Tek STC27, Richardson 112, Richardson 115 |
| `/tx/austin` | `austin` | Austin, TX | **200 OK** | Richardson 115, Comfort Colors 1717, Richardson 112, Comfort Colors 1566 |
| `/tx/houston` | `houston` | Houston, TX | **200 OK** | Sport-Tek STC27, Richardson 112, Sport-Tek STC26, Comfort Colors 1717 |
| `/tx/san-antonio` | *(invalid)* | Non-existent | **404 OK** | Clean 404 response triggered for unmapped corridors |

### 2.3 Industry Vertical Solutions (`/industry/:vertical`)
Dynamic route handler: `app/routes/industry.$vertical.tsx` powered by `INDUSTRY_VERTICALS` in `app/lib/seoData.ts`.
| Route Path | Vertical Slug | Niche Segment | Status | Core Recommended Blanks |
| :--- | :--- | :--- | :--- | :--- |
| `/industry/school-districts` | `school-districts` | School Districts & Athletics | **200 OK** | Richardson 112, Richardson 115, Comfort Colors 1566, Comfort Colors 1717 |
| `/industry/pickleball` | `pickleball` | Pickleball Leagues | **200 OK** | Sport-Tek STC26, Sport-Tek STC27, Richardson 112 |
| `/industry/disc-golf` | `disc-golf` | Disc Golf Tours & Clubs | **200 OK** | Richardson 115, Richardson 112, Sport-Tek STC26 |
| `/industry/team-sports` | `team-sports` | Adult Rec & Team Sports | **200 OK** | Richardson 112, Sport-Tek STC26, Sport-Tek STC27 |
| `/industry/invalid-niche` | *(invalid)* | Non-existent | **404 OK** | Clean 404 response triggered for unmapped industry niches |

### 2.4 Blank Headwear Catalog (`/blanks/:model`)
Dynamic route handler: `app/routes/blanks.$model.tsx` powered by `BLANKS_CATALOG` in `app/lib/seoData.ts`.
| Route Path | Model Slug | Blank Title | Category | Status | Observed Error |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/blanks/richardson-112` | `richardson-112` | Richardson 112 Classic Trucker | Trucker | **500 FAIL** | `TypeError: Cannot convert undefined or null to object` |
| `/blanks/richardson-115` | `richardson-115` | Richardson 115 Low-Profile | Trucker | **500 FAIL** | `TypeError: Cannot convert undefined or null to object` |
| `/blanks/sport-tek-stc26` | `sport-tek-stc26` | Sport-Tek STC26 Posicharge | Performance | **500 FAIL** | `TypeError: Cannot convert undefined or null to object` |
| `/blanks/sport-tek-stc27` | `sport-tek-stc27` | Sport-Tek STC27 Moisture-Wicking | Performance | **500 FAIL** | `TypeError: Cannot convert undefined or null to object` |
| `/blanks/comfort-colors-1717`| `comfort-colors-1717` | Comfort Colors 1717 Heavy Tee | Apparel | **500 FAIL** | `TypeError: Cannot convert undefined or null to object` |
| `/blanks/comfort-colors-1566`| `comfort-colors-1566` | Comfort Colors 1566 Crewneck | Apparel | **500 FAIL** | `TypeError: Cannot convert undefined or null to object` |
| `/blanks/unknown-model` | *(invalid)* | Non-existent | N/A | **404 OK** | Correctly throws 404 Response |
| `/blanks` | *(root)* | Blanks Catalog Root | N/A | **404 FAIL** | Referenced in Breadcrumb JSON-LD schema but no route exists |

### 2.5 Client Order Proofing & Live Status Portals (`/orders/:orderRef`)
Dynamic route handler: `app/routes/orders.$orderRef.tsx` powered by `app/lib/orderPortal.server.ts`.
| Order Reference | Client / Organization | Carrier Mode | Tokenless (401 Barrier) | Valid HMAC Token (200 Status) | Invalid Token (401 Barrier) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ORD-DFW-PICKLE` | DFW Metro Pickleball Club | Local Courier | **401 OK** | **200 OK** | **401 OK** |
| `ORD-TX-HIGHSCHOOL` | Texas UIL Athletics | Domestic Freight | **401 OK** | **200 OK** | **401 OK** |
| `ORD-GHANA-STREET` | Accra Streetwear Collective | Global Air Freight | **401 OK** | **200 OK** | **401 OK** |
| `ORD-HATCO-PROOF` | HatCo Internal Quality Benchmark | Dallas Courier | **401 OK** | **200 OK** | **401 OK** |
| `ORD-NONEXISTENT` | Non-Existent Reference | N/A | **401 OK** | **404 OK** (with valid token) | **401 OK** |

### 2.6 Search Engine, LLM, and AI Discovery Endpoints
| Endpoint | Handler File | MIME Type | Status | Content & Functionality |
| :--- | :--- | :--- | :--- | :--- |
| `/sitemap.xml` | `app/routes/sitemap[.]xml.ts` | `application/xml` | **200 OK** | XML sitemap containing 23 URLs (core, corridors, verticals, blanks) |
| `/robots.txt` | `app/routes/robots[.]txt.ts` | `text/plain` | **200 OK** | Crawler permissions for standard bots and AI agents (GPTBot, ClaudeBot, etc.) |
| `/llms.txt` | `app/routes/llms[.]txt.ts` | `text/plain` | **200 OK** | Curated AI context summary, machine specs, pricing notes, and navigation index |
| `/llms-full.txt` | `app/routes/llms-full[.]txt.ts`| `text/plain` | **200 OK** | Exhaustive technical documentation, 6-milestone state machine, and corridor index |
| `/api/instagram-stats` | `app/routes/api.instagram-stats.ts` | `application/json`| **200 OK** | Real-time / fallback Instagram profile metrics for social proof components |

### 2.7 Invoicing Protection & Checkout Redirects
| Invoicing Route | Handler File | Target Location | Actual Status | Expected Status | Compliance Defect |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/checkouts/:id` | `app/routes/checkouts.$.tsx` | `https://hatcompanydallas.myshopify.com/checkouts/:id` | **302 Found** | **307 Temporary Redirect** | **DEFECT**: Defaults to 302 instead of strict HTTP 307 |
| `/checkout` | `app/routes/checkout.tsx` | `https://hatcompanydallas.myshopify.com/checkout` | **302 Found** | **307 Temporary Redirect** | **DEFECT**: Defaults to 302 instead of strict HTTP 307 |
| `/cart/:line` | `app/routes/cart.$.tsx` | `https://hatcompanydallas.myshopify.com/cart/:line` | **302 Found** | **307 Temporary Redirect** | **DEFECT**: Defaults to 302 instead of strict HTTP 307 |

### 2.8 Shopify Admin App & Webhook Infrastructure
| Route Path | Handler File | Authentication / Barrier | Purpose |
| :--- | :--- | :--- | :--- |
| `/app` | `app/routes/app._index.tsx` | `authenticate.admin(request)` | Shopify admin embedded embedded index |
| `/app/additional` | `app/routes/app.additional.tsx` | `authenticate.admin(request)` | Secondary Shopify Polaris documentation page |
| `/auth/login` | `app/routes/auth.login/route.tsx` | Shopify App Bridge | Shopify partner/merchant OAuth login flow |
| `/webhooks/app/scopes_update` | `app/routes/webhooks.app.scopes_update.tsx` | HMAC Webhook Verification | Shopify permission scope change handler |
| `/webhooks/app/uninstalled` | `app/routes/webhooks.app.uninstalled.tsx` | HMAC Webhook Verification | App uninstallation session cleanup |

---

## 3. Static Assets, Media & Fonts Inspection

Every referenced media item, CAD photo, logo, font, and video poster was cross-referenced across the codebase and validated against physical storage in `public/` and `build/client/`.

### 3.1 Media Asset Summary
- **Physical Public Assets Indexed**: 68 files in `public/`
- **Rendered Assets Verified**: 57 unique asset URLs extracted from rendered HTML
- **Missing / Broken Static Media**: **0 missing files**

### 3.2 Key Asset Path Verifications
| Asset Path | Physical Location | Byte Size | Status | Where Referenced |
| :--- | :--- | :--- | :--- | :--- |
| `/HC-logo_blk.svg` | `public/HC-logo_blk.svg` | 12,738 B | **Verified** | `Header.tsx`, `Footer.tsx`, `TexasVendorPacketModal.tsx`, `root.tsx` |
| `/HC-logo_wht.svg` | `public/HC-logo_wht.svg` | 13,119 B | **Verified** | `StorySection.tsx` (Video poster) |
| `/favicon.ico` | `public/favicon.ico` | 16,958 B | **Verified** | `root.tsx` |
| `/hatco-story.mp4` | `public/hatco-story.mp4` | 13,375,104 B | **Verified** | `StorySection.tsx` (IntersectionObserver lazy-load) |
| `/hatco-sample-box.jpg` | `public/hatco-sample-box.jpg`| 761,410 B | **Verified** | `sample-kit.tsx`, `mockData.ts` |
| `/proofs/hatco-stitchout-macro.jpg` | `public/proofs/hatco-stitchout-macro.jpg` | 148,249 B | **Verified** | `sample-kit.tsx` |
| `/proofs/hatco-proof-mockup.jpg` | `public/proofs/hatco-proof-mockup.jpg` | 182,560 B | **Verified** | Order proofing fixtures |
| `/cad-images/trucker/richardson112/112_black.jpeg` | `public/cad-images/...` | 223,721 B | **Verified** | `cadCatalog.ts`, `mockData.ts`, `orderPortal.server.ts` |
| `/cad-images/trucker/academyfits/2074_neon.webp` | `public/cad-images/...` | 96,034 B | **Verified** | `cadCatalog.ts`, `InstagramShowcase.tsx`, `orderPortal.server.ts` |
| `/cad-images/dad/richardson/254RECO_navy.jpeg` | `public/cad-images/...` | 130,562 B | **Verified** | `cadCatalog.ts`, `EmbroideryShowcaseGallery.tsx` |
| `/cad-images/rope/kamel-707/K707DPR_NAVY_GREY.webp` | `public/cad-images/...` | 127,882 B | **Verified** | `cadCatalog.ts`, `EmbroideryShowcaseGallery.tsx` |

### 3.3 Font Preloading & Web Typography
Fonts loaded in `app/root.tsx`:
- `Inter` (300, 400, 500, 600, 700, 800, 900) via Google Fonts (`fonts.googleapis.com`)
- `Pirata One` (Headwear drop typography) via Google Fonts
- `Space Mono` (Technical spec hud & lead time data) via Google Fonts
- `preconnect` hints properly included for `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (with `crossOrigin: "anonymous"`).

---

## 4. Internal Navigation Links & Hash Anchor Target Verification

A full crawl of all internal links and anchor hash fragments was executed.

### 4.1 Homepage Section ID Index
The following HTML element IDs exist on `/` and are accessible to in-page smooth-scroll navigation:
`pricing`, `story`, `services`, `portfolio`, `specs`, `faq`, `inquiry`, `artwork-upload`.

### 4.2 Anchor Target Verification Table
| Anchor Link / Target | Source Component / Route | Target Page | Target ID Exists? | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| `/#services` | `Header.tsx` (Nav link) | `/` | `id="services"` | **Valid** |
| `/#story` | `Header.tsx` (Nav link) | `/` | `id="story"` | **Valid** |
| `/#portfolio` | `Header.tsx` (Nav link) | `/` | `id="portfolio"` | **Valid** |
| `/#specs` | `Header.tsx` (Nav link) | `/` | `id="specs"` | **Valid** |
| `/#inquiry` | `Header.tsx`, `FaqSection.tsx` | `/` | `id="inquiry"` | **Valid** |
| `/#pricing` | `PricingGuide.tsx` | `/` | `id="pricing"` | **Valid** |
| `/#faq` | `FaqSection.tsx` | `/` | `id="faq"` | **Valid** |
| `/#locations` | `app/routes/tx.$city.tsx` (JSON-LD Breadcrumb) | `/` | `id="locations"` | **DEAD ANCHOR (DEFECT)** |
| `/blanks` | `app/routes/blanks.$model.tsx` (JSON-LD Breadcrumb) | `/blanks` | *(Route missing)* | **404 NOT FOUND (DEFECT)** |

---

## 5. Live Staging vs. Local SSR Behavior Analysis

### 5.1 Live Staging Deployment (`https://hatco-website-afna1xzbr-foraefactory.vercel.app`)
- **Observation**: When curl or HTTP clients in the current development environment issue requests to `hatco-website-afna1xzbr-foraefactory.vercel.app`, the connection passes through the environment proxy (`http://127.0.0.1:64485`).
- **Response**: The proxy terminates external egress with:
  ```http
  HTTP/2 403
  content-type: text/plain; charset=utf-8
  Request to GET / on hatco-website-afna1xzbr-foraefactory.vercel.app not allowed by policy
  ```
- **Context**: The environment enforces a strict sandbox egress boundary in CODE_ONLY mode. External network access to live preview domains requires offline audit or direct deployment verification during promotion phases.

### 5.2 Local SSR Production Server Behavior
- Executing against the built server bundle (`./build/server/index.js`) using React Router's production `createRequestHandler`:
  - Zero hydration mismatch errors on core, corridor, and vertical pages.
  - Database and Prisma schema operate cleanly.
  - Shopify Storefront network requests fail gracefully with DNS errors (`getaddrinfo ENOTFOUND hatcompanydallas.myshopify.com`), triggering the designed fallback to curated `MOCK_PRODUCTS` and `MOCK_CORE_PRODUCTS` without crashing the SSR pipeline.
  - All 12 mock product detail routes `/shop/:handle` successfully return HTTP 200 with complete product data and interactive variant selectors.

---

## 6. Comprehensive Defect Catalog

### DEFECT 1 (CRITICAL): Runtime 500 Crash on All `/blanks/:model` Routes
- **Severity**: Critical (P0)
- **Observed Route(s)**:
  - `/blanks/richardson-112`
  - `/blanks/richardson-115`
  - `/blanks/sport-tek-stc26`
  - `/blanks/sport-tek-stc27`
  - `/blanks/comfort-colors-1717`
  - `/blanks/comfort-colors-1566`
- **Error**: `TypeError: Cannot convert undefined or null to object` at `RegionalInquiryForm (app/components/forms/RegionalInquiryForm.tsx:115:18)`
- **Root Cause**: `app/routes/blanks.$model.tsx` lines 215–219 invokes `<RegionalInquiryForm>` without passing the required `utmAttribution` prop. In `RegionalInquiryForm.tsx`, line 115 executes `Object.entries(utmAttribution).map(...)`. Since `utmAttribution` is undefined, Node runtime throws an unhandled TypeError, generating an HTTP 500 server crash on 100% of blank product pages.
- **Proposed Remediation**:
  1. In `app/routes/blanks.$model.tsx`, import `useAttribution` from `../lib/useAttribution` and call `const attribution = useAttribution();`.
  2. Pass `utmAttribution={attribution}` and blank state props to `<RegionalInquiryForm>`.
  3. In `RegionalInquiryForm.tsx`, add a defensive default: `utmAttribution = {}` or `Object.entries(utmAttribution || {})`.

---

### DEFECT 2 (CRITICAL): Invoicing & Checkout Redirects Use HTTP 302 Instead of HTTP 307
- **Severity**: Critical (P1)
- **Observed Route(s)**:
  - `/checkouts/:id` (e.g. `/checkouts/c1-9876543210fedcba`)
  - `/checkout`
  - `/cart/:line`
- **Observed Behavior**: Returns `HTTP/1.1 302 Found` with `Location: https://hatcompanydallas.myshopify.com/...`.
- **Requirement Violation**: User Request R3 and Acceptance Criteria explicitly state:
  *"Invoicing protection: all /checkouts/* routes safely redirect to Shopify."*
  *"Invoicing redirect routes (/checkouts/:id) redirect cleanly to Shopify with HTTP 307."*
- **Root Cause**: In `app/routes/checkouts.$.tsx`, `app/routes/checkout.tsx`, and `app/routes/cart.$.tsx`, `return redirect(...)` is invoked without a status argument, defaulting to HTTP 302.
- **Proposed Remediation**:
  Update all three files to explicitly specify HTTP 307:
  ```ts
  return redirect(`https://hatcompanydallas.myshopify.com${url.pathname}${url.search}`, 307);
  ```

---

### DEFECT 3 (HIGH): Missing `/blanks` Root Route Generating 404 from Breadcrumbs
- **Severity**: High (P1)
- **Observed Route**: `/blanks`
- **Observed Behavior**: Returns `HTTP 404 Not Found` with `Error: No route matches URL "/blanks"`.
- **Root Cause**: `app/routes/blanks.$model.tsx` lines 45–49 generates Schema.org breadcrumbs:
  ```ts
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: CANONICAL_BASE },
    { name: "Blanks", item: `${CANONICAL_BASE}/blanks` },
    { name: blank.name, item: `${CANONICAL_BASE}/blanks/${model}` },
  ]);
  ```
  However, no route `app/routes/blanks._index.tsx` or redirect exists for `/blanks`.
- **Proposed Remediation**:
  Either:
  1. Add a redirect in `app/routes/blanks._index.tsx` redirecting `/blanks` to `/shop` (or `/custom`), or
  2. Point the breadcrumb item to `${CANONICAL_BASE}/shop` (`name: "Catalog"`), aligning with the visual navigation breadcrumb on line 135.

---

### DEFECT 4 (HIGH): Invalid HMAC Access Key in `llms.txt` Causes 401 on Order Portal
- **Severity**: High (P2)
- **Observed File**: `app/routes/llms[.]txt.ts` (line 44)
- **Observed Behavior**:
  Link provided:
  `- [Client Order & Proofing Portal](${origin}/orders/ORD-DFW-PICKLE?token=7c1b5fe0b080d075ad39be9bdf934f03)`
  Navigating to this link returns `HTTP 401 Unauthorized` with the Access Barrier screen.
- **Root Cause**: `generateOrderToken("ORD-DFW-PICKLE")` with secret `"hatco-lab-token-v2-secret"` yields `80202675cf3fa400460e5a2cb9dd9a65`. The token in `llms.txt` (`7c1b5fe0b080...`) is an outdated or stale hash.
- **Proposed Remediation**:
  In `app/routes/llms[.]txt.ts`, dynamically generate the token using `generateOrderToken("ORD-DFW-PICKLE")` from `../lib/orderPortal.server`, or update the hardcoded token to `80202675cf3fa400460e5a2cb9dd9a65`.

---

### DEFECT 5 (MEDIUM): Dead Anchor Target `#locations` in Texas Corridor Breadcrumb Schema
- **Severity**: Medium (P2)
- **Observed Route(s)**: All 7 corridor routes (`/tx/dallas`, `/tx/fort-worth`, `/tx/arlington`, `/tx/plano`, `/tx/frisco`, `/tx/austin`, `/tx/houston`)
- **Observed Behavior**:
  In `app/routes/tx.$city.tsx` line 60:
  ```ts
  { name: "Texas Regional Hubs", url: `${origin}/#locations` }
  ```
  Target element `id="locations"` does not exist anywhere on the rendered homepage `/`.
- **Proposed Remediation**:
  Add `id="locations"` to the relevant corridor anchor section on the homepage, or update the breadcrumb link to `#services` (which exists and showcases local embroidery capabilities).

---

### DEFECT 6 (MEDIUM): Brand Rule MOQ Violation in `lp.3d-puff.tsx`
- **Severity**: Medium (P2)
- **Observed File**: `app/routes/lp.3d-puff.tsx` (lines 73 and 136)
- **Observed Behavior**:
  - Line 73: Lists `"18-Unit Minimums"`.
  - Line 136: `<input type="number" name="estimatedQuantity" required placeholder="Quantity (Min 18)" defaultValue={18} min={18} ... />`
- **Requirement Violation**: User Request R3 states:
  *"Maintain documentation integrity and preserve all existing business rules: Minimum Order Quantity (MOQ): 12 units."*
- **Proposed Remediation**:
  Update `"18-Unit Minimums"` to `"12-Unit Minimums"`, and update input attributes to `defaultValue={12}`, `min={12}`, `placeholder="Quantity (Min 12)"`.

---

### DEFECT 7 (MEDIUM): Brand Rule MOQ Violation in `blanks.$model.tsx`
- **Severity**: Medium (P2)
- **Observed File**: `app/routes/blanks.$model.tsx` (line 198)
- **Observed Behavior**:
  Volume tiering table lists: `24 - 48 (MOQ) | $18.00 - $22.00 / ea`.
- **Requirement Violation**: User Request R3 sets official MOQ at 12 units.
- **Proposed Remediation**:
  Update starter tier to `12 - 48 (MOQ) | $18.00 - $22.00 / ea` to maintain commercial consistency across all touchpoints.

---

### DEFECT 8 (MEDIUM): WCAG 2.1 AA Accessibility Deficiencies in Modals & Drawer
- **Severity**: Medium (P2)
- **Observed Files**:
  - `app/components/orders/TechPackPdfModal.tsx` (line 101): Close button has `<X className="w-5 h-5" />` without `aria-label="Close tech pack modal"`. Modal wrapper lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
  - `app/components/layout/CartDrawer.tsx` (lines 40, 96, 105, 114): Drawer close button, quantity decrement (`-`), quantity increment (`+`), and item removal (`Trash2`) buttons lack accessible names (`aria-label`). Drawer lacks `role="dialog"` and `aria-label="Shopping Cart"`.
- **Requirement Violation**: WCAG 2.1 AA Criteria 4.1.2 (Name, Role, Value) and 2.4.4 (Link Purpose).
- **Proposed Remediation**:
  Add `aria-label` attributes to all icon buttons and add ARIA modal landmarks to container wrappers.

---

### DEFECT 9 (MEDIUM): Incomplete CI Crawl Coverage in `scripts/test_site_links_and_crawls.mjs`
- **Severity**: Medium (P3)
- **Observed File**: `scripts/test_site_links_and_crawls.mjs`
- **Observed Behavior**: `CORE_URLS` array only contains static routes, corridors, and verticals. It omits all 6 `/blanks/:model` routes and all `/checkouts/:id` redirect routes. As a result, the automated test suite reported 103/103 passing while masking the critical 500 crash on blanks and 302 redirect status code.
- **Proposed Remediation**:
  Add the 6 `/blanks/:model` paths and `/checkouts/:id` to `CORE_URLS` in the test runner.

---

## 7. Route Verification Matrix

| # | Route / URL Tested | Method | Expected Status | Actual Status | Pass / Fail | Notes |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| 1 | `/` | GET | 200 | 200 | **PASS** | Hero, video, pricing, portfolio, specs, FAQ, inquiry |
| 2 | `/custom` | GET | 200 | 200 | **PASS** | CAD Studio configurator loads |
| 3 | `/sample-kit` | GET | 200 | 200 | **PASS** | $25 credit sample box loads |
| 4 | `/inspiration` | GET | 200 | 200 | **PASS** | Instagram showcase archive loads |
| 5 | `/shop` | GET | 200 | 200 | **PASS** | Product catalog loads |
| 6 | `/lp/3d-puff` | GET | 200 | 200 | **PASS** | Dedicated ad landing page loads |
| 7 | `/tx/dallas` | GET | 200 | 200 | **PASS** | Dallas manufacturing hub |
| 8 | `/tx/fort-worth` | GET | 200 | 200 | **PASS** | Fort Worth corridor |
| 9 | `/tx/arlington` | GET | 200 | 200 | **PASS** | Arlington corridor |
| 10 | `/tx/plano` | GET | 200 | 200 | **PASS** | Plano corridor |
| 11 | `/tx/frisco` | GET | 200 | 200 | **PASS** | Frisco corridor |
| 12 | `/tx/austin` | GET | 200 | 200 | **PASS** | Austin corridor |
| 13 | `/tx/houston` | GET | 200 | 200 | **PASS** | Houston corridor |
| 14 | `/tx/san-antonio` | GET | 404 | 404 | **PASS** | Boundary verification (clean 404) |
| 15 | `/industry/school-districts` | GET | 200 | 200 | **PASS** | Texas UIL athletics vertical |
| 16 | `/industry/pickleball` | GET | 200 | 200 | **PASS** | Pickleball performance vertical |
| 17 | `/industry/disc-golf` | GET | 200 | 200 | **PASS** | Disc golf player pack vertical |
| 18 | `/industry/team-sports` | GET | 200 | 200 | **PASS** | Team sports league vertical |
| 19 | `/industry/non-existent` | GET | 404 | 404 | **PASS** | Boundary verification (clean 404) |
| 20 | `/blanks/richardson-112` | GET | 200 | **500** | **FAIL** | **Crash: missing `utmAttribution`** |
| 21 | `/blanks/richardson-115` | GET | 200 | **500** | **FAIL** | **Crash: missing `utmAttribution`** |
| 22 | `/blanks/sport-tek-stc26` | GET | 200 | **500** | **FAIL** | **Crash: missing `utmAttribution`** |
| 23 | `/blanks/sport-tek-stc27` | GET | 200 | **500** | **FAIL** | **Crash: missing `utmAttribution`** |
| 24 | `/blanks/comfort-colors-1717` | GET | 200 | **500** | **FAIL** | **Crash: missing `utmAttribution`** |
| 25 | `/blanks/comfort-colors-1566` | GET | 200 | **500** | **FAIL** | **Crash: missing `utmAttribution`** |
| 26 | `/blanks/unknown-model` | GET | 404 | 404 | **PASS** | Boundary verification (clean 404) |
| 27 | `/blanks` | GET | 200 | **404** | **FAIL** | Referenced in schema, unhandled 404 |
| 28 | `/shop/richardson-classic-trucker-112` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 29 | `/shop/richardson-umpqua-snapback-cap-256` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 30 | `/shop/kamel-210-dp-plain-5-panel-hydro-hat` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 31 | `/shop/richardson-wildwood-934` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 32 | `/shop/richardson-rogue-wide-set-mesh-cap-935` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 33 | `/shop/kamel-7-panel-mid-structured-rope-hat-water-resistant-707` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 34 | `/shop/sample-kit` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 35 | `/shop/kamel-519-blank-plain-cotton-twill-five-panel-pro-style-cap-hat` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 36 | `/shop/kamel-707-7-panel-snapback-hat` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 37 | `/shop/kamel-804-5-panel-high-crown-slight-curve-trucker` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 38 | `/shop/kamel-707-snapback-panel-trucker-cap` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 39 | `/shop/kamel-dallas-707-performance-hydro-snapback-hat` | GET | 200 | 200 | **PASS** | Product detail & cart |
| 40 | `/shop/invalid-hat-handle-xyz` | GET | 404 | 404 | **PASS** | Clean 404 response |
| 41 | `/orders/ORD-DFW-PICKLE` | GET | 401 | 401 | **PASS** | Tokenless access barrier enforced |
| 42 | `/orders/ORD-DFW-PICKLE?token=8020...` | GET | 200 | 200 | **PASS** | Authorized access with valid token |
| 43 | `/orders/ORD-DFW-PICKLE?token=bad` | GET | 401 | 401 | **PASS** | Invalid token rejected |
| 44 | `/orders/ORD-TX-HIGHSCHOOL` | GET | 401 | 401 | **PASS** | Tokenless access barrier enforced |
| 45 | `/orders/ORD-TX-HIGHSCHOOL?token=1214...` | GET | 200 | 200 | **PASS** | Authorized access with valid token |
| 46 | `/orders/ORD-GHANA-STREET` | GET | 401 | 401 | **PASS** | Tokenless access barrier enforced |
| 47 | `/orders/ORD-GHANA-STREET?token=8754...` | GET | 200 | 200 | **PASS** | Authorized access with valid token |
| 48 | `/orders/ORD-HATCO-PROOF` | GET | 401 | 401 | **PASS** | Tokenless access barrier enforced |
| 49 | `/orders/ORD-HATCO-PROOF?token=1e58...` | GET | 200 | 200 | **PASS** | Authorized access with valid token |
| 50 | `/orders/ORD-NONEXISTENT?token=...` | GET | 404 | 404 | **PASS** | Clean 404 for missing order |
| 51 | `/sitemap.xml` | GET | 200 | 200 | **PASS** | Valid XML content type |
| 52 | `/robots.txt` | GET | 200 | 200 | **PASS** | Valid plain text robots rules |
| 53 | `/llms.txt` | GET | 200 | 200 | **PASS** | LLM discovery index |
| 54 | `/llms-full.txt` | GET | 200 | 200 | **PASS** | Technical spec documentation |
| 55 | `/api/instagram-stats` | GET | 200 | 200 | **PASS** | JSON API response |
| 56 | `/checkouts/c1-9876543210fedcba` | GET | **307** | **302** | **FAIL** | **Redirects with 302 instead of 307** |
| 57 | `/checkout` | GET | **307** | **302** | **FAIL** | **Redirects with 302 instead of 307** |
| 58 | `/cart/45932257247292:1` | GET | **307** | **302** | **FAIL** | **Redirects with 302 instead of 307** |
| 59 | `/app` | GET | 302/401 | 302 | **PASS** | Protected Shopify admin route |
| 60 | `/app/additional` | GET | 302/401 | 302 | **PASS** | Protected Shopify admin route |
| 61 | `/auth/login` | GET | 200 | 200 | **PASS** | Shopify OAuth login form |
