# Comprehensive MOQ Codebase Analysis & Remediation Specification

**Agent**: `explorer_m1_r2_1`  
**Working Directory**: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_m1_r2_1`  
**Application Directory**: `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`  
**Canonical Business Rule**: **Minimum Order Quantity (MOQ) is strictly 12 units (1 dozen).**  
**Date**: 2026-09-07

---

## Executive Summary

Milestone 1 Iteration 1 failed adversarial challenge gate verification due to residual/legacy strings advertising 18, 20, 24, and 48-unit minimums across both source templates and rendered SSR HTML output.

An exhaustive, multi-pass search across all files in `app/` (routes, components, UI, forms, lib, metadata endpoints) was conducted. The investigation confirmed **25 active defects** causing test failures in `scripts/challenge_m1_moq_audit.mjs` and `scripts/challenge_m1_ssr_integrity.mjs`, and discovered **10 additional residual/stale references** across forms, wizards, and state initializers that violate the canonical 12-unit MOQ rule.

This document details every affected file, exact line number, current verbatim code, and proposed replacement code ready for implementation by `worker_m1`.

---

## Part 1: Primary Target Files (Direct Gate Failures)

These 6 files are directly responsible for the 25 rendered HTML and source violations detected by `challenge_m1_moq_audit.mjs` and `challenge_m1_ssr_integrity.mjs`.

### 1. `app/root.tsx`
- **Location**: Line 30
- **Scope**: Global default `<meta name="description">` inherited by all pages that do not provide custom descriptions (`/sample-kit`, `/inspiration`, `/custom`, `/shop`, etc.).
- **Current Content**:
  ```tsx
  content:
    "Dallas TX contract manufacturer for custom headwear, embroidery, screen print & DTF. 3D puff embroidery on Ricoma multi-head machines. 24-unit minimums. Free mockups in 24 hours.",
  ```
- **Replacement Content**:
  ```tsx
  content:
    "Dallas TX contract manufacturer for custom headwear, embroidery, screen print & DTF. 3D puff embroidery on Ricoma multi-head machines. 12-unit minimums (1 dozen). Free mockups in 24 hours.",
  ```
- **Rationale**: Removes `24-unit minimums.` from global HTML `<meta>` tags and establishes canonical 12-unit copy.

---

### 2. `app/routes/_index/route.tsx`
- **Location**: Line 160
- **Scope**: Homepage (`/`) meta description and OpenGraph description.
- **Current Content**:
  ```tsx
  const description =
    "Dallas TX industrial contract manufacturer for custom headwear, 3D puff embroidery, screen print & DTF on Ricoma commercial multi-head machines. 24-unit minimums.";
  ```
- **Replacement Content**:
  ```tsx
  const description =
    "Dallas TX industrial contract manufacturer for custom headwear, 3D puff embroidery, screen print & DTF on Ricoma commercial multi-head machines. 12-unit minimums (1 dozen).";
  ```
- **Rationale**: Eliminates `24-unit minimums.` from the homepage SSR head payload and search crawler meta.

---

### 3. `app/components/ui/PricingGuide.tsx`
- **Location**: Lines 110, 134, 155, and Line 22
- **Scope**: Homepage (`/`) Official Pricing Guide table and interactive tier selection handler.
- **Current Content (Line 110 — Basic Tier)**:
  ```tsx
  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">24 Hat</strong> Minimum Order</span></li>
  ```
- **Replacement Content (Line 110)**:
  ```tsx
  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">12 Hat</strong> Minimum Order (1 Dozen MOQ)</span></li>
  ```
- **Current Content (Line 134 — Standard Tier)**:
  ```tsx
  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-white">20 Hat</strong> Minimum Order</span></li>
  ```
- **Replacement Content (Line 134)**:
  ```tsx
  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-white">12 Hat</strong> Minimum Order (1 Dozen MOQ)</span></li>
  ```
- **Current Content (Line 155 — Premium Tier)**:
  ```tsx
  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">18 Hat</strong> Minimum Order</span></li>
  ```
- **Replacement Content (Line 155)**:
  ```tsx
  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">12 Hat</strong> Minimum Order (1 Dozen MOQ)</span></li>
  ```
- **Current Content (Line 22 — Prefill Logic)**:
  ```tsx
  if (qtyInput) qtyInput.value = volume50 || tier === "25+" ? "50+" : "24";
  ```
- **Replacement Content (Line 22)**:
  ```tsx
  if (qtyInput) qtyInput.value = volume50 || tier === "25+" ? "50+" : "12-24 units";
  ```
- **Rationale**: Harmonizes all 3 headwear tiers to canonical 12-unit minimum and ensures clicking tier CTA pre-selects the `"12-24 units"` option in the inquiry form.

---

### 4. `app/routes/tx.$city.tsx`
- **Location**: Line 264 and Lines 336–342
- **Scope**: Top banner bar and inquiry form across all 7 Texas corridors (`/tx/dallas`, `/tx/fort-worth`, `/tx/arlington`, `/tx/plano`, `/tx/frisco`, `/tx/austin`, `/tx/houston`).
- **Current Content (Line 264)**:
  ```tsx
  <span className="hidden sm:inline">24-Unit Minimums</span>
  ```
- **Replacement Content (Line 264)**:
  ```tsx
  <span className="hidden sm:inline">12-Unit Minimums (1 Dozen)</span>
  ```
- **Current Content (Lines 336–342)**:
  ```tsx
  quantityOptions={[
    { value: "24", label: "24 Units (Min)" },
    { value: "50", label: "50 Units" },
    { value: "100", label: "100 Units" },
    { value: "250", label: "250 Units" },
    { value: "500+", label: "500+ Units (Enterprise)" },
  ]}
  ```
- **Replacement Content (Lines 336–342)**:
  ```tsx
  quantityOptions={[
    { value: "12", label: "12 Units (Starter / 1 Dozen MOQ)" },
    { value: "24", label: "24 Units" },
    { value: "50", label: "50 Units" },
    { value: "100", label: "100 Units" },
    { value: "250", label: "250 Units" },
    { value: "500+", label: "500+ Units (Enterprise)" },
  ]}
  ```
- **Rationale**: Removes `24-Unit Minimums` from regional headers and allows regional clients to select the 12-unit minimum.

---

### 5. `app/components/forms/DigitalMockupModal.tsx`
- **Location**: Line 228
- **Scope**: Sitewide modal form ("See Your Logo in 3D").
- **Current Content (Line 228)**:
  ```tsx
  <option value="24-48">24 - 48 (Minimum)</option>
  ```
- **Replacement Content (Line 228)**:
  ```tsx
  <option value="12-24">12 - 24 (1 Dozen Minimum)</option>
  <option value="25-48">25 - 48</option>
  ```
- **Rationale**: Permits customers to request digital mockups starting at the canonical 12-unit order threshold.

---

### 6. `app/components/home/ServicesSection.tsx`
- **Location**: Line 48
- **Scope**: Homepage (`/#services`) manufacturing floor headline subtitle.
- **Current Content (Line 48)**:
  ```tsx
  <p className="text-xs font-mono text-slate-500 max-w-xs sm:text-right">
    TIERED INDUSTRIAL PRICING STARTING AT 24-48 UNITS
  </p>
  ```
