# Project: HatCo Web Fortune 100 Quality Control & Remediation

## Architecture
- **Application Framework**: React Router 7 (`@react-router/node`, `@react-router/serve`, `react-router` `^7.12.0`) SSR.
- **Styling & UI**: Tailwind CSS v4, Framer Motion, custom SVG CAD components, responsive modals.
- **Data & Invoicing Boundaries**:
  - Catalog and CMS SSR in React Router.
  - Checkout & payment redirected to Shopify (`https://hatcompanydallas.myshopify.com/checkouts/*`) with HTTP 307.
  - Client Order Portal protected by HMAC-SHA256 (`hatco-lab-token-v2-secret`) with 401 barrier and Dallas lab contact info.
- **Test Infrastructure**:
  - Hermetic Node.js ESM test runners executing `createRequestHandler(serverBuild, "production")` against `./build/server/index.js`.
  - Unified Enterprise QC runner `scripts/test_fortune100_qc.mjs`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | F1_ROUTE_CRAWL_STABILITY | 100% route crawl without SSR crashes; fix `/blanks/:model` 500 error, add `/blanks` catalog overview | M1 | Survey (e75c8ab8, ad44c4a3) |
| 2 | F2_INVOICING_307_REDIRECT | Financial redirect safety: `/checkouts/*`, `/checkout`, `/cart/*` redirect to Shopify with HTTP 307 | M1 | Survey (e75c8ab8, ad44c4a3, ee015dbe) |
| 3 | F3_SCHEMA_JSONLD_COMPLIANCE | Google Rich Results Schema.org JSON-LD (LocalBusiness, Manufacturer, Product offers/image, BreadcrumbList urls, resolve dead #locations) | M3 | Survey (ad44c4a3, e75c8ab8) |
| 4 | F4_WCAG_ACCESSIBILITY_MODALS | WCAG 2.1 AA modal compliance (role="dialog", aria-modal="true", focus trap, escape key, aria-label on close/icon buttons) | M2 | Survey (ad44c4a3, ee015dbe) |
| 5 | F5_WCAG_FORMS_CONTRAST | Form label associations (htmlFor/id), visible focus rings, color contrast >=4.5:1 (replace slate-400 with slate-600 on white) | M2 | Survey (ad44c4a3, ee015dbe) |
| 6 | F6_SECURITY_HMAC_PORTAL | HMAC-SHA256 auth on `/orders/:orderRef`: timing-safe equality, 401 barrier with Dallas lab contact, dynamic valid tokens in llms.txt | M3 | Survey (ad44c4a3, e75c8ab8) |
| 7 | F7_BUSINESS_RULES_HARMONIZATION | Canonical MOQ 12 units everywhere (fix 18 on lp.3d-puff, fix 24/48 on blanks.$model, root.tsx, FloatingSpecHud), 14-21 day turnaround | M1 | Survey (e75c8ab8, ad44c4a3) |
| 8 | F8_CORE_WEB_VITALS_MEDIA | CLS prevention: width/height on all images, video playsInline/poster, script bundling efficiency | M2 | Survey (ad44c4a3, ee015dbe) |
| 9 | F9_ENTERPRISE_QC_RUNNER | Unified automated QC test script `scripts/test_fortune100_qc.mjs` running via `npm run test:qc` and integrated into `npm run test:all` | M4 | Survey (ee015dbe, e75c8ab8) |
| 10 | F10_EXECUTIVE_AUDIT_REPORT | Enterprise audit report `docs/quality/fortune100_qc_report.md` detailing baseline, severity breakdown, code fixes, and verification | M4 | Survey (ee015dbe) |
| 11 | F11_VERCEL_PREVIEW_DEPLOYMENT | Clean compilation (`npm run build`), zero test regressions, deployment to isolated Vercel preview on `preview/v2-enhancements` | M5 | Survey (ee015dbe) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Routing Integrity, Invoicing & Business Rules | F1, F2, F7 | none | DONE |
| M2 | WCAG 2.1 AA Accessibility & Modal Remediation | F4, F5, F8 | none | DONE |
| M3 | Schema.org Structured Data, Security & Discovery | F3, F6 | M1, M2 | DONE |
| M4 | Enterprise QC Runner & Executive Report | F9, F10 | M1, M2, M3 | DONE |
| M5 | Final Milestone: 100% E2E Test Pass & Vercel Preview Deploy | F11, E2E Pass (Tiers 1-5) | M1, M2, M3, M4 | DONE |

## Interface Contracts
### Invoicing Redirect Contract
- Routes `/checkouts/*`, `/checkout`, `/cart/*` must return HTTP status 307 with `Location: https://hatcompanydallas.myshopify.com...`.
- Preserves HTTP method and headers during cross-domain redirect.

### Order Portal HMAC Contract
- URL signature: `GET /orders/:orderRef?token=<hmac>`
- Algorithm: HMAC-SHA256(`orderRef`, `hatco-lab-token-v2-secret`).slice(0, 32)
- Missing or invalid token: HTTP 401 Unauthorized with Access Barrier UI displaying Dallas lab phone `(469) 766-8690`.
- Valid token: HTTP 200 OK with full milestone tracker, proof viewer, and interactive approval actions.

### Schema.org JSON-LD Contract
- `BreadcrumbList`: every item MUST contain `@type: "ListItem"`, `position`, `name`, and valid resolving `item` (URL).
- `Product`: MUST contain `@type: "Product"`, `name`, `description`, `image`, and `offers` (`@type: "Offer"`, `priceCurrency: "USD"`, `price`, `availability: "https://schema.org/InStock"`).
- `LocalBusiness` / `Manufacturer`: MUST contain `@type: ["LocalBusiness", "Manufacturer"]`, `name: "HatCo"`, `telephone: "+1-469-766-8690"`, `addressLocality: "Dallas"`, `addressRegion: "TX"`.

### Modal Accessibility Contract
- All interactive modals must render with `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` or `aria-label`.
- Keyboard focus must be trapped while open; `Escape` key must trigger close callback.
- Close buttons and interactive icon buttons must have explicit `aria-label` attributes.

## Code Layout
- `app/routes/`: Route definitions and SSR loaders/actions.
  - `checkouts.$.tsx`, `checkout.tsx`, `cart.$.tsx`: Invoicing redirects.
  - `blanks.$model.tsx`, `blanks.tsx`: Blank model routes and catalog.
  - `orders.$orderRef.tsx`: Order proofing portal.
  - `tx.$city.tsx`: Programmatic regional corridors.
  - `industry.$niche.tsx`: Industry vertical routes.
  - `shop.$handle.tsx`: Retail drops.
  - `lp.3d-puff.tsx`: 3D puff landing page.
  - `llms[.]txt.ts`, `llms-full[.]txt.ts`: AI discovery endpoints.
- `app/components/`:
  - `layout/CartDrawer.tsx`: Cart modal drawer.
  - `orders/TechPackPdfModal.tsx`, `TexasVendorPacketModal.tsx`: Order portal modals.
  - `forms/DigitalMockupModal.tsx`, `ExitIntentCatalogModal.tsx`, `RegionalInquiryForm.tsx`, `InquiryFormSection.tsx`: Forms and dialogs.
  - `cad/CadCapStudio.tsx`: 3D cap customizer.
- `scripts/`:
  - `test_fortune100_qc.mjs`: Unified Fortune 100 QC suite.
  - `test_site_links_and_crawls.mjs`, `simulate_order_proofing_qa.mjs`, etc.
- `docs/quality/`:
  - `fortune100_qc_report.md`: Enterprise QC executive report.
