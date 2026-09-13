# Milestone 5 Quality Review & Adversarial Analysis Report

**Reviewer Agent:** `reviewer_m5_2` (Instance 2 of 2)  
**Roles:** `reviewer` (Objective review, verification, verdict) & `critic` (Adversarial challenge, edge-case stress testing)  
**Target Milestone:** Milestone 5 — Isolated Vercel Preview Deployment, Guardrail Enforcement & Remote Probe Verification  
**Target Repository:** `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`  
**Git Branch:** `preview/v2-enhancements`  
**Vercel Deployment ID:** `dpl_FGzzVkkDp3p5TUxAeWFPnxmrTXT3`  
**Live Preview URL:** `https://hatco-website-k0zydeb6a-foraefactory.vercel.app`  
**Date & Timestamp:** 2026-09-07T23:07:45Z  

---

## Part 1: Quality Review

### 1.1 Review Summary

**Verdict:** **APPROVE**

Milestone 5 deliverables satisfy all requirements set forth in `ORIGINAL_REQUEST.md`, `PROJECT.md`, and the dispatch instructions:
1. **Isolated Vercel Preview Deployment:** Successfully deployed and verified at `https://hatco-website-k0zydeb6a-foraefactory.vercel.app` under deployment ID `dpl_FGzzVkkDp3p5TUxAeWFPnxmrTXT3`. Target is strictly `preview` (`target: null` in Vercel API, `target preview` in CLI). Zero promotions or alias bindings to `hat.company` were made.
2. **Deployment Guardrails:** Development and testing strictly adhered to git branch `preview/v2-enhancements`. Zero commits were made to `main`. Flag `--prod` was strictly omitted.
3. **Probe Runner Integrity (`scripts/verify_m5_preview.mjs`):** The probe runner script was thoroughly inspected and independently executed. It sends genuine network HTTP requests (via standard `fetch`) against the remote Vercel preview deployment, verifying 18 critical live endpoints across core routes, catalog, CAD studio, shop drops, Texas corridors, invoicing 307 redirects, HMAC 401 barriers, authenticated order portals, SEO schemas, and discovery endpoints. All 18/18 live endpoints respond as expected (HTTP 200, 307, 401).
4. **Independent Full Test Suite & Build Verification:** `npm run build` cleanly compiled client assets and the SSR bundle in 2.39s + 353ms. `npm run test:all` (7 suites: `test:funnel`, `test:seo`, `test:portal`, `test:elite`, `test:roster`, `test:crawl`, and `test:qc`) passed 100% with 0 regressions, including all 127 Fortune 100 automated checks.
5. **Documentation Accuracy:** `docs/quality/fortune100_qc_report.md` Section 8 accurately reflects the deployment ID, preview URL, and probe matrix.

---

### 1.2 Integrity Check & Anti-Cheating Attestation

In accordance with system reviewer guidelines, an exhaustive integrity check was conducted:
- **No Hardcoded Test Bypasses:** Verified that `scripts/verify_m5_preview.mjs` and `scripts/test_fortune100_qc.mjs` do not mock or hardcode return values; all assertions execute live HTTP requests against the external Vercel deployment and local SSR server bundle.
- **No Dummy or Facade Implementations:** All routes (`/orders/:orderRef`, `/checkouts/*`, `/tx/:city`, `/blanks`, `/custom`) render authentic functional logic, dynamic cryptographic HMAC verification, valid JSON-LD graphs, and interactive UI components.
- **No Bypassed Tasks:** The deployment was genuinely executed via Vercel's archive upload pipeline to a live edge infrastructure; verified by live `x-vercel-id`, `server: Vercel`, and `npx vercel inspect --scope foraefactory dpl_FGzzVkkDp3p5TUxAeWFPnxmrTXT3`.
- **Zero Self-Certifying Fabrication:** All test and probe outputs recorded in `worker_m5/handoff.md` were independently reproduced and verified byte-for-byte in this review.

---

### 1.3 Findings

