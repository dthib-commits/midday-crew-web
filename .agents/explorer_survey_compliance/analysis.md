# Enterprise Specification & Compliance Audit: HatCo Web

**Auditor:** `explorer_survey_compliance` (teamwork_preview_spec_miner)  
**Target Application:** HatCo Web (`hatco-web`)  
**Workspace:** `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`  
**Evaluation Standard:** Fortune 100 Enterprise Quality, WCAG 2.1 AA Accessibility, Core Web Vitals, Data Protection & HMAC Security, Schema.org Google Rich Results Compliance.  
**Date:** 2026-09-07  

---

## Executive Summary

An exhaustive specification audit and empirical code analysis was conducted across all routes, server handlers, client bundles, interactive components, and Schema.org structured data generators in `hatco-web`.

While the application features advanced industrial B2B capabilities (including Ricoma multi-head embroidery calibration, CAD proofing portals, and programmatic Texas corridors), the audit identified **multiple critical enterprise defects, WCAG 2.1 AA accessibility violations, an unhandled SSR runtime crash, a redirect status discrepancy, and Schema.org syntax defects**.

### Key Findings Snapshot
1. **Critical SSR Runtime Crash (HTTP 500)**: Visiting `/blanks/:model` (e.g. `/blanks/richardson-112`) triggers `TypeError: Cannot convert undefined or null to object` at `Object.entries(utmAttribution)` inside `RegionalInquiryForm`, completely breaking SSR on all blank product routes.
2. **Security & Invoicing Redirect Discrepancy**: `/checkouts/:id` (and `/checkouts/*`, `/checkout`, `/cart/*`) uses standard `redirect()`, issuing **HTTP 302** instead of the mandated **HTTP 307 Temporary Redirect**.
3. **HMAC Token Barrier (/orders/:orderRef)**: Correctly responds with **HTTP 401** on missing or invalid tokens and displays the Dallas Lab Production Support contact (`(469) 766-8690`, `orders@hat.company`, `Dallas, TX`). Valid tokens return HTTP 200 with milestone tracking and proof viewing. However, `llms[.]txt.ts` links to `ORD-DFW-PICKLE` with a stale/mismatched hardcoded token that fails with 401.
4. **Secret Exposure Audit**: **0 secrets exposed**. Client bundles were decompiled and inspected; all sensitive credentials (`SHOPIFY_API_SECRET`, `ORDER_PORTAL_SECRET`, `SMTP_APP_PASSWORD`, `META_CAPI_ACCESS_TOKEN`, Google Chat webhook URLs) are strictly isolated to server runtimes (`.server.ts`).
5. **Schema.org Structured Data Violations**:
   - `blanks.$model.tsx` produces an invalid `BreadcrumbList` schema where `item` is `undefined` because it passes `{ item }` instead of `{ url }` to `generateBreadcrumbSchema()`.
   - `blanks.$model.tsx` produces a `Product` schema missing Google-required `offers` (with `price`, `priceCurrency`, `availability`) and `image`, failing Google Rich Results validation.
   - `shop.$handle.tsx` contains **zero Schema.org structured data**, completely omitting `Product` and `BreadcrumbList` schemas.
   - `tx.$city.tsx` breadcrumb schema references `/#locations`, which is a **dead anchor target** on the homepage (`id="locations"` does not exist).
