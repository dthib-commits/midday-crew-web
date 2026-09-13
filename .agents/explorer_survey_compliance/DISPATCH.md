## 2026-09-07T21:46:20Z

<USER_REQUEST>
You are explorer_survey_compliance (teamwork_preview_spec_miner).
Your working directory is: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_compliance
The authoritative user request is in: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md
The application workspace is: /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
Your parent orchestrator conversation ID is: 98f2c2df-d5b7-4184-9482-d1ebefd0829b

You MUST read /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md first.
Your mission is to perform a detailed specification audit and code analysis of Fortune 100 compliance, accessibility, security, and structured data standards:
1. WCAG 2.1 AA Accessibility:
   - Audit color contrast, keyboard focus indicators (focus-visible), aria labels, button and link accessible names, and form labels.
   - Inspect interactive modals: CartDrawer, TechPackPdfModal, TexasVendorPacketModal, RevisionModal.
   - Identify missing aria-expanded, aria-controls, dialog roles, focus trap handling, or unlabeled interactive elements.
2. Core Web Vitals & Media Loading:
   - Inspect hero video elements (poster, preload, playsInline).
   - Check image tags for width/height/aspect-ratio attributes to prevent Cumulative Layout Shift (CLS).
   - Font loading and script bundling checks.
3. Security & Data Protection:
   - Inspect /orders/:orderRef authentication logic (HMAC signature verification). Check behavior when token is missing or invalid: verify HTTP 401 status and Access Barrier UI with Dallas lab support contact ((469) 766-8690 / +1-469-766-8690, Dallas, TX).
   - Verify zero secret exposure in client bundles or public endpoints.
   - Verify /checkouts/:id redirects safely to Shopify with HTTP 307.
4. Schema.org JSON-LD Structured Data:
   - Inspect JSON-LD schemas across routes (LocalBusiness, Manufacturer, Product, FAQPage, BreadcrumbList).
   - Check against Google Rich Results specification (required fields, syntax, valid URLs).

Write your detailed findings to:
/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_compliance/analysis.md
and write a standard handoff report to:
/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_compliance/handoff.md
Update your progress.md regularly. When finished, send a brief completion message to your parent (98f2c2df-d5b7-4184-9482-d1ebefd0829b).
</USER_REQUEST>
