# Changes Implemented by worker_m3 (Milestone 3)

## Mission Overview
Milestone 3 (Schema.org Structured Data, Security HMAC Portal & Discovery):
- Harden Schema.org JSON-LD structured data (Product, BreadcrumbList, LocalBusiness)
- Resolve dead anchor targets (`#locations`)
- Dynamically generate valid HMAC-SHA256 tokens for AI discovery endpoints (`llms.txt`, `llms-full.txt`)

## File Modifications

### 1. `app/routes/blanks.$model.tsx`
- **Prototype Pollution Hardening**: Replaced `!BLANKS_CATALOG[model]` with `!Object.prototype.hasOwnProperty.call(BLANKS_CATALOG, model)` when validating route model params.
- **Product Schema**: Enhanced `Product` Schema.org JSON-LD to include `name`, `description`, canonical `image`, and `offers` with `priceCurrency: "USD"`, `price: "18.50"`, `availability: "https://schema.org/InStock"`, `seller: { "@type": "Organization", "name": "HatCo" }`, and canonical product `url`.
- **BreadcrumbList Schema**: Ensured all `ListItem` entries have valid, non-undefined resolving URLs (`${origin}/`, `${origin}/blanks`, `${origin}/blanks/${model}`) resolving check `T2_F3_01`.

### 2. `app/routes/tx.$city.tsx`
- **Breadcrumbs Dead Anchor Remediation**: Updated breadcrumbs JSON-LD schema so the second item for Texas Regional Hubs links to `${origin}/` instead of `${origin}/#locations`. This eliminates dead anchor `/locations` in breadcrumbs and satisfies `T2_F3_04`.

### 3. `app/routes/_index/route.tsx`
- **Anchor Target Resolution**: Added `<section id="locations">` for the Texas Regional Production Corridors directly onto the homepage with quick links to all 7 Texas metropolitan corridors (`Dallas`, `Fort Worth`, `Arlington`, `Plano`, `Frisco`, `Austin`, `Houston`). This satisfies in-page anchor crawler check `T2_F3_03`.

### 4. `app/routes/shop.$handle.tsx`
- **Schema.org Product & Breadcrumbs**: Added `Product` and `BreadcrumbList` JSON-LD schemas in the SSR loader with `name`, `description`, `image`, `offers` (`priceCurrency: "USD"`, `price`, `availability`, `seller`), and rendered script tags into the DOM. Added `MetaFunction` for canonical and OpenGraph tags.

### 5. `app/routes/llms[.]txt.ts`
- **Dynamic HMAC Token Generation**: Imported `node:crypto` and dynamically calculated the valid 32-character HMAC-SHA256 token for sample order `ORD-DFW-PICKLE` using secret `process.env.ORDER_PORTAL_SECRET || "hatco-lab-token-v2-secret"`.
- **Portal Link Update**: Updated order proofing link to `${origin}/orders/ORD-DFW-PICKLE?token=${sampleToken}` so that AI crawlers and automated tests resolve the portal with HTTP 200 without access barriers. Satisfies `T2_F6_05`, `T3_PAIR_04`, and `T4_SCENARIO_06`.

### 6. `app/routes/llms-full[.]txt.ts`
- **Dynamic HMAC Token Alignment**: Imported `node:crypto` and generated valid HMAC token for sample order `ORD-DFW-PICKLE`, adding the live sample order portal link in Section 8.
