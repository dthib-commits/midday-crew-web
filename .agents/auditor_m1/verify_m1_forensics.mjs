import { pathToFileURL } from "node:url";
import path from "node:path";
import { strict as assert } from "node:assert";
import fs from "node:fs";

console.log("======================================================================");
console.log("🕵️ AUDITOR_M1 INDEPENDENT FORENSIC VERIFICATION SUITE");
console.log("======================================================================\n");

const rrPath = pathToFileURL(path.resolve("./node_modules/react-router/dist/production/index.js")).href;
const { createRequestHandler } = await import(rrPath);

const serverBundlePath = pathToFileURL(path.resolve("./build/server/index.js")).href;
const serverBuild = await import(serverBundlePath);
const handleRequest = createRequestHandler(serverBuild, "production");

let checksPassed = 0;
let checksFailed = 0;

function reportCheck(name, passed, detail = "") {
  if (passed) {
    checksPassed++;
    console.log(`  ✔ [PASS] ${name} ${detail ? "(" + detail + ")" : ""}`);
  } else {
    checksFailed++;
    console.error(`  ✖ [FAIL] ${name} - ${detail}`);
  }
}

// -----------------------------------------------------------------------------
// [CHECK 1] Invoicing Redirects (Status 307 + Location + Query preservation)
// -----------------------------------------------------------------------------
console.log("--- 1. Invoicing 307 Redirect Integrity ---");

const redirectTestCases = [
  { path: "/checkouts/c1-98765", method: "GET" },
  { path: "/checkouts/c1-98765?step=payment&discount=DALLAS10", method: "GET" },
  { path: "/checkouts/c1-98765", method: "POST" },
  { path: "/checkout", method: "GET" },
  { path: "/checkout?ref=cart_drawer", method: "GET" },
  { path: "/checkout", method: "POST" },
  { path: "/cart/456789:2", method: "GET" },
  { path: "/cart/456789:2?attributes[notes]=RushOrder", method: "GET" },
  { path: "/cart/456789:2", method: "POST" },
];

for (const tc of redirectTestCases) {
  const req = new Request(`https://hat.company${tc.path}`, {
    method: tc.method,
    headers: {
      "User-Agent": "HatCo-Auditor/1.0",
      ...(tc.method === "POST" ? { "Content-Type": "application/x-www-form-urlencoded" } : {})
    },
    ...(tc.method === "POST" ? { body: "test=1" } : {})
  });
  
  const res = await handleRequest(req);
  const location = res.headers.get("location");
  
  const is307 = res.status === 307;
  const expectedLocation = `https://hatcompanydallas.myshopify.com${tc.path}`;
  const locationMatches = decodeURI(location) === decodeURI(expectedLocation);
  
  reportCheck(
    `Invoicing Redirect ${tc.method} ${tc.path}`,
    is307 && locationMatches,
    `Status: ${res.status}, Location: ${location}`
  );
}

// -----------------------------------------------------------------------------
// [CHECK 2] Blanks Route Integrity & Schema Validation
// -----------------------------------------------------------------------------
console.log("\n--- 2. Blanks Catalog & Product Route Integrity ---");

const blankModels = [
  "richardson-112",
  "richardson-115",
  "sport-tek-stc26",
  "sport-tek-stc27",
  "comfort-colors-1717",
  "comfort-colors-1566"
];

for (const model of blankModels) {
  const req = new Request(`https://hat.company/blanks/${model}`);
  const res = await handleRequest(req);
  const html = await res.text();
  
  const is200 = res.status === 200;
  const hasProductSchema = html.includes('"@type":"Product"') || html.includes('"@type": "Product"');
  const hasBreadcrumb = html.includes('"@type":"BreadcrumbList"') || html.includes('"@type": "BreadcrumbList"');
  const hasMoqTable = html.includes("12 - 24 (MOQ)");
  
  reportCheck(
    `/blanks/${model} SSR status 200`,
    is200,
    `Status: ${res.status}`
  );
  reportCheck(
    `/blanks/${model} Product & Breadcrumb schemas present`,
    hasProductSchema && hasBreadcrumb,
    `Product: ${hasProductSchema}, Breadcrumbs: ${hasBreadcrumb}`
  );
  reportCheck(
    `/blanks/${model} Volume tier table displays MOQ 12`,
    hasMoqTable,
    `Contains '12 - 24 (MOQ)': ${hasMoqTable}`
  );
}

// Test /blanks overview route
{
  const req = new Request("https://hat.company/blanks");
  const res = await handleRequest(req);
  const html = await res.text();
  
  const is200 = res.status === 200;
  const hasCollectionSchema = html.includes("CollectionPage");
  const hasItemList = html.includes("ItemList");
  const hasBreadcrumb = html.includes("BreadcrumbList");
  const mentionsMoq = html.includes("12-Unit MOQ (1 Dozen)") || html.includes("12 Units (1 Dozen)");
  
  reportCheck("/blanks overview SSR status 200", is200, `Status: ${res.status}`);
  reportCheck("/blanks CollectionPage & ItemList schemas", hasCollectionSchema && hasItemList && hasBreadcrumb, "Schemas verified");
  reportCheck("/blanks MOQ 12 messaging present", mentionsMoq, "MOQ 12 verified in catalog hero");
}

