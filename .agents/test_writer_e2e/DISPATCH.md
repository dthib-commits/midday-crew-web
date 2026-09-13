## 2026-09-07T21:53:39Z

You are test_writer_e2e.
Your working directory is: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/test_writer_e2e
The authoritative user request is in: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md
The application workspace is: /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
Your parent orchestrator conversation ID is: 98f2c2df-d5b7-4184-9482-d1ebefd0829b

You MUST read /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md first.
Also read:
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/orchestrator_1/PROJECT.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/orchestrator_1/TEST_INFRA.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_infra/handoff.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_routes/handoff.md
- /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_compliance/handoff.md

Your exclusive write files:
- scripts/test_fortune100_qc.mjs
- /Users/oceanvinny/Documents/antigravity/modest-volta/TEST_READY.md

DO NOT touch or edit source code in app/.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All test implementations must be genuine and execute real assertions against the application build and DOM. DO NOT hardcode mock passes or fabricate test results. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Mission - E2E Testing Track (Unified QC Test Runner):
1. Create \`scripts/test_fortune100_qc.mjs\` that can be executed via \`node scripts/test_fortune100_qc.mjs\`.
2. Architecture:
   - Use \`createRequestHandler(serverBuild, "production")\` against \`./build/server/index.js\` to execute real SSR requests and test full HTML/headers/status codes hermetically and deterministically.
3. Multi-tier comprehensive test coverage (targeting >= 127 automated checks):
   - Tier 1: Feature Coverage (>=5 checks per feature for all 11 features from TEST_INFRA.md):
     * Core routes HTTP 200 (/, /custom, /sample-kit, /inspiration, /shop, /lp/3d-puff)
     * Programmatic corridors HTTP 200 (/tx/dallas, /tx/fort-worth, /tx/arlington, /tx/plano, /tx/frisco, /tx/austin, /tx/houston)
     * Industry verticals HTTP 200 (/industry/school-districts, /industry/pickleball, /industry/disc-golf, /industry/team-sports)
     * Blank model routes HTTP 200 (/blanks/richardson-112, /blanks/sport-tek-stc26, etc.) and /blanks
     * Discovery endpoints HTTP 200 (/sitemap.xml, /robots.txt, /llms.txt, /llms-full.txt)
     * Invoicing redirects: /checkouts/:id, /checkout, /cart/:id return HTTP 307 with Shopify location
     * Tokenless /orders/:orderRef returns HTTP 401 with Access Barrier UI and Dallas lab phone (469) 766-8690
     * Valid HMAC token unlocks /orders/:orderRef with HTTP 200 and milestone tracker
     * Schema.org JSON-LD presence and syntax across routes
     * WCAG 2.1 AA modal dialog attributes (role="dialog", aria-modal="true", accessible close buttons)
     * MOQ checks (12 units enforced)
   - Tier 2: Boundary & Corner Cases (>=5 checks per feature):
     * 404 boundaries (/tx/unknown-city, /industry/invalid, /shop/nonexistent-handle, invalid blanks)
     * Order portal with tampered HMAC token returns 401, non-existent order with valid token returns 404
     * Empty and invalid form parameters, malformed checkout paths
     * Static media asset physical existence on disk for every referenced img/video/svg
     * Dead anchor target crawler: recursive scan ensuring every discovered href="#..." has a matching element id in DOM
     * BreadcrumbList validation: every ListItem has valid resolving item URL (no undefined item, no 404 targets)
   - Tier 3: Cross-Feature Combinations (11 pairwise tests)
   - Tier 4: Real-World Workload Scenarios (6 realistic end-to-end user workflows)
4. Execute \`node scripts/test_fortune100_qc.mjs\` against the current build (rebuilding first if needed) to verify runner functionality and identify passing/failing checks.
5. Create \`TEST_READY.md\` at project root (\`/Users/oceanvinny/Documents/antigravity/modest-volta/TEST_READY.md\`) containing:
   - Test runner command (\`npm run test:qc\` / \`node scripts/test_fortune100_qc.mjs\`)
   - Coverage summary breakdown (Tier 1, Tier 2, Tier 3, Tier 4, Total count)
   - Feature checklist
6. Write a standard handoff report to:
   /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/test_writer_e2e/handoff.md
Update your progress.md regularly. When finished, send a brief completion message to your parent (98f2c2df-d5b7-4184-9482-d1ebefd0829b).