- **Replacement Content (Line 48)**:
  ```tsx
  <p className="text-xs font-mono text-slate-500 max-w-xs sm:text-right">
    TIERED INDUSTRIAL PRICING STARTING AT 12 UNITS (1 DOZEN MOQ)
  </p>
  ```
- **Rationale**: Updates the section header on the homepage to accurately reflect that tiered contract pricing begins at 12 units.

---

## Part 2: Additional Codebase Discrepancies Discovered

Exhaustive recursive scanning of `app/` uncovered residual 48 and 24-unit defaults and strings in secondary components and data files:

### 7. `app/components/ui/FloatingSpecHud.tsx`
- **Location**: Lines 43, 47
- **Scope**: Floating Spec HUD component (ui folder variant). Note that `app/components/cad/FloatingSpecHud.tsx` was previously updated to `5–7 DAYS` and `12 UNITS (1 DOZEN)`, but `app/components/ui/FloatingSpecHud.tsx` still holds stale numbers.
- **Current Content (Lines 42–48)**:
  ```tsx
  <div className="flex justify-between">
    <span className="text-slate-500">RUSH PIPELINE:</span>
    <span className="text-[#0f0f12] font-bold">14 DAYS</span>
  </div>
  <div className="flex justify-between">
    <span className="text-slate-500">MIN QUANTITY:</span>
    <span className="text-[#0f0f12] font-bold">48 UNITS</span>
  </div>
  ```
- **Replacement Content (Lines 42–48)**:
  ```tsx
  <div className="flex justify-between">
    <span className="text-slate-500">RUSH PIPELINE:</span>
    <span className="text-[#0f0f12] font-bold">5–7 DAYS</span>
  </div>
  <div className="flex justify-between">
    <span className="text-slate-500">MIN QUANTITY:</span>
    <span className="text-[#0f0f12] font-bold">12 UNITS (1 DOZEN)</span>
  </div>
  ```
