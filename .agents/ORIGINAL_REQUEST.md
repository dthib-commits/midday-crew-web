# Original User Request

## 2026-09-05T02:03:33Z

<USER_REQUEST>
Implement HatCo v2 expansion: deliver production-grade implementations for (1) Programmatic B2B SEO & Regional Ad Velocity Engine (with hyper-focused local DFW & Texas ad targeting, alongside international manufacturing trust proofs like our Ghana client), (2) Client Proofing & Live Order Status Portal, and deliver modular technical blueprints and interface specifications for the 3D Cap Configurator, AI Pre-Flight Vectorizer, and Instant Quoting/Checkout Engine. Tailor industry landing pages to HatCo's core customer segments: Pickleball, School Districts & Athletics, Disc Golf, and Team Sports.

Working directory: /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
Integrity mode: development

## Requirements

### R1. Programmatic B2B SEO & Regional Ad Velocity Engine
- Focus paid ad campaign architecture and landing pages **locally on Dallas-Fort Worth (DFW) and key Texas manufacturing corridors** (Dallas, Fort Worth, Arlington, Plano, Frisco, Austin, Houston) to maximize local lab trust ("Made in Dallas, TX") and rapid turnaround.
- Target high-affinity local and regional customer verticals:
  - **Pickleball** (DFW & regional club leagues, local tournament organizers, branded performance moisture-wicking gear).
  - **School Districts & High School Athletics** (Texas UIL sports, mascot embroidery, booster clubs, spirit wear, 25+ / 50+ volume tiering).
  - **Disc Golf** (Texas tour series, local courses/clubs, water-resistant headwear, player pack apparel).
- Feature international shipping capabilities and the Ghana client story prominently as a **global manufacturing trust marker** (*"Built in Dallas, trusted worldwide — from local Texas school districts to international brand drops in Ghana"*).
- Programmatic generation of canonical tags, OpenGraph metadata, title/description templates, and Schema.org JSON-LD structured data (`LocalBusiness` & `Manufacturer`).
- Niche-specific blank recommendations (e.g. Sport-Tek moisture wicking for Pickleball/Sports, Richardson 112/115 for Disc Golf & Schools, Comfort Colors for fan zone streetwear), with attribution forwarding to Google Chat webhooks and Meta CAPI.

### R2. Client Proofing & Live Order Tracking Portal
- Implement a tokenized, passwordless client-facing order portal (`/orders/:orderRef?token=...`) allowing B2B buyers (athletic directors, tournament organizers, club founders) to check real-time order status across milestone stages: *Brief Received → Digitizing & Mockup → Pre-Production Sample Stitch-Out → Production Floor (Ricoma Multi-Head) → 12-Point QC → Boxed Freight Dispatch (Local Courier, Domestic Freight & Global Air Freight)*.
- Interactive proof approval module: clients can view high-resolution digitized mockups and stitch-out photos, approve proofs with a single tap, or request needle adjustments with annotated revision notes.
- Support carrier tracking fields (local pickup/courier, UPS/FedEx, and international air freight).

### R3. Architectural Blueprints for Pillars 1-3
- Produce technical architecture specifications and API/component interface contracts for:
  1. *Interactive 3D Studio Configurator* (Three.js / React Three Fiber cap mesh, puff displacement maps, thread specular sheen).
  2. *Automated Artwork Pre-Flight & Vectorizer* (SVG path analyzer, minimum line-weight rule validation, automated stitch-density warnings).
  3. *Self-Serve Instant Quoting & Deposit Engine* (Direct cart/checkout session creation for 50% production reserve deposits).

### R4. Guardrails & Procedural Constraints
- **Pre-Execution Plan Review:** The agent team must document and present detailed implementation plans for review before executing destructive or major code modifications.
- **Strict Deployment Boundaries:** All work and automated verification must stay inside local development and isolated Vercel preview environments; never deploy or promote changes directly to the live `hat.company` production domain.
- **Integrations & Brand:** Use Google Chat space webhooks for alerts (never Slack); adhere to brand guidelines (Dallas TX lab, Ricoma commercial multi-head machinery, "The HatCo Team", local pride + global capability).

## Verification Plan

### Programmatic & Functional Verification
- Scripted test runner validating that programmatic SEO routes for DFW/Texas cities, Pickleball, School Districts, and Disc Golf render SSR HTML with valid JSON-LD schemas and 200 HTTP response codes.
- Simulation test for the Client Proofing route demonstrating token generation, proof retrieval, approval status state changes, tracking updates, and webhook notifications on approval.
- Full compilation and lint verification (`npm run build` and `npm run test:funnel`) passing with zero regressions.

## Acceptance Criteria

### Programmatic SEO Engine
- [ ] High-intent regional pages (DFW metros) and niche pages (Pickleball, School Districts/Athletics, Disc Golf) dynamically render with specialized local copy, blank recommendations, and valid Schema.org metadata.
- [ ] Inquiries submitted from programmatic routes retain niche and regional attribution in payload dispatches.

### Client Proofing & Order Portal
- [ ] Dedicated order tracking and proof approval route functions with secure URL token authentication.
- [ ] Order milestone pipeline supports local courier/freight as well as international carriers.
- [ ] One-click proof sign-off persists state and triggers an internal alert via Google Chat webhook.

### Architectural Deliverables
- [ ] Comprehensive technical specifications saved in `docs/architecture/` covering 3D configurator, pre-flight engine, and deposit checkout.

