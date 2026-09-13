# DISPATCH — worker_m3 (2026-09-07T22:46:00Z)

## Assigned Role & Mission
- Role: M3 Schema.org, Security & Discovery Worker (teamwork_preview_worker)
- Working Directory: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/worker_m3`
- Application Directory: `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`
- Parent: Orchestrator (`98f2c2df-d5b7-4184-9482-d1ebefd0829b`)
- Authoritative User Request: `/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md`

## Mission — Milestone 3 (Schema.org Structured Data, Security HMAC & Discovery)
1. Schema.org JSON-LD Compliance (F3):
   - `app/routes/blanks.$model.tsx`:
     - Fix breadcrumb schema: ensure each `ListItem` in `BreadcrumbList` has a valid, non-undefined resolving `item` URL (e.g. `https://hat.company/` and `https://hat.company/blanks/${blank.model}`).
     - Enhance `Product` schema: ensure it contains `name`, `description`, `image`, and `offers` (`@type: "Offer"`, `priceCurrency: "USD"`, `price: blank.unitPrice || "18.50"`, `availability: "https://schema.org/InStock"`, `seller: { "@type": "Organization", "name": "HatCo" }`).
     - Prototype pollution hardening: replace direct `key in blankData` or `blankData[model]` with `Object.prototype.hasOwnProperty.call(blankCatalog, model)`.
   - `app/routes/tx.$city.tsx`:
     - Fix breadcrumb schema dead anchor: in the breadcrumbs schema, change the item for Texas Corridors from `https://hat.company/#locations` to `https://hat.company/` or `https://hat.company/tx` so it does not contain `#locations` (satisfies `T2_F3_04`).
   - `app/routes/_index/route.tsx`:
     - In the Texas Regional Production Corridors section (`<section>`), add `id="locations"` so any existing in-page anchor links to `#locations` resolve to a valid DOM element ID (satisfies `T2_F3_03`).
   - `app/routes/shop.$handle.tsx`:
     - Ensure Schema.org JSON-LD contains valid `Product` and `BreadcrumbList` schemas with name, image, and offers.
2. Security HMAC & AI Discovery (F6):
   - `app/routes/llms[.]txt.ts` and `app/routes/llms-full[.]txt.ts`:
     - Dynamically compute the valid HMAC token for `ORD-DFW-PICKLE` using secret `hatco-lab-token-v2-secret` (or use the canonical hash: `crypto.createHmac("sha256", "hatco-lab-token-v2-secret").update("ORD-DFW-PICKLE").digest("hex").slice(0, 32)`).
     - In the generated text output, update the link to `/orders/ORD-DFW-PICKLE?token=<valid_token>` so that `T2_F6_05` passes with HTTP 200.
3. Verification:
   - `npm run build`
   - `node scripts/test_fortune100_qc.mjs` — verify F3 and F6 pass 10/10 (100%), and T3_PAIR_04 & T4_SCENARIO_06 pass!
   - `npm run test:all` — verify 104/104 crawl checks pass with 0 broken links!