// Test /blanks 404 behavior for unknown model
{
  const req = new Request("https://hat.company/blanks/unknown-fake-cap-model-999");
  let status = 0;
  try {
    const res = await handleRequest(req);
    status = res.status;
  } catch (err) {
    status = err.status || 500;
  }
  reportCheck(
    "/blanks/unknown-model yields 404 Not Found (not 500 crash)",
    status === 404,
    `Status: ${status}`
  );
}

// -----------------------------------------------------------------------------
// [CHECK 3] Landing Page 3D Puff MOQ Verification
// -----------------------------------------------------------------------------
console.log("\n--- 3. LP 3D Puff MOQ Verification ---");
{
  const req = new Request("https://hat.company/lp/3d-puff");
  const res = await handleRequest(req);
  const html = await res.text();
  
  const is200 = res.status === 200;
  const has12UnitMin = html.includes("12-Unit Minimums (1 Dozen)");
  const hasNo18UnitMin = !html.includes("18-Unit Minimums");
  const hasMin12Input = html.includes('min="12"') || html.includes('placeholder="Quantity (Min 12)"');
  const hasNoMin18Input = !html.includes('min="18"') && !html.includes('placeholder="Quantity (Min 18)"');
  
  reportCheck("/lp/3d-puff SSR status 200", is200, `Status: ${res.status}`);
  reportCheck("/lp/3d-puff copy updated to 12 units", has12UnitMin && hasNo18UnitMin, `12-Unit copy: ${has12UnitMin}, No 18-Unit: ${hasNo18UnitMin}`);
  reportCheck("/lp/3d-puff input min & placeholder updated to 12", hasMin12Input && hasNoMin18Input, `min 12: ${hasMin12Input}, No min 18: ${hasNoMin18Input}`);
}

// -----------------------------------------------------------------------------
// [CHECK 4] FloatingSpecHud Spec Verification
// -----------------------------------------------------------------------------
console.log("\n--- 4. FloatingSpecHud Spec Verification ---");
{
  const hudSource = fs.readFileSync("./app/components/cad/FloatingSpecHud.tsx", "utf8");
  const has12Units = hudSource.includes("12 UNITS (1 DOZEN)");
  const hasNoOutdatedMoq = !hudSource.includes("24 UNITS") && !hudSource.includes("48 UNITS") && !hudSource.includes("18 UNITS");
  
  reportCheck("FloatingSpecHud specifies 12 UNITS (1 DOZEN)", has12Units && hasNoOutdatedMoq, `has 12 units: ${has12Units}`);
}

// -----------------------------------------------------------------------------
// [CHECK 5] RegionalInquiryForm Defensive Prop Handling
// -----------------------------------------------------------------------------
console.log("\n--- 5. RegionalInquiryForm Component Verification ---");
{
  const formSource = fs.readFileSync("./app/components/forms/RegionalInquiryForm.tsx", "utf8");
  const hasSafeUtmAttribution = formSource.includes("utmAttribution = {}") && formSource.includes("Object.entries(utmAttribution || {})");
  const hasSafeBlankOptions = formSource.includes("blankOptions = []") && formSource.includes("blankOptions && blankOptions.length > 0");
  const hasSafeDefaults = formSource.includes('region = "Texas"') && formSource.includes('city = "Dallas"');
  
  reportCheck("RegionalInquiryForm has safe utmAttribution default & guarded entries", hasSafeUtmAttribution, `Safe utmAttribution: ${hasSafeUtmAttribution}`);
  reportCheck("RegionalInquiryForm has safe blankOptions default & fallback input", hasSafeBlankOptions, `Safe blankOptions: ${hasSafeBlankOptions}`);
  reportCheck("RegionalInquiryForm has safe regional defaults", hasSafeDefaults, `Safe defaults: ${hasSafeDefaults}`);
}

// -----------------------------------------------------------------------------
// [CHECK 6] Security & Secret Exposure Audit
// -----------------------------------------------------------------------------
console.log("\n--- 6. Security & Secret Exposure Audit ---");
{
  const m1Files = [
    "./app/routes/blanks.$model.tsx",
    "./app/routes/blanks._index.tsx",
    "./app/components/forms/RegionalInquiryForm.tsx",
    "./app/routes/checkouts.$.tsx",
    "./app/routes/checkout.tsx",
    "./app/routes/cart.$.tsx",
    "./app/routes/lp.3d-puff.tsx",
    "./app/components/cad/FloatingSpecHud.tsx"
  ];
  
  const secretPatterns = [
    /AIza[0-9A-Za-z-_]{35}/, // Google API key
    /sk_live_[0-9a-zA-Z]{24}/, // Stripe live key
    /ghp_[0-9a-zA-Z]{36}/, // GitHub token
    /shpat_[0-9a-fA-F]{32}/, // Shopify access token
    /-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----/,
    /hatco-lab-token-v2-secret/ // Ensure HMAC secret is NOT in these public routes/components
  ];
  
  let secretsFound = 0;
  for (const file of m1Files) {
    const content = fs.readFileSync(file, "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(content)) {
        console.error(`  ✖ Found potential secret in ${file} matching ${pattern}`);
        secretsFound++;
      }
    }
  }
  
  reportCheck("Zero credentials, private keys, or HMAC secrets in M1 files", secretsFound === 0, `Secrets found: ${secretsFound}`);
}

console.log("\n======================================================================");
console.log(`TOTAL CHECKS: ${checksPassed + checksFailed} | PASSED: ${checksPassed} | FAILED: ${checksFailed}`);
console.log("======================================================================");

if (checksFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
