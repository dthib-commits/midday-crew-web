# Handoff Report — explorer_m1_r2_1

**Task**: Exhaustive Codebase Search and Remediation Specification for Residual MOQ Strings  
**Parent Conversation ID**: `98f2c2df-d5b7-4184-9482-d1ebefd0829b`  
**Working Directory**: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_m1_r2_1`  
**Application Workspace**: `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`  
**Type**: Hard Handoff  
**Date**: 2026-09-07

---

## 1. Observation

Direct empirical execution of `node scripts/challenge_m1_moq_audit.mjs` against `./build/server/index.js` yielded the following verbatim results:

```
Scan Complete. Total Stale MOQ Violations Found: 25

🚨 STALE MOQ VIOLATIONS DETECTED:
[1] SOURCE: app/root.tsx:30 -> 24-unit MOQ
     Snippet: ""Dallas TX contract manufacturer for custom headwear, embroidery, screen print & DTF. 3D puff embroidery on Ricoma multi-head machines. 24-unit minimums. Free mockups in 24 hours.","
[2] SOURCE: app/root.tsx:30 -> 24-unit minimum
     Snippet: ""Dallas TX contract manufacturer for custom headwear, embroidery, screen print & DTF. 3D puff embroidery on Ricoma multi-head machines. 24-unit minimums. Free mockups in 24 hours.","
[3] SOURCE: app/routes/_index/route.tsx:160 -> 24-unit MOQ
     Snippet: ""Dallas TX industrial contract manufacturer for custom headwear, 3D puff embroidery, screen print & DTF on Ricoma commercial multi-head machines. 24-unit minimums.";"
[4] SOURCE: app/routes/_index/route.tsx:160 -> 24-unit minimum
     Snippet: ""Dallas TX industrial contract manufacturer for custom headwear, 3D puff embroidery, screen print & DTF on Ricoma commercial multi-head machines. 24-unit minimums.";"
[5] SOURCE: app/routes/tx.$city.tsx:264 -> 24-unit MOQ
     Snippet: "<span className="hidden sm:inline">24-Unit Minimums</span>"
[6] SOURCE: app/routes/tx.$city.tsx:264 -> 24-unit minimum
     Snippet: "<span className="hidden sm:inline">24-Unit Minimums</span>"
[7] SOURCE: app/components/ui/PricingGuide.tsx:110 -> 24-unit MOQ
     Snippet: "<li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">24 Hat</strong> Minimum Order</span></li>"
[8] SOURCE: app/components/ui/PricingGuide.tsx:134 -> 20-unit MOQ
     Snippet: "<li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-white">20 Hat</strong> Minimum Order</span></li>"
[9] SOURCE: app/components/ui/PricingGuide.tsx:155 -> 18-unit MOQ
     Snippet: "<li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff3e00] shrink-0" /> <span><strong className="text-[#0f0f12]">18 Hat</strong> Minimum Order</span></li>"
[10] SOURCE: app/components/forms/DigitalMockupModal.tsx:228 -> 24-48 (MOQ/Minimum)
     Snippet: "<option value="24-48">24 - 48 (Minimum)</option>"
[11] SOURCE: app/components/home/ServicesSection.tsx:48 -> Starting at 24-48 units
     Snippet: "TIERED INDUSTRIAL PRICING STARTING AT 24-48 UNITS"
[12] RENDERED: Route / -> 18 Hat Minimum Order in HTML
[13] RENDERED: Route / -> 20 Hat Minimum Order in HTML
[14] RENDERED: Route / -> 24 Hat Minimum Order in HTML
[15] RENDERED: Route / -> 24-unit minimums in HTML
[16] RENDERED: Route / -> Starting at 24-48 units in HTML
[17] RENDERED: Route /lp/3d-puff -> 24-unit minimums in HTML
[18] RENDERED: Route /tx/dallas -> 24-unit minimums in HTML
[19] RENDERED: Route /tx/dallas -> 24 Units (Min) in HTML
[20] RENDERED: Route /tx/fort-worth -> 24-unit minimums in HTML
[21] RENDERED: Route /tx/fort-worth -> 24 Units (Min) in HTML
[22] RENDERED: Route /tx/houston -> 24-unit minimums in HTML
[23] RENDERED: Route /tx/houston -> 24 Units (Min) in HTML
[24] RENDERED: Route /sample-kit -> 24-unit minimums in HTML
[25] RENDERED: Route /custom -> 24-unit minimums in HTML