### System Health & Quality
- [ ] Detailed plan documented and presented prior to major code changes.
- [ ] Production build (`npm run build`) executes cleanly with zero syntax or bundling errors.

</USER_REQUEST>

## 2026-09-07T21:45:11Z

<USER_REQUEST>
Build and execute an autonomous, Fortune 100-grade Quality Control website scraper, auditor, and auto-remediator for HatCo Web (evaluating live staging at https://hatco-website-afna1xzbr-foraefactory.vercel.app and the local codebase). The system must perform an exhaustive, multi-layer inspection across broken links, accessibility, performance, interactive form flows, security barriers, and Schema.org metadata, automatically remediating all detected defects in the codebase.

Working directory: /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
Integrity mode: development

## Requirements

### R1. Deep Scraper & Multi-Route Crawl Audit
- Crawl and scrape 100% of reachable routes on both the live Vercel staging deployment and the local React Router SSR server:
  - Core routes (/ , /custom, /sample-kit, /inspiration, /shop, /shop/:handle, /blanks/:model, /lp/3d-puff).
  - Programmatic corridors (/tx/dallas, /tx/fort-worth, /tx/arlington, /tx/plano, /tx/frisco, /tx/austin, /tx/houston).
  - Industry verticals (/industry/school-districts, /industry/pickleball, /industry/disc-golf, /industry/team-sports).
  - Order proofing portals (/orders/:orderRef with and without tokens).
  - Search engine & AI endpoints (/sitemap.xml, /robots.txt, /llms.txt, /llms-full.txt).
- Identify all broken internal links, dead anchor targets (e.g. hash fragments missing matching element IDs), missing static assets (images, logos, fonts, video posters), and unhandled SSR runtime errors.

### R2. Fortune 100 Compliance, Accessibility & Performance Standards
- WCAG 2.1 AA Accessibility Audit: Audit color contrast ratios, keyboard navigable focus outlines, visible focus indicators, accessible button/link names, form input labels, and ARIA roles across all pages and interactive modals (CartDrawer, TechPackPdfModal, TexasVendorPacketModal, RevisionModal).
- Core Web Vitals & Media Audit: Audit hero video loading, image dimension attributes (preventing CLS), font preloading, and script bundling efficiency.
- Security & Data Protection: Verify cryptographic HMAC authentication on /orders/:orderRef (401 access barrier on missing/invalid tokens, zero sensitive spec leakage). Ensure zero exposed secrets or sensitive API credentials.
- Structured Data Compliance: Validate that Schema.org JSON-LD structured data (LocalBusiness, Manufacturer, Product, FAQPage, BreadcrumbList) conforms strictly to Google Rich Results specifications.

### R3. Autonomous Code-Level Remediation
- Autonomously correct every discovered defect, broken reference, accessibility violation, and layout discrepancy directly within the React Router codebase.
- Maintain documentation integrity and preserve all existing business rules:
  - Minimum Order Quantity (MOQ): 12 units.
  - Standard turnaround: 14–21 days (5–7 day rush).
  - Official phone number: (469) 766-8690 / +1-469-766-8690.
  - Official location: Dallas, TX.
  - Invoicing protection: all /checkouts/* routes safely redirect to Shopify.

### R4. Automated Enterprise QC Runner & Executive Report
- Build a unified, repeatable automated quality audit script (scripts/test_fortune100_qc.mjs) that can be executed via npm run test:qc (and integrated into npm run test:all).
- Produce a structured audit report (docs/quality/fortune100_qc_report.md) detailing the initial baseline audit, all detected issues categorized by severity (Critical / High / Medium / Low), the exact code fixes applied, and the post-remediation verification results.

### R5. Guardrails & Strict Deployment Boundaries
- All development and testing must remain on git branch preview/v2-enhancements.
- Deploy updated builds only to isolated Vercel preview environments (npx vercel --archive=tgz --yes). Never promote or deploy directly to the live production domain hat.company.

## Acceptance Criteria

### Crawl Coverage & Routing Integrity
- [ ] 0 broken links, 0 dead anchor targets, and 0 missing static media assets across 100% of discovered routes.
- [ ] 100% of core, programmatic corridor, and industry vertical routes respond with HTTP 200.
- [ ] Invoicing redirect routes (/checkouts/:id) redirect cleanly to Shopify with HTTP 307.

### Enterprise Compliance & Accessibility
- [ ] 0 critical or high-severity WCAG 2.1 AA accessibility violations across all primary templates, form elements, and interactive modals.
- [ ] All interactive forms, inputs, and buttons include accessible labels, ARIA landmarks, and clear keyboard focus states.
- [ ] Schema.org JSON-LD structured data validates cleanly with 0 syntax or specification errors.

### Security & Token Barriers
- [ ] Tokenless access to /orders/:orderRef strictly yields HTTP 401 with Access Barrier UI and Dallas lab support contact.
- [ ] Authorized access with valid HMAC token unlocks full milestone tracker, proof viewer, and action buttons.

### System Health & Automated Verification
- [ ] Unified QC script (scripts/test_fortune100_qc.mjs) executes cleanly and passes 100% of automated checks.
- [ ] Full test suite (npm run test:all) and production compilation (npm run build) pass with zero regressions.
- [ ] Comprehensive audit and remediation report saved to docs/quality/fortune100_qc_report.md.
- [ ] Updated application is deployed to a fresh Vercel preview URL.
</USER_REQUEST>

