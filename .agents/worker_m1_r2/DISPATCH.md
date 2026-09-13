## 2026-09-07T22:10:00Z
You are worker_m1_r2.
Your working directory is: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/worker_m1_r2
The authoritative user request is in: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md
The application workspace is: /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
Your parent orchestrator conversation ID is: 98f2c2df-d5b7-4184-9482-d1ebefd0829b

You MUST read /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md first.
Also read:
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/orchestrator_1/PROJECT.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_m1_r2_1/analysis.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_m1_r2_1/handoff.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_m1_r2_2/handoff.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_m1_r2_3/handoff.md

Your exclusive write files:
- app/root.tsx
- app/routes/_index/route.tsx
- app/components/ui/PricingGuide.tsx
- app/routes/tx.$city.tsx
- app/components/forms/DigitalMockupModal.tsx
- app/components/home/ServicesSection.tsx
- app/components/ui/FloatingSpecHud.tsx
- app/routes/sample-kit.tsx
- app/routes/shop.$handle.tsx
- app/components/custom/QuoteWizard.tsx
- app/lib/mockData.ts
- app/components/home/InquiryFormSection.tsx

DO NOT touch files outside this set.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Mission - Milestone 1 Iteration 2 (Harmonize MOQ to 12 Units Across All Surfaces):
1. Review the exact before-and-after code replacements in `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_m1_r2_1/analysis.md`.
2. Apply the updates across the 12 scoped files:
   - `app/root.tsx`: line 30 meta description -> `12-unit minimums (1 dozen).`
   - `app/routes/_index/route.tsx`: line 160 meta description -> `12-unit minimums (1 dozen).`
   - `app/components/ui/PricingGuide.tsx`: lines 110, 134, 155, 22 -> `12 Hat Minimum Order (1 Dozen MOQ)`, prefill default 12.
   - `app/routes/tx.$city.tsx`: lines 264, 337 -> `12-Unit Minimums (1 Dozen)`, quantityOptions `{ value: "12", label: "12 Units (1 Dozen MOQ)" }`.
   - `app/components/forms/DigitalMockupModal.tsx`: line 228 -> `<option value="12-24">12 - 24 (1 Dozen MOQ)</option>`.
   - `app/components/home/ServicesSection.tsx`: line 48 -> `TIERED INDUSTRIAL PRICING STARTING AT 12 UNITS (1 DOZEN MOQ)`.
   - `app/components/ui/FloatingSpecHud.tsx`: lines 43, 47 -> `12 UNITS`.
   - `app/routes/sample-kit.tsx`: line 146 -> `100% credited toward your first 12+ bulk run`.
   - `app/routes/shop.$handle.tsx`: line 155 -> `NEED 12+ WITH CUSTOM EMBROIDERY?`.
   - `app/components/custom/QuoteWizard.tsx`: lines 45, 399, 419 -> default state 12, volume button 12.
   - `app/lib/mockData.ts`: update minQuantity to 12.
   - `app/components/home/InquiryFormSection.tsx`: set `min={12}` and placeholder `Quantity (Min 12 Units)` on quantity input.
3. Verification:
   - Run `npm run build` in `hatco-web`.
   - Run `node scripts/challenge_m1_moq_audit.mjs` (must pass 0 violations).
   - Run `node scripts/challenge_m1_ssr_integrity.mjs` (must pass 57/57).
   - Run `npm run test:all` (must pass 100%).

Document all changes in:
/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/worker_m1_r2/changes.md
and write a standard handoff report to:
/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/worker_m1_r2/handoff.md
Update your progress.md regularly. When finished, send a brief completion message to your parent (98f2c2df-d5b7-4184-9482-d1ebefd0829b).
