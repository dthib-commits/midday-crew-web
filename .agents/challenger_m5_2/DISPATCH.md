# Dispatch Assignment: challenger_m5_2

## Mission
Adversarially challenge the live remote Vercel preview deployment (`https://hatco-website-k0zydeb6a-foraefactory.vercel.app`).

## Authoritative Context
- Request: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md`
- Project Plan: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/orchestrator_1/PROJECT.md`
- Worker Handoff: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/worker_m5/handoff.md`
- Report: `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web/docs/quality/fortune100_qc_report.md`

## Challenge Tasks
1. Execute direct adversarial HTTP probes against `https://hatco-website-k0zydeb6a-foraefactory.vercel.app`:
   - Send requests with invalid / tampered HMAC tokens to `/orders/ORD-DFW-PICKLE?token=badtoken123` -> verify HTTP 401.
   - Send requests without token to `/orders/ORD-DFW-PICKLE` -> verify HTTP 401 and presence of Dallas lab phone `(469) 766-8690`.
   - Send request with dynamically generated valid HMAC -> verify HTTP 200 and milestone tracker HTML.
   - Send request to `/checkouts/order999` -> verify HTTP 307 redirect to `https://hatcompanydallas.myshopify.com/checkouts/order999`.
   - Send requests to programmatic corridors (`/tx/dallas`, `/tx/austin`, `/tx/fort-worth`) -> verify HTTP 200.
   - Send requests to catalog overview (`/blanks`) and individual blank (`/blanks/richardson-112`) -> verify HTTP 200.
2. Run `node scripts/verify_m5_preview.mjs https://hatco-website-k0zydeb6a-foraefactory.vercel.app`.
3. Write your findings to `analysis.md` and standard handoff to `handoff.md` with unambiguous verdict: **APPROVE** or **REQUEST_CHANGES**.