6. **WCAG 2.1 AA Accessibility Violations**:
   - **Interactive Modals**: `CartDrawer`, `TechPackPdfModal`, `TexasVendorPacketModal`, `DigitalMockupModal`, and `ExitIntentCatalogModal` are missing `role="dialog"`, `aria-modal="true"`, focus containment/trapping, and `Escape` key listeners.
   - **Unlabeled Interactive Elements**: Close buttons in `CartDrawer`, `TechPackPdfModal`, `DigitalMockupModal`, and `FloatingSpecHud` lack `aria-label`. Cart icon in `Header.tsx` lacks `aria-label`. Mobile hamburger button lacks `aria-expanded` and `aria-label`.
   - **Form Controls Missing Labels**: All inputs in `InquiryFormSection`, `QuoteWizard` (Step 6), and `CadCapStudio` lack `<label htmlFor="...">` and `id` pairings.
   - **Color Contrast Failures**: `text-slate-400` (#94a3b8) on white backgrounds yields 2.3:1 contrast ratio (failing the 4.5:1 WCAG AA threshold for normal text).
7. **Core Web Vitals & Media Loading**:
   - Multiple `<img>` tags lack explicit `width` and `height` attributes, leading to Cumulative Layout Shift (CLS).
   - Video element in `StorySection.tsx` lacks explicit dimensions and video captions track.
8. **Business Rule Discrepancies**:
   - Minimum Order Quantity (MOQ) is strictly 12 units (1 dozen). Discrepant copy claiming "24-unit minimums" or "48 UNITS" appears in `root.tsx` meta description, `tx.$city.tsx`, `_index/route.tsx`, `FloatingSpecHud.tsx`, and `blanks.$model.tsx`.

---

## 1. WCAG 2.1 AA Accessibility & Interactive Modals Audit

### 1.1 Modal-by-Modal Inspection

#### A. CartDrawer (`app/components/layout/CartDrawer.tsx`)
- **Dialog Semantics**: The sliding drawer panel (`w-screen max-w-md`) lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="cart-title"`. Screen readers do not announce it as an interactive modal dialog.
- **Close Button**: `<button onClick={closeCart} className="..."> <X className="w-5 h-5" /> </button>` (line 40) contains only an SVG icon and has no text or `aria-label="Close cart"`.
- **Quantity Controls**: Quantity increment/decrement buttons (lines 93, 102) display single characters `-` and `+` without `aria-label="Decrease quantity"` or `aria-label="Increase quantity"`.
- **Keyboard Focus Management**: When the drawer opens, focus is not moved into the drawer; focus is not trapped within the drawer; pressing `Tab` cycles through underlying page elements; pressing `Escape` does not dismiss the drawer.
- **Image Dimensions**: Line 71 `<img src={item.image} alt={item.title} ... />` lacks `width` and `height`.

#### B. TechPackPdfModal (`app/components/orders/TechPackPdfModal.tsx`)
- **Dialog Semantics**: Lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
- **Close Button**: Line 98 `<button type="button" onClick={onClose} ...> <X className="w-5 h-5" /> </button>` has NO `aria-label`.
- **Low-Contrast Elements**:
  - Labels such as `text-[10px] font-mono text-slate-400 uppercase block` (lines 130, 142, 154, 175, 180, 184, 190, 197, 202, 207) render `#94a3b8` on `#ffffff`, resulting in a **2.3:1 contrast ratio**, directly violating WCAG 2.1 AA Criterion 1.4.3 (requires minimum 4.5:1 for normal text).
- **Focus Outlines**: Buttons (lines 82, 90) lack `focus-visible:ring-2` styling.
- **Keyboard Navigation**: Lacks focus trap, focus restoration, and `Escape` key handler.

#### C. TexasVendorPacketModal (`app/components/orders/TexasVendorPacketModal.tsx`)
- **Framing & Animation**: Line 11 `if (!isOpen) return null;` is placed before `<AnimatePresence>`, interrupting Framer Motion exit lifecycle.
- **Dialog Semantics**: Outer container lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
- **Accessible Name**: The close button at line 56 has `aria-label="Close modal"`, but the bottom "Close" button (line 227) is not linked to modal dismissal semantics.
- **Contrast Deficits**: Section labels `text-[10px] text-slate-400 uppercase` (lines 111, 115, 119, 123, 128, 134, 160, 164, 168, 189, 193, 197, 201) fail contrast ratio checks against white (2.3:1 vs 4.5:1).
- **Image Attributes**: Line 71 `<img src="/HC-logo_blk.svg" alt="HatCo. Stitch and Print" className="h-10 sm:h-12 w-auto object-contain mb-2" />` lacks `width` and `height`.
- **Keyboard Navigation**: Lacks focus containment and `Escape` key event listener.

#### D. RevisionModal (`app/components/orders/RevisionModal.tsx`)
- **Toggle Button in ProofViewerCard**: Line 410 of `ProofViewerCard.tsx`:
  `<button type="button" onClick={() => setIsRevisionDrawerOpen(!isRevisionDrawerOpen)} ...>`
  Completely lacks `aria-expanded={isRevisionDrawerOpen}` and `aria-controls="revision-drawer-panel"`. Screen reader users cannot discern if the drawer is open or collapsed.
- **Radio / Pill Selection**: The category pills (lines 84–100) are implemented as standard `<button>` tags without a parent `role="radiogroup"` and without `role="radio"` or `aria-checked={revisionCategory === cat.id}`.
- **Container Semantics**: The expandable drawer lacks `id="revision-drawer-panel"`, `role="region"`, and `aria-label="Embroidery Adjustment Request Form"`.
- **Form Inputs**: The name input and notes textarea have `<label htmlFor="...">` properly paired with `id`, which conforms to WCAG 1.3.1.

#### E. DigitalMockupModal (`app/components/forms/DigitalMockupModal.tsx`)
- **Dialog Semantics**: Outer container lacks `role="dialog"` and `aria-modal="true"`.
- **Close Button**: Line 67 `<button onClick={onClose} ...> <X className="w-5 h-5" /> </button>` has NO `aria-label="Close modal"`.
- **Blank Selector Keyboard Accessibility**: Lines 101–115 render interactive blank options using `<div>` elements with `onClick`. They lack `tabIndex={0}`, `role="radio"`, `aria-checked`, and keyboard listeners for `Enter`/`Space`. Keyboard-only users are completely unable to select a cap blank.
- **Missing Form Label Associations**:
  - Name (line 175): `<label className="...">Name *</label>` followed by `<input required type="text" ... />` without `htmlFor` or `id`.
  - Email (line 185): `<label>` lacks `htmlFor`, `<input>` lacks `id`.
  - Phone (line 198): `<label>` lacks `htmlFor`, `<input>` lacks `id`.
  - Company (line 208): `<label>` lacks `htmlFor`, `<input>` lacks `id`.
  - Target Quantity (line 220): `<label>` lacks `htmlFor`, `<select>` lacks `id`.
  - Notes (line 237): `<label>` lacks `htmlFor`, `<textarea>` lacks `id`.
- **Business Rule Violation**: Line 228 specifies `<option value="24-48">24 - 48 (Minimum)</option>`, conflicting with the 12-unit MOQ rule.

#### F. ExitIntentCatalogModal (`app/components/forms/ExitIntentCatalogModal.tsx`)
- **Dialog Semantics**: Modal window lacks `role="dialog"` and `aria-modal="true"`.
- **Missing Form Labels**:
  - Email input (line 110): `<input type="email" required placeholder="Enter your work email *" ... />` has NO `<label>` or `aria-label`.
  - Company input (line 120): `<input type="text" placeholder="Company or Brand Name (Optional)" ... />` has NO `<label>` or `aria-label`.
- **Keyboard Focus**: Lacks focus trapping and `Escape` key dismissal.

---

### 1.2 Form Controls & Label Associations Across Routes

| Component | File | Field | Defect | WCAG Criterion |
| :--- | :--- | :--- | :--- | :--- |
| `InquiryFormSection` | `home/InquiryFormSection.tsx` | Name, Email, Phone, Company, Service, Quantity, Timeline, Project Notes | Inputs lack `id` and labels lack `htmlFor`. | 1.3.1 Info & Relationships, 4.1.2 Name, Role, Value |
| `InquiryFormSection` | `home/InquiryFormSection.tsx` | Artwork file upload | Input has `opacity-0` with no visible keyboard focus ring. | 2.4.7 Focus Visible |
| `QuoteWizard` | `custom/QuoteWizard.tsx` | Step 3 Placement Options | Interactive items are `<div>` elements with `onClick`, no `role="checkbox"`, `tabIndex`, or keyboard support. | 2.1.1 Keyboard, 4.1.2 Name, Role, Value |
| `QuoteWizard` | `custom/QuoteWizard.tsx` | Step 6 Contact Inputs | Inputs lack `id` and labels lack `htmlFor`. | 1.3.1 Info & Relationships |
| `CadCapStudio` | `ui/CadCapStudio.tsx` | Step 3 & 4 Contact Inputs | 4 inputs rely solely on placeholder text; no `<label>` or `aria-label`. | 1.3.1 Info & Relationships, 3.3.2 Labels or Instructions |
| `CadCapStudio` | `ui/CadCapStudio.tsx` | Quantity +/- & Trash Buttons | Buttons contain only SVG icons; no `aria-label`. | 4.1.2 Name, Role, Value |
| `Header` | `layout/Header.tsx` | Cart Button | Contains `<ShoppingBag>` icon only; no `aria-label`. | 4.1.2 Name, Role, Value |
| `Header` | `layout/Header.tsx` | Mobile Menu Toggle | Contains icon only; lacks `aria-label` and `aria-expanded`. | 4.1.2 Name, Role, Value |
| `Footer` | `layout/Footer.tsx` | Newsletter Input | Has placeholder only; lacks `<label>` or `aria-label`. | 1.3.1, 4.1.2 |
| `FloatingSpecHud` | `ui/FloatingSpecHud.tsx` | Close HUD Button | Contains `<X>` icon only; no `aria-label`. | 4.1.2 Name, Role, Value |
| `shop.$handle` | `routes/shop.$handle.tsx` | Thumbnail Buttons | `<button>` wraps `<img alt="" />`; accessible name is empty string. | 4.1.2 Name, Role, Value |

---

### 1.3 Color Contrast Analysis (WCAG 2.1 AA — 4.5:1 for Normal Text, 3.0:1 for Large/UI)

| Component | Text Color | Background Color | Computed Contrast | Status | Required Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TechPackPdfModal` (Specs HUD labels) | `text-slate-400` (`#94a3b8`) | `#ffffff` | **2.3:1** | ❌ FAIL | Upgrade to `text-slate-600` (`#475569`, 5.9:1) or `text-slate-700` |
| `TexasVendorPacketModal` (W-9 labels) | `text-slate-400` (`#94a3b8`) | `#ffffff` | **2.3:1** | ❌ FAIL | Upgrade to `text-slate-600` (`#475569`, 5.9:1) |
| `ArtworkPreflightCard` (File metrics labels)| `text-slate-400` (`#94a3b8`) | `#f8fafc` | **2.2:1** | ❌ FAIL | Upgrade to `text-slate-600` |
| `Footer` (Value props description) | `text-slate-500` (`#64748b`) | `#f3f3f7` | **4.18:1** | ❌ FAIL (Normal text) | Upgrade to `text-slate-600` (`#475569`, 5.6:1) |
| `InquiryFormSection` (Microcopy) | `text-slate-400` (`#94a3b8`) | `#f8f8fc` | **2.2:1** | ❌ FAIL | Upgrade to `text-slate-600` |
| `ProofViewerCard` (Offset labels) | `text-slate-400` (`#94a3b8`) | `#0b0b0e` (Dark) | **5.4:1** | ✔ PASS | Retain (passes on dark theme) |
| Brand Accent Buttons | White (`#ffffff`) | `#ff3e00` | **3.9:1** | ⚠️ BORDERLINE | Conforms for large text (>= 18pt / 14pt bold); for small 10px-11px text, consider `#e03700` (4.6:1) |

---

## 2. Core Web Vitals & Media Loading Audit

### 2.1 Hero & Story Video Elements
- **Location**: `app/components/home/StorySection.tsx` (lines 79–90).
- **Observed Code**:
  ```tsx
  <video
    ref={videoRef}
    muted
    loop
    playsInline
    controls
    preload="none"
    poster="/HC-logo_wht.svg"
    className="w-full h-full object-cover p-12"
  >
    Your browser does not support the video tag.
  </video>
  ```
- **Strengths**:
  - Video buffering is deferred via `IntersectionObserver` threshold (line 59), preventing cold mobile ad clicks from downloading the 13.4MB MP4 file.
  - Includes `muted`, `loop`, `playsInline`, `controls`, and `preload="none"`.
- **Defects & CLS Risks**:
  - **Missing Explicit Width and Height**: The `<video>` element lacks native HTML `width="1280"` and `height="720"` attributes. Although wrapped in `aspect-video`, native dimensions prevent reflow before the aspect-ratio CSS is parsed.
  - **Vector SVG Poster**: `poster="/HC-logo_wht.svg"` renders a padded vector emblem. When the video initializes, a visual flash occurs. A photographic webp/jpeg poster from the Dallas shop floor is recommended.
  - **Missing Accessibility Captions**: No `<track kind="captions">` element is provided, violating WCAG 1.2.2 (Captions Prerecorded).

### 2.2 Image Dimension & Cumulative Layout Shift (CLS) Audit

The HTML specification and Core Web Vitals guidelines require explicit `width` and `height` attributes (or intrinsic aspect-ratio definitions) on all `<img>` elements to allow browsers to allocate layout boxes prior to resource fetching.

| # | File | Line | Image Source | Dimensions Provided? | CLS Risk | Recommended Attribute |
|---|------|------|--------------|----------------------|----------|-----------------------|
| 1 | `Header.tsx` | 37 | `/HC-logo_blk.svg` | None | High | `width="180" height="40"` |
| 2 | `Footer.tsx` | 51 | `/HC-logo_blk.svg` | None | Medium | `width="180" height="40"` |
| 3 | `TexasVendorPacketModal.tsx` | 71 | `/HC-logo_blk.svg` | None | Medium | `width="180" height="40"` |
| 4 | `CartDrawer.tsx` | 71 | `item.image` | None (Tailwind `w-16 h-16`) | Low | `width="64" height="64"` |
| 5 | `sample-kit.tsx` | 44 | `sampleKit.featuredImage` | None (`w-full h-full`) | High | `width="800" height="600"` |
| 6 | `sample-kit.tsx` | 57 | `/proofs/hatco-stitchout-macro.jpg` | None (`w-full h-full`) | Medium | `width="400" height="300"` |
| 7 | `sample-kit.tsx` | 74 | `/cad-images/.../112_black.jpeg` | None (`w-full h-full`) | Medium | `width="400" height="300"` |
| 8 | `shop.$handle.tsx` | 51 | `selectedImage` | None (`w-full h-full`) | High | `width="600" height="600"` |
| 9 | `shop.$handle.tsx` | 67 | Thumbnail `img` | None (`w-full h-full`) | Low | `width="80" height="80"` |
| 10 | `ProductCard.tsx` | 37 | `product.featuredImage` | None (`w-full h-full`) | High | `width="400" height="500"` |
| 11 | `ProofViewerCard.tsx` | 109 | `order.proofMockupUrl` | None (`max-h-[500px]`) | Medium | `width="600" height="500"` |
| 12 | `ProofViewerCard.tsx` | 188 | `order.stitchOutPhotoUrl` | None (`max-h-[500px]`) | Medium | `width="600" height="500"` |
| 13 | `DraggableTextureCanvas.tsx` | 36 | `item.img` | None (`w-full h-full`) | Medium | `width="340" height="255"` |
| 14 | `EmbroideryShowcaseGallery.tsx` | 124 | `item.image` | None (`w-full h-full`) | Medium | `width="400" height="300"` |

### 2.3 Font Loading & Script Bundling Analysis
- **Font Optimization**: `app/root.tsx` establishes `<link rel="preconnect">` connections to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (with `crossOrigin="anonymous"`). Google Fonts URL loads `Inter`, `Pirata One`, and `Space Mono` with `display=swap`. This ensures text remains visible during font download. Adding `<link rel="preload" as="style">` or local self-hosting would eliminate the external network hop.
- **Client Bundling**: Production compilation (`npm run build`) generates clean route splitting with modern ES modules:
  - Base client entry: `entry.client-Bg1By3iE.js` (140.91 kB, 45.61 kB gzipped).
  - Framework runtime: `jsx-runtime-CH39xwVq.js` (130.37 kB, 44.08 kB gzipped).
  - Main style bundle: `app-fdCVObGI.css` (80.48 kB, 13.02 kB gzipped).
  - Server build: `build/server/index.js` (645.62 kB).

---

## 3. Security & Data Protection Audit

### 3.1 Order Portal HMAC-SHA256 Authentication (`/orders/:orderRef`)
- **Specification**: Passwordless URL token authentication.
- **Implementation Verification**:
  - Code in `app/lib/orderPortal.server.ts` generates deterministic tokens using `crypto.createHmac("sha256", secret).update(orderRef).digest("hex").slice(0, 32)`.
  - Verification uses `crypto.timingSafeEqual(expBuf, candBuf)`, protecting against timing attacks and length discrepancy vulnerabilities.
- **Empirical Test Results**:
  1. **Tokenless Access** (`/orders/ORD-DFW-PICKLE`):
     - HTTP Status: **401 Unauthorized**.
     - UI Rendered: `AccessBarrierView` displaying `"SECURITY RESTRICTION • 401"` and `"Access Key Required"`.
     - Support Contact: Displays phone `(469) 766-8690`, email `orders@hat.company`, and location `HatCo Dallas Production Lab • Dallas, TX`.
     - Data Isolation: Zero CAD specifications, stitch counts, client names, or carrier manifests are leaked.
  2. **Invalid / Tampered Token Access** (`/orders/ORD-DFW-PICKLE?token=invalid1234567890abcdef`):
     - HTTP Status: **401 Unauthorized**.
     - UI Rendered: `AccessBarrierView`.
  3. **Authorized Access** (`/orders/ORD-DFW-PICKLE?token=80202675cf3fa400460e5a2cb9dd9a65`):
     - HTTP Status: **200 OK**.
     - UI Rendered: Complete milestone pipeline (`brief_received` through `boxed_freight_dispatch`), interactive CAD mockup viewer with laser grid alignment, Madeira Polyneon thread swatches, and proof approval controls.
- **Defect Discovered in `llms[.]txt.ts`**:
  - Line 44 specifies: `${origin}/orders/ORD-DFW-PICKLE?token=7c1b5fe0b080d075ad39be9bdf934f03`.
  - The hardcoded token `7c1b5fe0b080d075ad39be9bdf934f03` does not match the HMAC computation (`80202675cf3fa400460e5a2cb9dd9a65`). Testing this link returns **HTTP 401**. It must be generated dynamically via `generateOrderToken("ORD-DFW-PICKLE")`.

### 3.2 Secret Exposure & Client Bundle Leakage
- **Audit Methodology**: Decompiled and performed pattern scans (`grep`) across all compiled client files in `build/client/assets/*.js`.
- **Target Patterns**:
  - `SHOPIFY_API_SECRET`
  - `ORDER_PORTAL_SECRET` (`hatco-lab-token-v2-secret`)
  - `SMTP_APP_PASSWORD`
  - `META_CAPI_ACCESS_TOKEN`
  - `GOOGLE_CHAT_WEBHOOK_URL` (`chat.googleapis.com`)
  - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- **Result**: **ZERO SECRETS EXPOSED**.
  - All database queries, HMAC verifications, email dispatchers, and webhook emitters are strictly quarantined to `.server.ts` files. React Router server tree-shaking correctly strips server loader/action dependencies from browser artifacts.

### 3.3 Safe Invoicing Redirects (`/checkouts/:id`)
- **Requirement**: "Invoicing protection: all /checkouts/* routes safely redirect to Shopify with HTTP 307."
- **Empirical Execution**: Tested request to `https://hat.company/checkouts/test-123` against the production server handler.
- **Observed Result**:
  - Response Status: **HTTP 302 Found**.
  - Location Header: `https://hatcompanydallas.myshopify.com/checkouts/test-123`.
- **Defect**: In React Router, `redirect(url)` defaults to **HTTP 302**. The specification explicitly requires **HTTP 307** (Temporary Redirect) to ensure HTTP request method and body retention during merchant checkout transfers.
- **Affected Files**:
  - `app/routes/checkouts.$.tsx`: `return redirect(targetUrl);` -> must be `return redirect(targetUrl, 307);`.
  - `app/routes/checkout.tsx`: `return redirect(targetUrl);` -> must be `return redirect(targetUrl, 307);`.
  - `app/routes/cart.$.tsx`: `return redirect(targetUrl);` -> must be `return redirect(targetUrl, 307);`.

---

## 4. Schema.org JSON-LD Structured Data Audit

### 4.1 Schema Inventory Across Routes

| Route | `@type` Rendered | Status | Defect / Rich Results Issue |
| :--- | :--- | :--- | :--- |
| `/` | `["LocalBusiness", "Manufacturer"]`, `FAQPage` | ✔ PASS | Fully populated with Dallas coordinates, address, phone, and FAQ items. |
| `/tx/:city` | `["LocalBusiness", "Manufacturer"]`, `BreadcrumbList` | ⚠️ WARNING | BreadcrumbList item 2 references `/#locations`, which is a dead anchor target on `/`. |
| `/industry/:vertical` | `["LocalBusiness", "Manufacturer"]`, `BreadcrumbList` | ✔ PASS | BreadcrumbList properly references `/#services` (which exists). |
| `/blanks/:model` | `Product`, `BreadcrumbList` | ❌ FAIL (Crash) | Route crashes with **HTTP 500** during SSR. When evaluated in isolation, `BreadcrumbList` contains `item: undefined`, and `Product` lacks required `offers` and `image`. |
| `/shop/:handle` | None | ❌ FAIL (Missing) | **Zero Schema.org JSON-LD is emitted.** Missing `Product` and `BreadcrumbList` schemas. |

### 4.2 Detailed Schema Defects Against Google Rich Results Specification

#### 1. Critical SSR Crash on `/blanks/:model`
- **Location**: `app/routes/blanks.$model.tsx` lines 215–219.
- **Root Cause**: The component invokes `<RegionalInquiryForm />` without required props (`utmAttribution`, `region`, `city`, `landingPage`, etc.).
- **Stack Trace**:
  ```
  TypeError: Cannot convert undefined or null to object
      at Object.entries (<anonymous>)
      at RegionalInquiryForm (app/components/forms/RegionalInquiryForm.tsx:115:19)
  ```
- **Consequence**: Every single `/blanks/:model` URL (e.g. Richardson 112, Richardson 115, Sport-Tek STC26) crashes with HTTP 500 in SSR.

#### 2. Corrupted BreadcrumbList Schema on `/blanks/:model`
- **Location**: `app/routes/blanks.$model.tsx` lines 45–49:
  ```ts
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: CANONICAL_BASE },
    { name: "Blanks", item: `${CANONICAL_BASE}/blanks` },
    { name: blank.name, item: `${CANONICAL_BASE}/blanks/${model}` },
  ]);
  ```
- **Root Cause**: `generateBreadcrumbSchema` expects an array of `BreadcrumbItem { name: string; url: string }`. Because `blanks.$model.tsx` passed `item` instead of `url`, `item.url` evaluates to `undefined`.
- **Output Generated**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home" },
      { "@type": "ListItem", "position": 2, "name": "Blanks" },
      { "@type": "ListItem", "position": 3, "name": "Richardson 112 Classic Trucker" }
    ]
  }
  ```
- **Google Spec Violation**: Google Rich Results requires `item` to be a valid absolute URL for each `ListItem`. Missing `item` causes Google Search Console structured data rejection.

#### 3. Product Schema Missing Required Fields on `/blanks/:model`
- **Location**: `app/routes/blanks.$model.tsx` lines 26–43.
- **Specification Requirement (Google Search Central — Product Structured Data)**:
  A Product rich snippet requires either `offers`, `review`, or `aggregateRating`, plus an `image` URL.
- **Observed Schema**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Richardson 112 Classic Trucker",
    "description": "...",
    "brand": { "@type": "Brand", "name": "Richardson" },
    "manufacturer": {
      "@type": "Organization",
      "name": "HatCo Stitch & Print",
      "location": { "@type": "Place", "name": "Dallas, TX" }
    }
  }
  ```