- **Rationale**: Synchronizes both HUD implementations with canonical 12-unit MOQ and 5–7 day rush business rules.

---

### 8. `app/routes/sample-kit.tsx`
- **Location**: Line 146
- **Scope**: Sample kit page credit reassurance callout badge.
- **Current Content (Line 146)**:
  ```tsx
  <p className="text-xs font-bold text-[#ff3e00] uppercase tracking-wider bg-[#ff3e00]/10 py-2 px-4 rounded-full inline-block">
    Risk-Free: 100% credited toward your first 24+ bulk run
  </p>
  ```
- **Replacement Content (Line 146)**:
  ```tsx
  <p className="text-xs font-bold text-[#ff3e00] uppercase tracking-wider bg-[#ff3e00]/10 py-2 px-4 rounded-full inline-block">
    Risk-Free: 100% credited toward your first 12+ bulk run (1 Dozen MOQ)
  </p>
  ```
- **Rationale**: Informs buyers that sample fee credits apply immediately to their first order of 12+ units.

---

### 9. `app/lib/mockData.ts`
- **Location**: Lines 51, 65, 80, 93, and Line 247
- **Scope**: Blank models catalog specification data and sample kit product description.
- **Current Content (Lines 51, 65, 80, 93)**:
  ```ts
  minQuantity: 48,
  ```
- **Replacement Content (Lines 51, 65, 80, 93)**:
  ```ts
  minQuantity: 12,
  ```
- **Current Content (Line 247)**:
  ```ts
  description: "Touch the stitch density, test our 3D foam resilience, and feel Richardson mesh before placing your bulk run. $25 credited toward your first 24+ bulk run.",
  ```
- **Replacement Content (Line 247)**:
  ```ts
  description: "Touch the stitch density, test our 3D foam resilience, and feel Richardson mesh before placing your bulk run. $25 credited toward your first 12+ bulk run (1 dozen MOQ).",
  ```
- **Rationale**: Ensures catalog data structures reflect the 12-unit minimum.

---

### 10. `app/routes/shop.$handle.tsx`
- **Location**: Line 155
- **Scope**: Custom intake banner on individual retail product pages (`/shop/:handle`).
- **Current Content (Line 155)**:
  ```tsx
  <h4 className="text-xs font-extrabold text-[#0f0f12] uppercase">NEED 48+ WITH CUSTOM EMBROIDERY?</h4>
  ```
- **Replacement Content (Line 155)**:
  ```tsx
  <h4 className="text-xs font-extrabold text-[#0f0f12] uppercase">NEED 12+ WITH CUSTOM EMBROIDERY?</h4>
  ```
- **Rationale**: Connects retail shop visitors to the custom intake engine at the true 12-unit entry point.

---

### 11. `app/components/custom/QuoteWizard.tsx`
- **Location**: Lines 45, 399, 419
- **Scope**: Custom quote wizard state initialization, volume buttons, and timeline buttons.
- **Current Content (Line 45)**:
  ```tsx
  const [quantity, setQuantity] = useState<number>(48);
  ```
- **Replacement Content (Line 45)**:
  ```tsx
  const [quantity, setQuantity] = useState<number>(12);
  ```
- **Current Content (Line 399)**:
  ```tsx
  {[24, 48, 100, 250].map((qty) => (
  ```
- **Replacement Content (Line 399)**:
  ```tsx
  {[12, 24, 48, 100, 250].map((qty) => (
  ```
- **Current Content (Line 419)**:
  ```tsx
  {["Standard (14 Days)", "Rush Production (Under 14 Days)"].map((dl) => (
  ```
- **Replacement Content (Line 419)**:
  ```tsx
  {["Standard (14–21 Days)", "Rush Production (5–7 Days)"].map((dl) => (
  ```
- **Rationale**: Allows users of the custom quote wizard to start at 12 pcs and select accurate 14–21 standard / 5–7 rush deadlines.

---

### 12. `app/components/ui/CadCapStudio.tsx`
- **Location**: Line 74
- **Scope**: State initialization for `exactQuantity`. (Note: line 973 already includes `12` in `[12, 24, 48, 100, 250, 500]`).
- **Current Content (Line 74)**:
  ```tsx
  const [exactQuantity, setExactQuantity] = useState<number>(48);
  ```
- **Replacement Content (Line 74)**:
  ```tsx
  const [exactQuantity, setExactQuantity] = useState<number>(12);
  ```
- **Rationale**: Sets the default initial volume selection in the CAD Cap Customizer to the canonical 12 units instead of 48.

---

### 13. `app/routes/custom.tsx`
- **Location**: Line 42
- **Scope**: Action fallback quantity when `quantityRaw` is empty.
- **Current Content (Line 42)**:
  ```tsx
  quantity: parseInt(quantityRaw || "48", 10),
  ```
