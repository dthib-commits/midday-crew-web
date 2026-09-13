# Dispatch Assignment: worker_m5

## Mission
Execute Milestone 5: Complete E2E verification, full pipeline validation, isolated Vercel preview deployment on branch `preview/v2-enhancements`, and live preview crawl verification.

## Authoritative User Request
Read: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md`

## Project Architecture & Standards
Read:
- `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/orchestrator_1/PROJECT.md`
- `/Users/oceanvinny/Documents/antigravity/modest-volta/TEST_READY.md`
- `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web/docs/quality/fortune100_qc_report.md`

## Write Boundaries
Exclusive write files:
- `docs/quality/fortune100_qc_report.md` (only if updating the live preview deployment URL or timestamp)
- Any temporary verification scripts under `scripts/verify_m5_preview.mjs`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Tasks
1. Pre-Deployment Verification in `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`:
   - Run `npm run build` — confirm clean production compilation (client + server bundles).
   - Run `npm run test:qc` — confirm 127/127 checks passed (100.0%).
   - Run `npm run test:all` — confirm all 7 test suites pass with zero regressions.
2. Isolated Vercel Preview Deployment:
   - Verify git branch is `preview/v2-enhancements` (DO NOT switch branches, DO NOT touch `main`).
   - Execute `npx vercel --archive=tgz --yes` (use `BypassSandbox: true` in run_command if sandbox restricts network or CLI access).
   - Capture stdout/stderr and extract the generated preview URL (e.g. `https://hatco-website-...-foraefactory.vercel.app`).
   - Ensure NEVER to pass `--prod` or promote to `hat.company`.
3. Live Remote Preview Verification:
   - Test the live preview deployment URL using a custom test script or HTTP probes:
     - Root: `GET /` -> HTTP 200
     - Catalog: `GET /blanks` -> HTTP 200
     - Customizer: `GET /custom` -> HTTP 200
     - Shop: `GET /shop` -> HTTP 200
     - Programmatic Corridor: `GET /tx/dallas` -> HTTP 200
     - Invoicing redirect: `GET /checkouts/12345` -> HTTP 307 to Shopify
     - HMAC order portal barrier: `GET /orders/ORD-DFW-PICKLE` -> HTTP 401 with Dallas lab contact
     - Valid HMAC portal: `GET /orders/ORD-DFW-PICKLE?token=<hmac>` -> HTTP 200
4. Update `docs/quality/fortune100_qc_report.md` with the verified Vercel preview deployment URL if required.
5. Produce complete documentation in:
   - `changes.md`
   - `handoff.md` with unambiguous status: **DONE**.

## 2026-09-07T23:01:05Z
You are worker_m5.
Your working directory is: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/worker_m5
The authoritative user request is in: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md
The application workspace is: /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
Your parent orchestrator conversation ID is: 98f2c2df-d5b7-4184-9482-d1ebefd0829b

Mission - Milestone 5 (Final Milestone: 100% E2E Test Pass & Vercel Preview Deploy):
1. Pre-Deployment Verification in hatco-web:
   - Run `npm run build` — confirm clean compilation.
   - Run `npm run test:qc` — confirm 127/127 checks pass at 100.0%.
   - Run `npm run test:all` — confirm all 7 test suites pass with 0 errors.
   - Run `npm run test:crawl` — confirm 104/104 checks pass with 0 broken links.
2. Isolated Vercel Preview Deployment:
   - Confirm branch is `preview/v2-enhancements` via `git status` / `git rev-parse --abbrev-ref HEAD`.
   - Deploy using: `npx vercel --archive=tgz --yes` (set `BypassSandbox: true` if needed for network/CLI execution).
   - Capture the output and record the isolated preview URL (e.g. `https://hatco-website-...-foraefactory.vercel.app`).
   - CRITICAL: DO NOT use `--prod` or deploy to `hat.company`.
3. Live Remote Preview Verification:
   - Probe the deployed preview URL across key routes:
     - `GET /` -> HTTP 200
     - `GET /blanks` -> HTTP 200
     - `GET /custom` -> HTTP 200
     - `GET /shop` -> HTTP 200
     - `GET /tx/dallas` -> HTTP 200
     - `GET /checkouts/order123` -> HTTP 307
     - `GET /orders/ORD-DFW-PICKLE` -> HTTP 401
     - `GET /orders/ORD-DFW-PICKLE?token=<valid-token>` -> HTTP 200
4. Update `docs/quality/fortune100_qc_report.md` with the live preview deployment URL and verification results if appropriate.
5. Document all commands, outputs, and findings in:
   `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/worker_m5/changes.md`
   and write a standard handoff report to:
   `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/worker_m5/handoff.md`
   with unambiguous verdict: **DONE**.