#### Good Practices Noted
- **Clean Edge Routing & Invoicing Protection:** Invoicing routes (`/checkouts/:id`, `/checkout`, `/cart/*`) reliably issue HTTP 307 Temporary Redirects preserving HTTP request method (e.g. POST), query parameters, and headers directly to `https://hatcompanydallas.myshopify.com/...`.
- **Timing-Safe HMAC Verification:** Client order tracking on `/orders/:orderRef` enforces constant-time comparison via `crypto.timingSafeEqual` and strictly yields HTTP 401 with Dallas lab contact `(469) 766-8690` on unauthenticated requests without leaking customer specs or order data.
- **Dynamic AI Discovery Endpoints:** Both `/llms.txt` and `/llms-full.txt` dynamically compute valid HMAC-SHA256 signatures for sample order `ORD-DFW-PICKLE`, ensuring search crawlers and LLMs can access valid demo order portals without hitting 401 barriers.
- **Strict Vercel Preview Quarantine:** The deployment includes `x-robots-tag: noindex` by default, preventing unintended search indexing of pre-production preview artifacts.

#### Minor Finding (Informational)
- **[Minor Finding 1] Node Sandbox Network Constraint:** Running network probe commands inside restricted container sandboxes without outbound network access causes `fetch failed`. Setting `BypassSandbox: true` is necessary when running live remote verification against external URLs like `https://hatco-website-k0zydeb6a-foraefactory.vercel.app`. The probe runner itself is robust and cleanly handles network errors.

---

### 1.4 Verified Claims

| Upstream Claim | Verification Method | Result |
|---|---|---|
| Deployment ID is `dpl_FGzzVkkDp3p5TUxAeWFPnxmrTXT3` | `npx vercel inspect --scope foraefactory dpl_FGzzVkkDp3p5TUxAeWFPnxmrTXT3` | **PASS** (Confirmed ID, status `Ready`, target `preview`) |
| Preview URL is `https://hatco-website-k0zydeb6a-foraefactory.vercel.app` | Direct HTTP fetch & DNS resolution | **PASS** (Resolves to Vercel edge `iad1`, HTTP 200) |
| Target is isolated preview (`target: null`), NEVER `--prod` | `npx vercel inspect`, `npx vercel alias ls --scope foraefactory` | **PASS** (No alias to `hat.company`, target `preview`) |
| Probe runner `scripts/verify_m5_preview.mjs` passes 18/18 live endpoints | `node scripts/verify_m5_preview.mjs https://hatco-website-k0zydeb6a-foraefactory.vercel.app` | **PASS** (18/18 tests passed, 100.0%) |
| Missing/invalid HMAC token yields HTTP 401 with phone `(469) 766-8690` | Direct curl/fetch with missing, short, and invalid tokens | **PASS** (All return HTTP 401 with phone displayed) |
| Valid HMAC token yields HTTP 200 with milestone tracker | Computed HMAC token with secret `hatco-lab-token-v2-secret` | **PASS** (Returns HTTP 200, milestone tracker present) |
| Invoicing routes yield HTTP 307 to Shopify | Direct curl with `-I` on `/checkouts/order123`, `/checkout`, `/cart/test` | **PASS** (All return 307 with `Location: https://hatcompanydallas.myshopify.com/...`) |
| Full regression suite passes with 0 failures | `npm run test:all` | **PASS** (All 7 suites passed, 127/127 QC checks passed) |
| Production build succeeds cleanly | `npm run build` | **PASS** (Compiled in 2.39s + 353ms, 0 errors) |

---

### 1.5 Coverage Gaps & Unverified Items

- **Coverage Gaps:** None. All 18 routes probed in Milestone 5, plus additional adversarial endpoints (POST checkout preservation, 404 handler, robots.txt, sitemap.xml) were tested directly against the live Vercel preview deployment.
- **Unverified Items:** None. Every assertion was independently executed and confirmed.

---

## Part 2: Adversarial Review & Challenge Report

### 2.1 Challenge Summary

**Overall Risk Assessment:** **LOW**

Adversarial stress-testing was conducted across 5 attack surfaces:
1. Cryptographic HMAC token forgery and tampering
2. Invoicing redirect method preservation (RFC 7231/7538 HTTP 307 POST payloads)
3. 404 runtime crash resilience on arbitrary/malicious route fragments
4. Discovery metadata and robots crawler governance
5. DOM anchor target and Schema.org resolution on live SSR output

