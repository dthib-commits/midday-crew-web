# Handoff Report: Testing Infrastructure, Script Architecture & Deployment Survey

**Agent:** `explorer_survey_infra`  
**Handoff Type:** Hard (Survey Complete)  
**Parent Conversation ID:** `98f2c2df-d5b7-4184-9482-d1ebefd0829b`  
**Working Directory:** `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_infra`  
**Target Application:** `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`  

---

## 1. Observation

1. **Package Configuration & Script Inventory (`hatco-web/package.json`):**
   - Lines 21–28:
     ```json
     "test:funnel": "node scripts/simulate_funnel_qa.mjs",
     "test:seo": "node scripts/test_programmatic_seo.mjs",
     "test:portal": "node scripts/simulate_order_proofing_qa.mjs",
     "test:elite": "node scripts/test_elite_tier_engine.mjs",
     "test:roster": "node scripts/test_roster_and_vendor_packet.mjs",
     "test:crawl": "node scripts/test_site_links_and_crawls.mjs",
     "test:all": "npm run test:funnel && npm run test:seo && npm run test:portal && npm run test:elite && npm run test:roster && npm run test:crawl"
     ```
   - Lines 31: Node engine boundary is `">=20.19 <22 || >=22.12"`. Host node version is `v25.9.0`.
   - Lines 34–56: Dependencies include React Router 7 (`@react-router/dev`, `@react-router/node`, `@react-router/serve`, `react-router` `^7.12.0`), Tailwind CSS v4, Framer Motion, and Prisma. There are no Vitest, Playwright, or Jest dependencies; all tests run via pure Node.js ESM.

2. **Git Status & Branch Verification:**
   - In `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`, command `git status && git branch -a` returned:
     ```
     On branch preview/v2-enhancements
     Your branch is up to date with 'origin/preview/v2-enhancements'.
     nothing to commit, working tree clean
     ```
   - Application repository is confirmed to be on branch `preview/v2-enhancements`.

3. **Current Test Execution Baseline:**
   - Command `npm run test:all` executed in `hatco-web` ran all 6 suites and exited with code `0`.
   - `test_site_links_and_crawls.mjs` verified 103 checks (21 core routes, static assets, homepage anchors).
   - Compilation `npm run build` executed in 2.21s (client bundle) + 309ms (SSR bundle), producing `./build/server/index.js` (645.62 kB) and `./build/client/assets/` without error.

4. **Invoicing Redirect Status Discrepancy:**
   - In `app/routes/checkouts.$.tsx` line 5, `app/routes/checkout.tsx` line 5, and `app/routes/cart.$.tsx` line 5:
     ```typescript
     return redirect(`https://hatcompanydallas.myshopify.com${url.pathname}${url.search}`);
     ```
   - React Router's `redirect(url)` without a status code defaults to HTTP 302. Requirement R3/Acceptance Criteria explicitly demands HTTP 307 Temporary Redirect.

5. **Crawler Blind Spot Regarding Anchor Targets:**
   - In `scripts/test_site_links_and_crawls.mjs` lines 103–104:
     ```javascript
     const [pathname, hash] = rawLink.split("#");
     const targetPath = pathname || "/";
     ```
   - Discovered link hashes are discarded. Anchor ID matching is only performed against the homepage (lines 86–96). Dead anchor targets on subpages (e.g. `/custom#specs`) are not caught by the current test.

6. **Accessibility Deficiencies Across Interactive Modals:**
   - `app/components/layout/CartDrawer.tsx` line 40: Close button `<button onClick={closeCart}>` has no `aria-label`. Lines 93 & 103: Quantity adjustment buttons lack `aria-label`. Container (line 25/30) lacks `role="dialog"` and `aria-modal="true"`.
   - `app/components/orders/TechPackPdfModal.tsx` line 65/70: Container lacks `role="dialog"` and `aria-modal="true"`. Line 101: Close button lacks `aria-label`.
   - `app/components/orders/TexasVendorPacketModal.tsx` line 34: Container lacks `role="dialog"` and `aria-modal="true"`.
   - `app/components/forms/DigitalMockupModal.tsx` line 65: Container lacks `role="dialog"`. Line 67: Close button lacks `aria-label`. Line 101: Blank selector `<div>` elements are interactive but not semantic `<button>`s and lack keyboard event handlers.
   - `app/components/forms/ExitIntentCatalogModal.tsx` line 61: Container lacks `role="dialog"`.

