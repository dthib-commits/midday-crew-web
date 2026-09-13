## 2026-09-07T21:46:20Z

You are explorer_survey_routes.
Your working directory is: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_routes
The authoritative user request is in: /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md
The application workspace is: /Users/oceanvinny/Documents/antigravity/modest-volta/hatco-web
Your parent orchestrator conversation ID is: 98f2c2df-d5b7-4184-9482-d1ebefd0829b

You MUST read /Users/oceanvinny/Documents/antigravity/modest-volta/.agents/ORIGINAL_REQUEST.md first.
Your mission is to perform a comprehensive survey of all routes, crawl surfaces, links, media, and SSR endpoints for HatCo Web:
1. Inspect the React Router route definitions in hatco-web (e.g. app/routes.ts, app/routes/*, or similar). Enumerate every route:
   - Core routes: /, /custom, /sample-kit, /inspiration, /shop, /shop/:handle, /blanks/:model, /lp/3d-puff
   - Programmatic corridors: /tx/dallas, /tx/fort-worth, /tx/arlington, /tx/plano, /tx/frisco, /tx/austin, /tx/houston
   - Industry verticals: /industry/school-districts, /industry/pickleball, /industry/disc-golf, /industry/team-sports
   - Order proofing portals: /orders/:orderRef
   - Endpoints: /sitemap.xml, /robots.txt, /llms.txt, /llms-full.txt
   - Invoicing redirects: /checkouts/:id
   - Any other reachable routes
2. Check static assets, images, logos, fonts, video posters referenced in routes and templates. Check if any referenced static files in public/ are missing or broken.
3. Check internal navigation links, anchor tags, and hash fragments (e.g. #faq, #pricing, etc.) to ensure target IDs exist.
4. Test or analyze responses from live staging (https://hatco-website-afna1xzbr-foraefactory.vercel.app) and local SSR server behavior.
5. Identify any existing defects, 404s, missing media, broken anchors, or SSR errors.

Write your findings to:
/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_routes/analysis.md
and write a standard handoff report to:
/Users/oceanvinny/Documents/antigravity/modest-volta/.agents/explorer_survey_routes/handoff.md
Update your progress.md regularly. When finished, send a brief completion message to your parent (98f2c2df-d5b7-4184-9482-d1ebefd0829b).
