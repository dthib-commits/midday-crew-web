# Milestone 3 Handoff Report: Schema.org Structured Data, Security HMAC Order Portal & Discovery

**Agent**: `worker_m3`  
**Milestone**: M3 (Schema.org Structured Data, Security HMAC Order Portal & Discovery)  
**Parent Orchestrator**: `98f2c2df-d5b7-4184-9482-d1ebefd0829b`  
**Application Target**: `hatco-web`  
**Date**: 2026-09-07  

---

## 1. Observation

### Initial Baseline Findings
- Initial run of `node scripts/test_fortune100_qc.mjs` reported 113/127 passed checks, with 14 failures.
- Failures in Milestone 3 scope were:
  - `T2_F3_04`: Breadcrumb schema in corridor pages (`/tx/dallas`) contained dead anchor target `https://hat.company/#locations`.
  - `T2_F6_05`: Order portal link in `/llms.txt` had hardcoded obsolete token `7c1b5fe0b080d075ad39be9bdf934f03`, failing HMAC verification and returning HTTP 401 instead of 200.
  - `T3_PAIR_04`: Cross-feature integration test `[F1 + F6]` failed because HMAC token from `llms.txt` returned HTTP 401.
  - `T4_SCENARIO_06`: Real-world Scenario 6 failed on Step 4 because portal link from `llms.txt` returned non-200 (HTTP 401).
- `app/routes/blanks.$model.tsx` lacked prototype pollution protection on `model` lookup, and `Product` Schema.org JSON-LD lacked explicit `seller` organization in `offers`.
- `app/routes/shop.$handle.tsx` lacked Schema.org JSON-LD structured data (`Product` and `BreadcrumbList`).
- Homepage lacked a dedicated DOM element with `id="locations"`.

---

## 2. Logic Chain

1. **Breadcrumb & Product Schema Hardening (`blanks.$model.tsx`)**:
   - Replaced direct indexing `!BLANKS_CATALOG[model]` with `!Object.prototype.hasOwnProperty.call(BLANKS_CATALOG, model)` to prevent prototype pollution vulnerabilities.
   - Enhanced `Product` JSON-LD schema with full `name`, `description`, canonical `image`, and `offers` (`priceCurrency: "USD"`, `price: "18.50"`, `availability: "https://schema.org/InStock"`, `seller: { "@type": "Organization", "name": "HatCo" }`, and canonical `url`).
   - Ensured breadcrumbs map to valid canonical URLs (`${origin}/`, `${origin}/blanks`, `${origin}/blanks/${model}`).

2. **Dead Anchor Elimination in Corridor Breadcrumbs (`tx.$city.tsx`)**:
   - Replaced `${origin}/#locations` in `breadcrumbSchema` with `${origin}/` (the root canonical home).
   - This directly eliminates the dead fragment `#locations` in Schema.org JSON-LD for Google Rich Results crawler compliance, resolving `T2_F3_04`.

3. **Homepage Anchor Target Resolution (`_index/route.tsx`)**:
   - Added a semantic `<section id="locations">` to the homepage featuring the Texas Regional Production Corridors with links to all 7 metropolitan corridors (`Dallas`, `Fort Worth`, `Arlington`, `Plano`, `Frisco`, `Austin`, `Houston`).
   - Guarantees any in-page fragment `#locations` resolves to an existing DOM element ID, satisfying `T2_F3_03`.

4. **Schema.org Structured Data on Retail Drops (`shop.$handle.tsx`)**:
   - Added `Product` and `BreadcrumbList` Schema.org JSON-LD scripts in `shop.$handle.tsx` loader and template, incorporating product title, description, featured image, offers (`USD`, price, `InStock`, seller `HatCo`), and sequential 3-tier breadcrumbs.
   - Added `MetaFunction` export for canonical and OpenGraph metadata.

5. **Dynamic HMAC Token Generation (`llms[.]txt.ts` and `llms-full[.]txt.ts`)**:
   - Imported `node:crypto` and dynamically computed the valid HMAC-SHA256 token:
     ```ts
     const sampleToken = crypto
       .createHmac("sha256", process.env.ORDER_PORTAL_SECRET || "hatco-lab-token-v2-secret")
       .update("ORD-DFW-PICKLE")
       .digest("hex")
       .slice(0, 32);
     ```
   - Replaced the obsolete token with `${sampleToken}` in the advertised order portal URL `/orders/ORD-DFW-PICKLE?token=${sampleToken}`.
   - This directly resolves `T2_F6_05`, unlocks the live order proofing portal with HTTP 200, and enables `T3_PAIR_04` and `T4_SCENARIO_06` to pass.

---

## 3. Caveats

- Milestone 4 (`F10_EXECUTIVE_AUDIT_REPORT`) requires writing `docs/quality/fortune100_qc_report.md`. The 10 remaining failing checks in `test_fortune100_qc.mjs` belong exclusively to M4 (F10). All other features (F1, F2, F3, F4, F5, F6, F7, F8, F9, F11) are at 100% pass rates.
- No files outside the worker's designated exclusive write set were modified.

---

## 4. Conclusion

All requirements for Milestone 3 have been completed with 100% pass rates:
- **`F3_SCHEMA_JSONLD_COMPLIANCE`**: 10/10 Passed (100%)
- **`F6_SECURITY_HMAC_PORTAL`**: 10/10 Passed (100%)
- **`T3_PAIR_04`**: Passed
- **`T4_SCENARIO_06`**: Passed
- **Tier 3 (Cross-Feature Pairwise)**: 11/11 Passed (100.0%)
- **Tier 4 (Real-World Enterprise Scenarios)**: 6/6 Passed (100.0%)
- **`npm run test:all`**: 104/104 crawl checks verified with 0 broken links.

---

## 5. Verification Method

To independently verify this milestone from `/Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web`:

1. **Compile Application**:
   ```bash
   npm run build
   ```
   *Expected output: Exit code 0, client and server bundles generated.*

2. **Execute Unified Fortune 100 QC Runner**:
   ```bash
   node scripts/test_fortune100_qc.mjs
   ```
   *Expected result: 117/127 passed. `F3_SCHEMA_JSONLD_COMPLIANCE`: 10/10 (100%), `F6_SECURITY_HMAC_PORTAL`: 10/10 (100%), Tier 3: 11/11 (100%), Tier 4: 6/6 (100%).*

3. **Execute Full Test Suite**:
   ```bash
   npm run test:all
   ```
   *Expected result: 104/104 checks verified, 0 broken links.*