7. **Vercel CLI & Deployment Configuration:**
   - `hatco-web/.vercel/project.json` links to `projectId: "prj_yglnfAsQLtlitAsEV0KstfDYYRNJ"` (`hatco-website`).
   - `hatco-web/vercel.json` defines build command `npx react-router build`, output directory `build/client`, and rewrites to `/api/index.js`.
   - `npx vercel --version` outputs `50.44.0`.
   - Executing `npx vercel --archive=tgz --yes` (without `--prod`) creates isolated preview deployments without deploying to `hat.company`.
   - Executing `npx vercel` inside the agent sandbox encountered `Error: Not able to create /Users/oceanvinny/Library/Application Support/com.vercel.cli/auth.json (operation not permitted)`. Bypassing the sandbox is necessary for Vercel deployment tool execution.

---

## 2. Logic Chain

1. **From Test Harness Observations to Script Requirements:**
   Existing tests use React Router's `createRequestHandler(serverBuild, "production")` and standard `Request`/`Response` Web API objects against `./build/server/index.js`. This pattern is fast (~2s), hermetic, and completely deterministic without requiring an active network or listening TCP port. Therefore, `scripts/test_fortune100_qc.mjs` must follow this exact architecture to achieve instant, repeatable verification.
2. **From Discovered Defects to Remediation Tasks:**
   - The requirement for `/checkouts/:id` to redirect with HTTP 307 requires modifying `app/routes/checkouts.$.tsx`, `checkout.tsx`, and `cart.$.tsx` to use `redirect(destination, 307)`.
   - WCAG 2.1 AA mandates that all interactive dialogs have `role="dialog"`, `aria-modal="true"`, and accessible names (`aria-label` or `aria-labelledby`), and all buttons must have accessible names. The modals listed in Observation 6 fail this and must be remediated in code.
   - The crawler must be upgraded to index all element IDs rendered across all visited routes and ensure every discovered `#anchor` has a matching element in the target page's DOM.
3. **From Deployment Mechanism to Safety Assurance:**
   The presence of `.vercel/project.json` and the command `npx vercel --archive=tgz --yes` without `--prod` ensures deployments target isolated preview URLs. The branch `preview/v2-enhancements` keeps all work isolated from production `main`.

---

## 3. Caveats

1. **Staging Hostname Reachability:** Network fetch to `https://hatco-website-afna1xzbr-foraefactory.vercel.app` fails locally with `ENOTFOUND` due to environment sandbox restrictions. The QC script `test_fortune100_qc.mjs` must test the local SSR server bundle by default, while supporting a target URL override if executed in an unrestricted network environment.
2. **Vercel CLI Sandbox Access:** Attempting to run `npx vercel` without `BypassSandbox: true` fails on permission to write CLI auth state. Deployment commands must be proposed with `BypassSandbox: true`.

---

## 4. Conclusion

The testing infrastructure and script architecture are fully mapped. To implement the Fortune 100 QC suite:
1. Author `scripts/test_fortune100_qc.mjs` automating:
   - Route status validation (200 for core/corridors/verticals, 307 for invoicing, 401 for tokenless portal).
   - Deep recursive link and dead anchor crawler (zero dead fragments).
   - Static media existence check (`build/client/` and `public/`).
   - WCAG 2.1 AA accessibility audit (buttons, links, inputs, dialog roles).
   - Schema.org JSON-LD validator (LocalBusiness, Manufacturer, FAQPage, BreadcrumbList, Product).
   - HMAC auth barrier verification (timing-safe, zero spec leakage).
2. Apply code-level remediations to `checkouts.$.tsx` (307 redirect) and the modal components (`CartDrawer`, `TechPackPdfModal`, `TexasVendorPacketModal`, `RevisionModal`, `DigitalMockupModal`, `ExitIntentCatalogModal`).
3. Integrate `"test:qc": "node scripts/test_fortune100_qc.mjs"` into `hatco-web/package.json` and append it to `"test:all"`.
4. Compile the full executive audit report in `docs/quality/fortune100_qc_report.md`.
5. Deploy to Vercel preview with `npx vercel --archive=tgz --yes`.

---

## 5. Verification Method

1. **Verify Baseline Tests:**
   ```bash
   cd /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
   npm run test:all
   ```
   *Expected:* Exit code 0 across all 6 test suites.
2. **Verify Build:**
   ```bash
   npm run build
   ```
   *Expected:* Clean compilation producing `build/client/` and `build/server/index.js`.
3. **Verify Git Branch:**
   ```bash
   git status
   ```
   *Expected:* `On branch preview/v2-enhancements`.
4. **Verify Analysis Artifacts:**
   Inspect `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_infra/analysis.md`.
