# E2E Test Infra: HatCo Web Fortune 100 Quality Control

## Test Philosophy
- **Opaque-box & Requirement-driven**: Derived directly from `ORIGINAL_REQUEST.md` and Fortune 100 enterprise specifications.
- **Methodology**: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Testing.
- **Execution Model**: Deterministic, hermetic Node.js ESM test runner executing `createRequestHandler` against `./build/server/index.js` simulating real HTTP requests, headers, and responses.

## Feature Inventory & Test Coverage Matrix
| # | Feature | Requirement | Tier 1 (Coverage) | Tier 2 (Boundaries) | Tier 3 (Pairwise) | Tier 4 (Workload) |
|---|---------|-------------|:-----------------:|:-------------------:|:-----------------:|:-----------------:|
| 1 | F1_ROUTE_CRAWL_STABILITY | R1, Crawl Coverage | 5 | 5 | ✓ | ✓ |
| 2 | F2_INVOICING_307_REDIRECT | R3, Invoicing 307 | 5 | 5 | ✓ | ✓ |
| 3 | F3_SCHEMA_JSONLD_COMPLIANCE | R2, Schema.org | 5 | 5 | ✓ | ✓ |
| 4 | F4_WCAG_ACCESSIBILITY_MODALS | R2, WCAG 2.1 AA | 5 | 5 | ✓ | ✓ |
| 5 | F5_WCAG_FORMS_CONTRAST | R2, Form/Contrast | 5 | 5 | ✓ | ✓ |
| 6 | F6_SECURITY_HMAC_PORTAL | R2, Security & HMAC | 5 | 5 | ✓ | ✓ |
| 7 | F7_BUSINESS_RULES_HARMONIZATION | R3, MOQ 12 & Rules | 5 | 5 | ✓ | ✓ |
| 8 | F8_CORE_WEB_VITALS_MEDIA | R2, CLS & Media | 5 | 5 | ✓ | ✓ |
| 9 | F9_ENTERPRISE_QC_RUNNER | R4, test_fortune100_qc.mjs | 5 | 5 | ✓ | ✓ |
| 10 | F10_EXECUTIVE_AUDIT_REPORT | R4, Audit Report | 5 | 5 | ✓ | ✓ |
| 11 | F11_VERCEL_PREVIEW_DEPLOYMENT | R5, Isolated Preview | 5 | 5 | ✓ | ✓ |

## Minimum Test Counts
- **Tier 1 (Feature Coverage)**: 11 features × 5 = 55 test cases
- **Tier 2 (Boundary & Corner Cases)**: 11 features × 5 = 55 test cases
- **Tier 3 (Cross-Feature Combinations)**: 11 pairwise tests
- **Tier 4 (Real-World Application Scenarios)**: 6 comprehensive enterprise workloads
- **Total Minimum Target**: 127 test cases

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Texas High School Athletic Director Fall Football Order | F1, F3, F5, F7, F8 | High |
| 2 | DFW Regional Pickleball Tournament Branded Performance Drop | F1, F4, F6, F7 | High |
| 3 | Disc Golf Club Water-Resistant Hat Customization & Mockup | F1, F4, F5, F7, F8 | High |
| 4 | B2B Buyer Invoicing & Cart Transfer to Shopify Checkout | F1, F2, F7 | Medium |
| 5 | Live Order Proofing: HMAC Signature Verification, Inspection & 401 Barrier | F1, F6, F4 | High |
| 6 | Search Engine Crawler & LLM Discovery Indexing (sitemap, llms.txt, JSON-LD) | F1, F3, F6 | Medium |

## Test Architecture
- **Location**: `scripts/test_fortune100_qc.mjs`
- **Invocation**: `npm run test:qc` (and integrated into `npm run test:all`)
- **Assertions**: Explicit checks for HTTP status codes, header directives (e.g. `location`, `cache-control`), DOM attributes (`role="dialog"`, `aria-label`, `width`, `height`), JSON-LD schema validity, and cryptographic HMAC integrity.
- **Pass/Fail Semantics**: Exit code 0 indicates 100% assertions passed; non-zero exit code fails CI/CD.