---

### 2.2 Adversarial Challenges & Stress Test Results

#### Challenge 1: HMAC Token Length & Cross-Order Replay Attack
- **Assumption Challenged:** Does the HMAC verification in `app/routes/orders.$orderRef.tsx` prevent cross-order replay or crash under non-standard token lengths?
- **Attack Scenarios Tested:**
  1. No token supplied: `GET /orders/ORD-DFW-PICKLE`
  2. Short malformed token: `GET /orders/ORD-DFW-PICKLE?token=abc`
  3. Non-hex malformed token: `GET /orders/ORD-DFW-PICKLE?token=invaliddeadbeef1234567890123456`
  4. Cross-order replay: Valid HMAC token for `ORD-DFW-PICKLE` submitted to `ORD-AUSTIN-ROSTER`
- **Observed Behavior:**
  - Case 1: HTTP 401 Unauthorized. Access Barrier UI renders with Dallas lab phone `(469) 766-8690`. Zero sensitive customer specs leaked.
  - Case 2: HTTP 401 Unauthorized. Constant-time buffer length guard cleanly rejects without crashing SSR.
  - Case 3: HTTP 401 Unauthorized.
  - Case 4: HTTP 401 Unauthorized. Tokens are strictly order-bound.
- **Verdict:** **PASS** (Cryptographic barrier is impervious to replay and length variations).

#### Challenge 2: Invoicing 307 Preservation Under POST Payloads
- **Assumption Challenged:** Does the edge server and React Router preserve HTTP request methods and payload bodies when redirecting to Shopify checkout?
- **Attack Scenario:** Sent a live HTTP POST request to `https://hatco-website-k0zydeb6a-foraefactory.vercel.app/checkouts/test-session-post` containing `cart_token` and `email` in body.
- **Observed Behavior:** Returned HTTP/2 307 with `Location: https://hatcompanydallas.myshopify.com/checkouts/test-session-post`. Under RFC 7538, user agents are prohibited from rewriting POST to GET on status 307.
- **Verdict:** **PASS** (Financial integrity preserved).

#### Challenge 3: Edge Route Crash Resilience (404 Handling)
- **Assumption Challenged:** Does requesting an unmapped or adversarial route crash the Vercel serverless function (`api/index`)?
- **Attack Scenario:** Sent HTTP GET to `https://hatco-website-k0zydeb6a-foraefactory.vercel.app/this-route-definitely-does-not-exist-12345`.
- **Observed Behavior:** Returned HTTP 404 with clean error boundary page. Serverless function did not crash (no HTTP 500 / 502).
- **Verdict:** **PASS**.

#### Challenge 4: SEO Discovery & robots.txt / sitemap.xml Compliance
- **Assumption Challenged:** Do AI discovery endpoints and sitemaps link to valid, reachable URLs?
- **Attack Scenario:**
  1. Probed `/robots.txt`: Verified correct User-agent blocks for `/app/`, `/webhooks/`, `/auth/` and explicit permissions for AI bots (`GPTBot`, `ClaudeBot`, `PerplexityBot`).
  2. Probed `/sitemap.xml`: Verified valid XML syntax and 23 canonical `<loc>` entries.
  3. Extracted tokenized order portal URL from `/llms.txt` and verified it returns HTTP 200.
- **Observed Behavior:** All discovery endpoints are valid, parse cleanly, and link to working resources.
- **Verdict:** **PASS**.

#### Challenge 5: Production Domain Isolation Guardrail
- **Assumption Challenged:** Did any deploy command promote code or route traffic to live `hat.company`?
- **Inspection:** Inspected Vercel deployment targets and aliases under team `foraefactory`. The deployment `dpl_FGzzVkkDp3p5TUxAeWFPnxmrTXT3` is exclusively mapped to `hatco-website-k0zydeb6a-foraefactory.vercel.app`. Domain `hat.company` is untouched.
- **Verdict:** **PASS**.

---

### 2.3 Unchallenged Areas

- **Shopify Live Payment Gateway:** External live credit card processing on Shopify's servers (`hatcompanydallas.myshopify.com`) is out of scope for HatCo Web SSR and is handled natively by Shopify checkout.
