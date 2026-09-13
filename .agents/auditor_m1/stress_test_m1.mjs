import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

console.log("======================================================================");
console.log("🔥 AUDITOR_M1 ADVERSARIAL STRESS TESTING SUITE");
console.log("======================================================================\n");

const rrPath = pathToFileURL(path.resolve("./node_modules/react-router/dist/production/index.js")).href;
const { createRequestHandler } = await import(rrPath);

const serverBundlePath = pathToFileURL(path.resolve("./build/server/index.js")).href;
const serverBuild = await import(serverBundlePath);
const handleRequest = createRequestHandler(serverBuild, "production");

let passed = 0;
let failed = 0;

function assertTest(name, cond, msg) {
  if (cond) {
    passed++;
    console.log(`  ✔ [STRESS PASS] ${name}`);
  } else {
    failed++;
    console.error(`  ✖ [STRESS FAIL] ${name}: ${msg}`);
  }
}

// Adversarial Test 1: POST Inquiry to /blanks/richardson-112 with full payload
{
  const formData = new FormData();
  formData.append("name", "John Doe");
  formData.append("email", "john@example.com");
  formData.append("phone", "214-555-1234");
  formData.append("company", "Texas Athletics");
  formData.append("estimatedQuantity", "48");
  formData.append("recommended_blank", "Richardson 112");
  formData.append("projectDetails", "3D puff embroidery front crown");
  formData.append("region", "Texas");
  formData.append("city", "Dallas");
  formData.append("landing_page", "/blanks/richardson-112");
  formData.append("utm_source", "blanks_catalog");
  formData.append("utm_medium", "organic_seo");
  formData.append("utm_campaign", "richardson-112");

  const req = new Request("https://hat.company/blanks/richardson-112", {
    method: "POST",
    body: formData
  });

  const res = await handleRequest(req);
  assertTest(
    "POST /blanks/richardson-112 processes form action (HTTP 200 or redirect)",
    res.status === 200 || res.status === 302,
    `Returned ${res.status}`
  );
  
  if (res.status === 200) {
    const text = await res.text();
    // Should contain reference ID or inquiry confirmation
    const hasSuccessOrForm = text.includes("ORD-BLK-") || text.includes("Request Received") || text.includes("Customize the Richardson 112");
    assertTest(
      "POST response contains valid rendered markup",
      hasSuccessOrForm,
      "Expected inquiry reference or form markup"
    );
  }
}

// Adversarial Test 2: Deep nested checkout paths with URL encoding & multiple query parameters
{
  const deepCheckoutPath = "/checkouts/co_abc123/shipping_address?discount=WELCOME&source=email_campaign&channel=direct#step2";
  const req = new Request(`https://hat.company${deepCheckoutPath}`, { method: "GET" });
  const res = await handleRequest(req);
  const location = res.headers.get("location");
  
  assertTest(
    "Deep checkout path returns HTTP 307",
    res.status === 307,
    `Status was ${res.status}`
  );
  assertTest(
    "Deep checkout path correctly preserved in Location header",
    location && location.startsWith("https://hatcompanydallas.myshopify.com/checkouts/co_abc123/shipping_address"),
    `Location was ${location}`
  );
}

// Adversarial Test 3: Multiple rapid requests to /blanks overview to verify SSR concurrency
{
  const promises = Array.from({ length: 10 }).map((_, i) =>
    handleRequest(new Request(`https://hat.company/blanks?req=${i}`))
  );
  const results = await Promise.all(promises);
  const all200 = results.every(r => r.status === 200);
  assertTest(
    "10 concurrent requests to /blanks all return HTTP 200",
    all200,
    `Statuses: ${results.map(r => r.status).join(",")}`
  );
}

console.log(`\nAdversarial Stress Test Summary: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