- **Replacement Content (Line 42)**:
  ```tsx
  quantity: parseInt(quantityRaw || "12", 10),
  ```
- **Rationale**: Ensures fallback quote quantity parses to 12 if not provided in form submission.

---

### 14. `app/routes/llms-full[.]txt.ts`
- **Location**: Line 60
- **Scope**: Volume pricing architecture table for LLM discovery.
- **Current Content (Line 60)**:
  ```markdown
  | **Starter Tier (24 – 49 Units)** | $17.50 – $18.50 / unit | $14.50 / unit | $28.00 / unit | Free 3D Digital Proof in 24h, 1 front placement, up to 9 thread colors, individual polybagging |
  ```
- **Replacement Content (Line 60)**:
  ```markdown
  | **Starter Tier (12 – 49 Units)** | $17.50 – $18.50 / unit | $14.50 / unit | $28.00 / unit | Free 3D Digital Proof in 24h, 1 front placement, up to 9 thread colors, individual polybagging |
  ```
- **Rationale**: Aligns the LLM pricing documentation with `pricingEngine.ts` where Starter Commercial tier begins at 12 units.

---

### 15. `app/lib/seoData.ts` (Industry Vertical Volume Tiers)
- **Location**: Lines 432, 588, 671
- **Scope**: Niche vertical volume tier definition rendered on `/industry/pickleball`, `/industry/disc-golf`, and `/industry/team-sports`.
- **Current Content (Lines 432, 588, 671)**:
  ```ts
  unitRange: "24 – 49 Units",
  ```
- **Replacement Content (Lines 432, 588, 671)**:
  ```ts
  unitRange: "12 – 49 Units",
  ```
- **Rationale**: Eliminates the 24-unit starter floor from rendered industry vertical volume tier cards. Note: `school-districts` uses `"25 – 49 Units"` for Varsity/Booster starter, which aligns with Texas high school roster sizes as specified in the original request.

---

## Part 3: Legitimate Uses of "48" and "24" (DO NOT REMOVE)

The following occurrences of "48" or "24" in the codebase are legitimate business rules or technical parameters and MUST NOT be changed:

1. **Custom Patch Program MOQ (48 Units)**:
   - Files: `app/routes/llms.txt:24`, `app/routes/llms-full.txt:48`, `app/lib/seoData.ts:914`.
   - Business Rule: Custom woven, leather, and PVC patches require custom metal die and mold tooling, which canonically maintains a 48-unit MOQ. Standard cap and apparel embroidery is 12 units.
2. **Digitizing Setup Fee Waiver Threshold (48+ Units)**:
   - Files: `app/lib/pricingEngine.ts:96-97`, `app/components/ui/CadCapStudio.tsx:1139`, `app/components/orders/TechPackPdfModal.tsx:262`.
   - Business Rule: The one-time industrial digitizing fee ($40) is waived for orders of 48+ units as a volume incentive.
3. **Turnaround Speed in Hours (24–48 Hours)**:
   - Files: `app/routes/custom.tsx:64`, `app/routes/inspiration.tsx:40`, `app/components/home/InquiryFormSection.tsx:76, 146`, `app/components/forms/DigitalMockupModal.tsx:38, 83`.
   - Context: "within 24 hours" or "24–48 hours" refers to the digital proof turnaround time, not order quantities.
4. **Apparel Volume Tier Breaks (25+ Units)**:
   - Files: `app/components/ui/PricingGuide.tsx:237, 284`, `app/lib/seoData.ts:514` (school districts spirit wear).
   - Context: Garment-dyed DTF tees and athletic polystretch polos utilize a 25+ volume tier break.

---

## Part 4: Verification Strategy for Implementer

Following code modifications by `worker_m1`, the implementation should be verified using:

1. **MOQ Scan & SSR Render Audit**:
   ```bash
   cd /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
   npm run build
   node scripts/challenge_m1_moq_audit.mjs
   ```
   - **Target**: 0 stale MOQ violations detected (down from 25).
2. **Adversarial SSR Integrity Suite**:
   ```bash
   node scripts/challenge_m1_ssr_integrity.mjs
   ```
   - **Target**: 57 / 57 checks passed (including all 23 rendered HTML checks).
3. **SSR Concurrency & Stress Harness**:
   ```bash
   node scripts/challenge_m1_ssr_stress.mjs
   ```
   - **Target**: 59 / 59 checks passed.
4. **Full Test Suite & Build Compilation**:
   ```bash
   npm run test:all
   ```
   - **Target**: Clean pass with zero regressions.
