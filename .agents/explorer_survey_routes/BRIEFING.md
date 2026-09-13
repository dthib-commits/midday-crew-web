# BRIEFING — 2026-09-07T21:53:00Z

## Mission
Comprehensive survey of all routes, crawl surfaces, links, media, and SSR endpoints for HatCo Web.

## 🔒 My Identity
- Archetype: explorer
- Roles: explorer, survey_routes
- Working directory: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_routes
- Original parent: 98f2c2df-d5b7-4184-9482-d1ebefd0829b
- Milestone: survey_routes

## 🔒 Key Constraints
- Read-only investigation — do NOT implement code changes
- Inspect all routes, crawl surfaces, links, media, SSR endpoints, staging responses, and local server behavior
- Target hatco-web and live staging https://hatco-website-afna1xzbr-foraefactory.vercel.app

## Current Parent
- Conversation ID: 98f2c2df-d5b7-4184-9482-d1ebefd0829b
- Updated: not yet

## Investigation State
- **Explored paths**:
  - `app/routes.ts`, `app/routes/*` (all 26 route files)
  - `app/lib/seoData.ts`, `app/lib/orderPortal.server.ts`, `app/lib/mockData.ts`, `app/lib/shopify.server.ts`
  - `public/` (all 68 static assets, cad-images, proofs, logos, mp4 video)
  - Modals: `TechPackPdfModal.tsx`, `TexasVendorPacketModal.tsx`, `RevisionModal.tsx`, `CartDrawer.tsx`
  - Test suites: `scripts/test_site_links_and_crawls.mjs`, `simulate_funnel_qa.mjs`, etc.
- **Key findings**:
  - 61 route variations audited: 51 passing, 10 failing.
  - Critical P0: 100% of `/blanks/:model` routes crash with HTTP 500 (`TypeError: Cannot convert undefined or null to object` in `RegionalInquiryForm` due to missing `utmAttribution`).
  - Critical P1: Invoicing redirects `/checkouts/:id`, `/checkout`, `/cart/*` return HTTP 302 instead of required HTTP 307.
  - High: Schema breadcrumb references non-existent `/blanks` (404); `llms.txt` contains stale HMAC token for `/orders/ORD-DFW-PICKLE` (401).
  - Medium: Dead anchor `#locations` in Schema.org breadcrumb; 18-unit MOQ mismatch in `lp.3d-puff.tsx`; 24-48 unit MOQ mismatch in `blanks.$model.tsx`; missing modal `aria-label` and `role="dialog"` landmarks in `TechPackPdfModal` and `CartDrawer`.
  - Staging proxy policy blocks external sandbox egress with HTTP/2 403.
  - 57 unique rendered media references verified with zero missing files.
- **Unexplored areas**: None remaining for survey_routes milestone.

## Key Decisions Made
- Executed in-process production SSR server analysis against `./build/server/index.js` to bypass sandbox egress restriction while faithfully testing real server-side rendering logic.
- Conducted full enumeration of 61 route targets, 57 static assets, and 98 navigation links.
- Compiled exhaustive analysis report (`analysis.md`) and 5-component handoff report (`handoff.md`).

## Artifact Index
- analysis.md — Comprehensive survey findings and defect catalog
- handoff.md — 5-component handoff report
- progress.md — Liveness heartbeat
- DISPATCH.md — Incoming instruction log
