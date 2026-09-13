## 2026-09-07T22:19:02Z
You are worker_m2.
Your working directory is: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/worker_m2
The authoritative user request is in: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md
The application workspace is: /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
Your parent orchestrator conversation ID is: 98f2c2df-d5b7-4184-9482-d1ebefd0829b

You MUST read /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md first.
Also read:
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/orchestrator_1/PROJECT.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_compliance/handoff.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_compliance/analysis.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/TEST_READY.md

Your exclusive write files:
- app/components/layout/CartDrawer.tsx
- app/components/orders/TechPackPdfModal.tsx
- app/components/orders/TexasVendorPacketModal.tsx
- app/components/orders/RevisionModal.tsx
- app/components/forms/DigitalMockupModal.tsx
- app/components/forms/ExitIntentCatalogModal.tsx
- app/components/home/InquiryFormSection.tsx
- app/components/cad/CadCapStudio.tsx
- app/routes/sample-kit.tsx
- app/components/layout/Header.tsx
- app/components/layout/Footer.tsx

DO NOT touch files outside this set.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Mission - Milestone 2 (WCAG 2.1 AA Accessibility, Modals & CLS Remediation):
1. Modal Dialog Accessibility (F4):
   - In `CartDrawer.tsx`: add `role="dialog"`, `aria-modal="true"`, `aria-label="Shopping Cart"` to drawer container. Add `aria-label="Close cart"` to close button. Add `aria-label="Decrease quantity"` and `aria-label="Increase quantity"` to adjustment buttons. Add keyboard `Escape` dismissal.
   - In `TechPackPdfModal.tsx`: add `role="dialog"`, `aria-modal="true"`, `aria-label="Tech Pack PDF Preview"` to container. Add `aria-label="Close tech pack modal"` to close button. Add `Escape` listener.
   - In `TexasVendorPacketModal.tsx`: add `role="dialog"`, `aria-modal="true"`, `aria-label="Texas Vendor Packet"` to container. Add `aria-label="Close vendor packet"` to close button. Add `Escape` listener.
   - In `RevisionModal.tsx`: add `role="dialog"`, `aria-modal="true"`, `aria-label="Request Needle Revision"` to container. Add `aria-label="Close revision modal"` to close button. Add `Escape` listener.
   - In `DigitalMockupModal.tsx`: add `role="dialog"`, `aria-modal="true"`, `aria-label="Request Free Digital Mockup"` to container. Add `aria-label="Close mockup modal"` to close button. Make blank selection cards accessible buttons or add `role="button"`, `tabIndex={0}`, keyboard handlers. Add `Escape` listener.
   - In `ExitIntentCatalogModal.tsx`: add `role="dialog"`, `aria-modal="true"`, `aria-label="Download Catalog"` to container. Add `aria-label="Close catalog modal"` to close button. Add `Escape` listener.
2. Forms, Labels & Color Contrast (F5):
   - In `InquiryFormSection.tsx`: pair all `<input>`, `<textarea>`, `<select>` with `<label htmlFor="...">` and `id="..."`. Ensure file upload input has an accessible label and visible focus ring.
   - Upgrade low-contrast text: in `TechPackPdfModal.tsx`, `TexasVendorPacketModal.tsx`, `InquiryFormSection.tsx`, change `text-slate-400` on white background to `text-slate-600` or darker to exceed WCAG 4.5:1 minimum contrast.
   - In `CadCapStudio.tsx`: add `aria-label` to all icon buttons (+/-, trash, view toggles, color options) and accessible form labels.
3. CLS Prevention & Media (F8):
   - In `sample-kit.tsx`, `TexasVendorPacketModal.tsx`, `Header.tsx`, `Footer.tsx`: ensure all `<img>` tags have explicit `width` and `height` attributes (e.g. `width={180}` `height={45}`).
4. Verification:
   - Run `npm run build` in `hatco-web`.
   - Run `node scripts/test_fortune100_qc.mjs` — verify F4 and F5 pass completely!
   - Run `npm run test:all` — verify zero regressions across existing tests.