Verdict: STRICT 12-UNIT MOQ ADHERENCE HAS FAILED.
```

Furthermore, an exhaustive recursive pattern scan across all files in `app/` identified the following additional residual references:
1. `app/components/ui/FloatingSpecHud.tsx` (Lines 43, 47):
   ```tsx
   <span className="text-[#0f0f12] font-bold">14 DAYS</span>
   <span className="text-[#0f0f12] font-bold">48 UNITS</span>
   ```
   (Contrasting with `app/components/cad/FloatingSpecHud.tsx` lines 45 & 49 which specify `5–7 DAYS` and `12 UNITS (1 DOZEN)`).
2. `app/routes/sample-kit.tsx` (Line 146):
   ```tsx
   Risk-Free: 100% credited toward your first 24+ bulk run
   ```
3. `app/lib/mockData.ts`:
   - Lines 51, 65, 80, 93: `minQuantity: 48,`
   - Line 247: `$25 credited toward your first 24+ bulk run.`
4. `app/routes/shop.$handle.tsx` (Line 155):
   ```tsx
   <h4 className="text-xs font-extrabold text-[#0f0f12] uppercase">NEED 48+ WITH CUSTOM EMBROIDERY?</h4>
   ```
5. `app/components/custom/QuoteWizard.tsx`:
   - Line 45: `const [quantity, setQuantity] = useState<number>(48);`
   - Line 399: `{[24, 48, 100, 250].map((qty) => (`
   - Line 419: `["Standard (14 Days)", "Rush Production (Under 14 Days)"]`
6. `app/components/ui/CadCapStudio.tsx` (Line 74):
   ```tsx
   const [exactQuantity, setExactQuantity] = useState<number>(48);
   ```
7. `app/routes/custom.tsx` (Line 42):
   ```tsx
   quantity: parseInt(quantityRaw || "48", 10),
   ```
8. `app/routes/llms-full[.]txt.ts` (Line 60):
   ```markdown
   | **Starter Tier (24 – 49 Units)** |
   ```
9. `app/components/ui/PricingGuide.tsx` (Line 22):
   ```tsx
   if (qtyInput) qtyInput.value = volume50 || tier === "25+" ? "50+" : "24";
   ```
10. `app/lib/seoData.ts` (Lines 432, 588, 671):
    ```ts
    unitRange: "24 – 49 Units",
    ```

---

## 2. Logic Chain

1. **Defect Etiology**:
   - `ORIGINAL_REQUEST.md` (R3) mandates: *"Minimum Order Quantity (MOQ): 12 units."*
   - During Milestone 1 Iteration 1, `worker_m1` corrected MOQ in `app/routes/lp.3d-puff.tsx`, `app/routes/blanks.$model.tsx`, and `app/components/cad/FloatingSpecHud.tsx`.
   - However, `app/root.tsx` (line 30) and `app/routes/_index/route.tsx` (line 160) retained `24-unit minimums.`. Because `root.tsx` provides default meta tags inherited across all un-overridden routes, pages such as `/sample-kit`, `/inspiration`, `/custom`, `/shop`, and `/lp/3d-puff` continue to render `24-unit minimums.` into their `<meta name="description">` tags in SSR HTML output.
   - Similarly, `PricingGuide.tsx` lines 110, 134, and 155 continued to advertise `24 Hat Minimum Order`, `20 Hat Minimum Order`, and `18 Hat Minimum Order` on the homepage (`/`), and `tx.$city.tsx` line 264 rendered `24-Unit Minimums` across all 7 programmatic corridors.

2. **Full-Spectrum Discovery**:
   - Examining all component trees revealed that user intake forms (`DigitalMockupModal.tsx`, `QuoteWizard.tsx`, `tx.$city.tsx` quantity select) and state hooks (`CadCapStudio.tsx`, `custom.tsx`) either default to 48 units or restrict options to 24 units as the lowest selection, blocking users from requesting orders at the canonical 12-unit MOQ.

3. **Classification of Valid Non-Defects**:
   - Certain occurrences of 48 in the codebase are valid business rules:
     - 48 units is the legitimate MOQ for **custom patch programs** (woven, leather, PVC) due to custom mold/die requirements (`llms.txt:24`, `llms-full.txt:48`, `seoData.ts:914`).
     - 48 units is the volume incentive threshold at which the **$40 digitizing setup fee is waived** (`pricingEngine.ts:96-97`, `CadCapStudio.tsx:1139`, `TechPackPdfModal.tsx:262`).
     - 24–48 hours refers to **digital proof generation speed**, not order quantities (`custom.tsx:64`, `inspiration.tsx:40`).
     - 25+ units is the **apparel volume tier break** for screen printed and DTF teamwear/streetwear garments (`PricingGuide.tsx:237`, `seoData.ts:514`).

4. **Actionability**:
   - All 15 defective locations have been mapped with exact line numbers and concrete `before` and `after` code replacements in `analysis.md`. Implementing these targeted edits will immediately resolve all 25 audit violations and ensure complete canonical MOQ harmonization.

---

## 3. Caveats

- **Read-Only Explorer Discipline**: In accordance with the Explorer archetype rules, no source files in `app/` were modified by this agent. All proposed edits are documented in `.agents/explorer_m1_r2_1/analysis.md` for execution by `worker_m1`.
- **Patch Program Differentiation**: The implementer must be careful NOT to alter the 48-unit MOQ for custom patch programs or the 48+ threshold for digitizing fee waivers, as these are explicit brand specifications.

---

## 4. Conclusion

The root cause of the Milestone 1 Iteration 1 challenge failure is fully identified and mapped.
To achieve 100% pass across all challenge harnesses (`challenge_m1_moq_audit.mjs`, `challenge_m1_ssr_integrity.mjs`, and `challenge_m1_ssr_stress.mjs`), `worker_m1` must execute the exact code replacements documented in:
`/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_m1_r2_1/analysis.md`

### Summary of Required Changes:
1. **`app/root.tsx` (Line 30)**: Replace `24-unit minimums.` with `12-unit minimums (1 dozen).`
2. **`app/routes/_index/route.tsx` (Line 160)**: Replace `24-unit minimums.` with `12-unit minimums (1 dozen).`
3. **`app/components/ui/PricingGuide.tsx` (Lines 110, 134, 155, 22)**: Replace `24/20/18 Hat Minimum Order` with `12 Hat Minimum Order (1 Dozen MOQ)`, and update prefill value on line 22 to `"12-24 units"`.
4. **`app/routes/tx.$city.tsx` (Lines 264, 337)**: Replace `24-Unit Minimums` with `12-Unit Minimums (1 Dozen)` and update `quantityOptions` to include 12 units.
5. **`app/components/forms/DigitalMockupModal.tsx` (Line 228)**: Replace `<option value="24-48">24 - 48 (Minimum)</option>` with `<option value="12-24">12 - 24 (1 Dozen Minimum)</option>` and `<option value="25-48">25 - 48</option>`.
6. **`app/components/home/ServicesSection.tsx` (Line 48)**: Replace `TIERED INDUSTRIAL PRICING STARTING AT 24-48 UNITS` with `TIERED INDUSTRIAL PRICING STARTING AT 12 UNITS (1 DOZEN MOQ)`.
7. **`app/components/ui/FloatingSpecHud.tsx` (Lines 43, 47)**: Update to `5–7 DAYS` and `12 UNITS (1 DOZEN)`.
8. **`app/routes/sample-kit.tsx` (Line 146)**: Replace `24+ bulk run` with `12+ bulk run (1 Dozen MOQ)`.
9. **`app/lib/mockData.ts` (Lines 51, 65, 80, 93, 247)**: Update `minQuantity: 12` and `$25 credited toward your first 12+ bulk run (1 dozen MOQ).`
10. **`app/routes/shop.$handle.tsx` (Line 155)**: Replace `NEED 48+ WITH CUSTOM EMBROIDERY?` with `NEED 12+ WITH CUSTOM EMBROIDERY?`.
11. **`app/components/custom/QuoteWizard.tsx` (Lines 45, 399, 419)**: Initialize default quantity to 12, include 12 in volume tier buttons, update timeline labels.
12. **`app/components/ui/CadCapStudio.tsx` (Line 74)**: Initialize default `exactQuantity` to 12.
13. **`app/routes/custom.tsx` (Line 42)**: Update fallback `quantityRaw || "12"`.
14. **`app/routes/llms-full[.]txt.ts` (Line 60)**: Update Starter Tier to `(12 – 49 Units)`.
15. **`app/lib/seoData.ts` (Lines 432, 588, 671)**: Update `unitRange` to `"12 – 49 Units"`.

---

## 5. Verification Method

To independently verify the defects before remediation and confirm resolution after remediation:

```bash
cd /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
npm run build
node scripts/challenge_m1_moq_audit.mjs
node scripts/challenge_m1_ssr_integrity.mjs
```

- **Pre-Remediation Verification**: `challenge_m1_moq_audit.mjs` fails with 25 violations detected; `challenge_m1_ssr_integrity.mjs` fails on 12 routes in Part 3.
- **Post-Remediation Pass Criteria**:
  1. `node scripts/challenge_m1_moq_audit.mjs` reports **0 violations** and exits with `"Strict 12-Unit MOQ Adherence Verified Across All Templates & Routes!"`.
  2. `node scripts/challenge_m1_ssr_integrity.mjs` passes **57 / 57 checks**.
  3. `node scripts/challenge_m1_ssr_stress.mjs` passes **59 / 59 checks**.
  4. `npm run test:all` executes with 0 failures.
- **Invalidation Conditions**: Any SSR route or source template outputting `24-unit minimum`, `18-unit minimum`, `20 Hat Minimum Order`, `24 Hat Minimum Order`, or `18 Hat Minimum Order`.