- **Missing Required Properties**:
  - `image`: URL of product image.
  - `offers`: Must include `@type: "Offer"`, `price`, `priceCurrency: "USD"`, `availability: "https://schema.org/InStock"`, `url`.

#### 4. Missing Product Schema on `/shop/:handle`
- **Location**: `app/routes/shop.$handle.tsx`.
- **Defect**: Retail drops (e.g. `/shop/richardson-classic-trucker-112`) render detailed product variants, pricing, and imagery, but emit **no JSON-LD script tag**. Google cannot parse rich product snippets for retail merchandise.

#### 5. Dead Anchor Target `/#locations`
- **Location**: `app/routes/tx.$city.tsx` line 60:
  `{ name: "Texas Regional Hubs", url: `${origin}/#locations` }`
- **Defect**: When crawling `https://hat.company/`, no HTML element has `id="locations"`. Clicking or following this anchor does not navigate to a matching element.

---

## 5. Business Rules & Documentation Consistency Audit

| Business Rule | Canonical Requirement | Codebase Status | Violations Found |
| :--- | :--- | :--- | :--- |
| **Minimum Order Quantity (MOQ)** | Strictly **12 units** (1 dozen) | Inconsistent | 1. `root.tsx:30`: `"24-unit minimums"` in meta description.<br>2. `tx.$city.tsx:264`: `"24-Unit Minimums"`.<br>3. `_index/route.tsx:160`: `"24-unit minimums."`.<br>4. `FloatingSpecHud.tsx:47`: `"MIN QUANTITY: 48 UNITS"`.<br>5. `DigitalMockupModal.tsx:228`: `<option value="24-48">24 - 48 (Minimum)</option>`.<br>6. `blanks.$model.tsx:198`: `24 - 48 (MOQ)`. |
| **Turnaround Timeline** | **14–21 Days Standard (5–7 Day Rush)** | Mostly Consistent | `FloatingSpecHud.tsx:43` incorrectly states `"RUSH PIPELINE: 14 DAYS"`. |
| **Official Phone Number** | **(469) 766-8690 / +1-469-766-8690** | 100% Consistent | Verified across `seoData.ts`, `AccessBarrierView.tsx`, `TexasVendorPacketModal.tsx`, `llms.txt`, `llms-full.txt`. |
| **Official Lab Location** | **Dallas, TX** | 100% Consistent | Verified across all corridor headers, letterheads, and Schema.org addresses. |
| **Invoicing Protection** | `/checkouts/*` redirects to Shopify with **HTTP 307** | Non-Compliant | Currently returning **HTTP 302**. |

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Security | Passwordless Order Portal | Tokenized URL authentication for B2B order milestone tracking | `orderRef`, `token` (HMAC query param) | JSON data with milestone timeline, proof photos, carrier info | Returns HTTP 401 with Access Barrier UI if token missing/invalid; HTTP 404 if orderRef not found | Code review of `orders.$orderRef.tsx` & `orderPortal.server.ts` |
| 2 | Security | Timing-Safe Token Validation | Constant-time comparison preventing timing side-channel attacks | Expected 32-char / full hex token, candidate string | Boolean (`true`/`false`) | Rejects null, undefined, non-string, length mismatch safely | Code review of `orderPortal.server.ts:verifyOrderToken` |
| 3 | Routing | Invoicing Redirect Engine | Safely forwards checkout and cart URLs to Shopify checkout | Request path and search params | HTTP redirect to `hatcompanydallas.myshopify.com` | Currently outputs HTTP 302 instead of required HTTP 307 | Code review and empirical test of `checkouts.$.tsx` |
| 4 | SEO / Schema | Programmatic Corridor Schema | Generates Schema.org `LocalBusiness` & `Manufacturer` JSON-LD for Texas cities | Corridor profile, canonical origin | JSON-LD schema with coordinates, postal address, phone, priceRange | Valid fallback to Dallas HQ coordinates | Code review of `seoData.ts:generateCorridorSchema` |
| 5 | SEO / Schema | Programmatic Vertical Schema | Generates multi-type `LocalBusiness` & `Manufacturer` JSON-LD for verticals | Vertical profile, canonical origin | JSON-LD schema with Dallas HQ anchor, knowsAbout list | Valid schema emitted | Code review of `seoData.ts:generateVerticalSchema` |
| 6 | SEO / Schema | BreadcrumbList Schema Generator | Generates hierarchical breadcrumbs for navigation and SERP breadcrumb rich snippets | Array of `{ name, url }` items | JSON-LD `BreadcrumbList` schema with `ListItem` positions | Produces `item: undefined` when callers pass `item` property instead of `url` | Code review of `seoData.ts:generateBreadcrumbSchema` |
| 7 | SEO / Schema | FAQPage Schema Generator | Generates Schema.org `FAQPage` for Google Rich Snippets & AI Overviews | Array of `{ id, question, answer }` | JSON-LD `FAQPage` schema with `Question` and `acceptedAnswer` | Formats cleanly for home page | Code review of `seoData.ts:generateFaqSchema` |
| 8 | SEO / Schema | Blank Product Schema | Generates Schema.org `Product` for cap blanks | Blank catalog record | JSON-LD `Product` schema | Missing `offers` and `image` required for Google Rich Results | Code review of `blanks.$model.tsx` |
| 9 | Accessibility | In-Page Smooth Anchor Scrolling | Scrolls viewport to targeted section on hash load or navigation click | Hash target string (e.g. `#story`, `#specs`) | Smooth window scroll and history state push | Fails silently if element ID does not exist in DOM | Code review of `Header.tsx` & `_index/route.tsx` |
| 10 | Accessibility | Accessible FAQ Accordion | Keyboard-expandable FAQ drawer with ARIA states | Click or Enter/Space on accordion button | Toggles open panel state | Proper `aria-expanded`, `aria-controls`, and `role="region"` implemented | Code review of `FaqSection.tsx` |
| 11 | Order Proofing | Interactive Laser Seam Calibration | Micro-nudge offset (+/- 0.5mm) and visor elevation clearance (0.5", 0.75", 1.0") | User button clicks for nudge and elevation | Interactive SVG laser reticle overlay and offset notes | Buttons lack accessible labels | Code review of `ProofViewerCard.tsx` |
| 12 | Order Proofing | Proof Revision Request Drawer | Expandable drawer with revision categories and annotation textarea | Form submission with category, client name, notes, token | Dispatches revision note and updates order proofStatus | Submit disabled on empty notes; toggle button lacks aria-expanded | Code review of `RevisionModal.tsx` |
| 13 | Order Proofing | Printable Commercial Tech-Pack | Modal rendering printable B2B purchase order proposal with letterhead | Order specs, pricing breakdown, contact details | Printable DOM view formatted with CSS media print | Modal lacks role="dialog", aria-modal="true", close aria-label | Code review of `TechPackPdfModal.tsx` |
| 14 | Order Proofing | Texas ISD Vendor Packet | Printable W-9 and Form 01-339 tax exemption onboarding document | Facility and tax credentials | Printable DOM view with compliance seal | Modal lacks role="dialog", close aria-label; low-contrast text | Code review of `TexasVendorPacketModal.tsx` |
| 15 | CAD Studio | Interactive 3D/CAD Studio | Multi-step cap customizer with live 3D preview, colorway selection, and pricing | User clicks, text inputs, file drops | Dynamic pricing breakdown, deposit calculation, PDF generation | Inputs lack labels; icon buttons lack aria-label; drag gesture only | Code review of `CadCapStudio.tsx` |
| 16 | Media Loading | Viewport-Deferred Story Video | Plays commercial video when scrolled into viewport | IntersectionObserver threshold (0.25) | Sets video.src and calls play(); attaches tracking milestones | Missing native width/height attributes and video captions track | Code review of `StorySection.tsx` |
| 17 | LLM Endpoints | Machine-Readable Documentation | Markdown summaries for search engine AI bots (`llms.txt`, `llms-full.txt`) | HTTP GET request | Plaintext markdown specification | `llms.txt` contains stale HMAC token returning HTTP 401 | Code review and test of `llms[.]txt.ts` |

---

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Order Portal Authentication | Empty token (`/orders/ORD-DFW-PICKLE`) | Server returns HTTP 401; renders `AccessBarrierView` with Dallas lab support contact. |
| 2 | Order Portal Authentication | Invalid / tampered token (`/orders/ORD-DFW-PICKLE?token=badtoken123`) | Server returns HTTP 401; renders `AccessBarrierView`. |
| 3 | Order Portal Authentication | Prototype pollution attempt (`/orders/ORD-DFW-PICKLE?token=__proto__`) | Timing-safe buffer compare rejects safely; returns HTTP 401 without error. |
| 4 | Order Portal Authentication | Non-existent order ref (`/orders/ORD-NON-EXISTENT?token=...`) | Token validation fails or server returns HTTP 404; renders `OrderNotFoundView`. |
| 5 | Order Portal Proof Revision | Whitespace-only revision notes | Action returns HTTP 400 with error: `"Revision notes are required. Please describe needed needle adjustments."` |
| 6 | Invoicing Redirect | Route `/checkouts/12345?discount=PROMO` | Server returns HTTP 302 (should be 307); preserves query string in location header. |
| 7 | Blank Product Route SSR | Request to `/blanks/richardson-112` | Server crashes with HTTP 500 (`TypeError: Cannot convert undefined or null to object` in `RegionalInquiryForm`). |
| 8 | Blank Product Route SSR | Request to non-existent blank (`/blanks/non-existent`) | Throws Response with HTTP 404 Not Found cleanly. |
| 9 | BreadcrumbList Generation | Caller passes `{ name, item }` instead of `{ name, url }` | `itemListElement` generates `item: undefined`, omitting the URL property in JSON-LD output. |
| 10 | Homepage Navigation Link | Click on breadcrumb link `/#locations` | Hash change occurs but `document.getElementById("locations")` returns `null`; no scroll or focus shift. |
| 11 | AI Crawler Link | Request to `llms.txt` sample order link | Token in `llms.txt` does not match HMAC hash; returns HTTP 401 Unauthorized instead of proof portal. |
| 12 | Exit Intent Modal Display | Mobile device (`window.innerWidth < 1024`) | Exit intent mouseleave listener is suppressed; modal never opens on mobile devices. |
| 13 | Floating Spec HUD Toggle | Click on HUD close icon button | HUD minimizes to bottom-right floating pill; close button has no accessible name. |
| 14 | Digital Mockup Modal Blank Select | Keyboard user presses `Tab` through modal | Blank selection cards cannot receive keyboard focus; keyboard user cannot select blanks. |
| 15 | Shop Product Detail SSR | Shopify Storefront API unavailable | Catches `ENOTFOUND` gracefully; falls back to mock catalog product data with HTTP 200. |

---

## Prioritized Remediation Action Plan

### Critical Severity (P0)
1. **Fix SSR Crash on `/blanks/:model`**:
   - Update `app/routes/blanks.$model.tsx` to provide default props to `<RegionalInquiryForm />` (including empty or default `utmAttribution={{}}`, `region="Texas"`, `city="Dallas"`, `landingPage="/blanks/..."`, `selectedBlank={blank.name}`, `setSelectedBlank={() => {}}`, `blankOptions={[...]}`).
   - Update `RegionalInquiryForm.tsx` to defensively handle `utmAttribution = {}` (`Object.entries(utmAttribution || {})`).
2. **Correct Invoicing Redirect Status (HTTP 307)**:
   - In `app/routes/checkouts.$.tsx`, `app/routes/checkout.tsx`, and `app/routes/cart.$.tsx`, pass explicit status `307`:
     `return redirect(targetUrl, 307);`

### High Severity (P1)
3. **Resolve Schema.org Specification Defects**:
   - In `blanks.$model.tsx`, pass `{ name, url }` to `generateBreadcrumbSchema()`.
   - In `blanks.$model.tsx`, enhance `Product` schema to include `image` and `offers` (`@type: "Offer"`, `price`, `priceCurrency: "USD"`, `availability: "https://schema.org/InStock"`, `url`).
   - In `shop.$handle.tsx`, add Schema.org `Product` and `BreadcrumbList` structured data scripts.
   - In `tx.$city.tsx`, change breadcrumb target from `/#locations` to `/#story` or add `id="locations"` to the Texas manufacturing corridor section on `/`.
4. **Fix Broken Token in `llms.txt`**:
   - In `app/routes/llms[.]txt.ts`, import `generateOrderToken` from `../lib/orderPortal.server` and dynamically output the valid HMAC token for `ORD-DFW-PICKLE`.
5. **Enforce Modal Dialog Accessibility**:
   - Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap handling, and `Escape` key event listeners across `CartDrawer`, `TechPackPdfModal`, `TexasVendorPacketModal`, `DigitalMockupModal`, and `ExitIntentCatalogModal`.
   - Provide explicit `aria-label` on all close buttons (`<X>`).

### Medium Severity (P2)
6. **Form Control Labels & Focus States**:
   - Associate `<label htmlFor="...">` with matching input `id` across `InquiryFormSection.tsx`, `QuoteWizard.tsx` (Step 6), and `CadCapStudio.tsx`.
   - Ensure file upload inputs display visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#ff3e00]`).
   - Add `aria-expanded` and `aria-controls` to the "Request Needle Adjustments" toggle in `ProofViewerCard.tsx`.
7. **Fix Color Contrast**:
   - Replace low-contrast `text-slate-400` on light backgrounds with `text-slate-600` or `text-slate-700` across `TechPackPdfModal`, `TexasVendorPacketModal`, and `ArtworkPreflightCard`.
   - Replace `text-slate-500` with `text-slate-600` on light grey footers.
8. **Prevent Cumulative Layout Shift (CLS)**:
   - Add explicit `width` and `height` attributes to all `<img>` tags (`Header.tsx`, `Footer.tsx`, `ProductCard.tsx`, `sample-kit.tsx`, `shop.$handle.tsx`, `ProofViewerCard.tsx`).
   - Add explicit dimensions to `<video>` in `StorySection.tsx`.

### Low Severity (P3)
9. **Business Rule Copy Harmonization**:
   - Replace all discrepant mentions of "24-unit minimums" with "12-unit minimums (1 dozen)" in `root.tsx` meta description, `_index/route.tsx`, `tx.$city.tsx`, and `blanks.$model.tsx`.
   - Correct `FloatingSpecHud.tsx` to display `MIN QUANTITY: 12 UNITS` and `RUSH PIPELINE: 5–7 DAYS`.
