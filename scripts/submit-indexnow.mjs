const host = "www.azelhail.com";
const key = "d21b4256b3ce67f3da77319903eba42d";
const baseUrl = `https://${host}`;
const paths = [
  "/",
  "/services/roof-insulation",
  "/services/tank-insulation",
  "/services/bathroom-insulation",
  "/services/kitchen-insulation",
  "/articles",
  "/articles/water-leaks-types",
  "/articles/specialized-leak-detection-company",
  "/articles/timing-moisture-water-leak",
  "/articles/accurate-water-leak-inspection",
  "/articles/treat-water-leak-insulation",
];

const payload = {
  host,
  key,
  keyLocation: `${baseUrl}/${key}.txt`,
  urlList: paths.map((path) => `${baseUrl}${path}`),
};

try {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok && response.status !== 202) {
    throw new Error(`IndexNow returned HTTP ${response.status}: ${await response.text()}`);
  }

  console.log(`IndexNow accepted ${payload.urlList.length} URLs with HTTP ${response.status}.`);
} catch (error) {
  console.error("IndexNow submission failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
