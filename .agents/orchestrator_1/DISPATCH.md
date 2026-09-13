# DISPATCH LOG

## 2026-09-07T21:45:45Z
You are the Project Orchestrator for HatCo Web.
Your working directory is: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/orchestrator_1
The application workspace is: /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
The authoritative user request is recorded in: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md

Your mission is to build and execute an autonomous, Fortune 100-grade Quality Control website scraper, auditor, and auto-remediator for HatCo Web (evaluating live staging at https://hatco-website-afna1xzbr-foraefactory.vercel.app and the local codebase), automatically remediating all detected defects in the codebase.

Requirements:
R1. Deep Scraper & Multi-Route Crawl Audit:
- Crawl and scrape 100% of reachable routes on both live Vercel staging deployment and local React Router SSR server.
- Routes include: core (/ , /custom, /sample-kit, /inspiration, /shop, /shop/:handle, /blanks/:model, /lp/3d-puff), programmatic corridors (/tx/dallas, /tx/fort-worth, /tx/arlington, /tx/plano, /tx/frisco, /tx/austin, /tx/houston), industry verticals (/industry/school-districts, /industry/pickleball, /industry/disc-golf, /industry/team-sports), order proofing portals (/orders/:orderRef with and without tokens), endpoints (/sitemap.xml, /robots.txt, /llms.txt, /llms-full.txt).
- Identify broken links, dead anchors, missing static assets (images, logos, fonts, video posters), SSR runtime errors.

R2. Fortune 100 Compliance, Accessibility & Performance Standards:
- WCAG 2.1 AA Accessibility Audit across pages and interactive modals (CartDrawer, TechPackPdfModal, TexasVendorPacketModal, RevisionModal).
- Core Web Vitals & Media Audit (hero video loading, image dimension attributes for CLS, font preloading, script bundling).
- Security & Data Protection: HMAC auth on /orders/:orderRef (401 access barrier on missing/invalid tokens, zero sensitive spec leakage, zero exposed credentials).
- Structured Data Compliance: Schema.org JSON-LD (LocalBusiness, Manufacturer, Product, FAQPage, BreadcrumbList) conforms strictly to Google Rich Results.

R3. Autonomous Code-Level Remediation:
- Autonomously correct every discovered defect, broken reference, accessibility violation, and layout discrepancy in the React Router codebase.
- Preserve business rules: MOQ 12 units, 14-21 day turnaround (5-7 day rush), phone (469) 766-8690 / +1-469-766-8690, location Dallas, TX, invoicing protection (/checkouts/* redirects safely to Shopify with HTTP 307).

R4. Automated Enterprise QC Runner & Executive Report:
- Build unified repeatable script scripts/test_fortune100_qc.mjs executed via npm run test:qc (and integrated into npm run test:all).
- Produce structured audit report docs/quality/fortune100_qc_report.md detailing baseline audit, detected issues by severity (Critical/High/Medium/Low), exact code fixes, and post-remediation verification results.

R5. Guardrails & Strict Deployment Boundaries:
- Git branch: preview/v2-enhancements.
- Deploy updated builds only to isolated Vercel preview environments (npx vercel --archive=tgz --yes). Never deploy/promote to hat.company.

Acceptance Criteria:
- 0 broken links, 0 dead anchor targets, 0 missing static media assets across 100% of discovered routes.
- 100% of core, programmatic corridor, and industry vertical routes respond with HTTP 200.
- Invoicing redirect routes (/checkouts/:id) redirect cleanly to Shopify with HTTP 307.
- 0 critical or high WCAG 2.1 AA accessibility violations.
- All interactive forms, inputs, buttons include accessible labels, ARIA landmarks, clear keyboard focus states.
- Schema.org JSON-LD validates with 0 syntax or specification errors.
- Tokenless access to /orders/:orderRef yields HTTP 401 with Access Barrier UI & Dallas lab support contact; valid HMAC token unlocks full milestone tracker, proof viewer, action buttons.
- Unified QC script (scripts/test_fortune100_qc.mjs) passes 100% of automated checks.
- Full test suite (npm run test:all) and build (npm run build) pass cleanly.
- Comprehensive audit & remediation report saved to docs/quality/fortune100_qc_report.md.
- Updated app deployed to fresh Vercel preview URL.

Maintain progress.md and BRIEFING.md in your working directory (/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/orchestrator_1) regularly so the Sentinel can monitor your progress and liveness.
When complete, notify the Sentinel with send_message detailing your results so Victory Audit can be initiated.
