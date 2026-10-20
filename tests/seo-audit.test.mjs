import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const source = await readFile(new URL("../app/articles-data.ts", import.meta.url), "utf8");
const begin = source.indexOf("= [", source.indexOf("export const articles")) + 2;
const articles = JSON.parse(source.slice(begin, source.lastIndexOf("];") + 1));
const routes = ["/", "/articles", ...["roof-insulation", "tank-insulation", "bathroom-insulation", "kitchen-insulation"].map(s => "/services/" + s), ...articles.map(a => "/articles/" + a.slug)];
const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const text = html => html.replace(/<[^>]*>/g, "").replace(/<!--.*?-->/g, "").trim();

test("article text links are complete phrases and image files are optimized", async () => {
  for (const article of articles) {
    assert.ok(article.title.length <= 70, article.slug + ": long H1");
    assert.ok(article.seoTitle.length <= 60, article.slug + ": long title");
    assert.ok(article.seoDescription.length <= 155, article.slug + ": long description");
    for (const block of article.blocks) for (const part of block.parts || []) if (part.href) assert.ok(part.text.trim(), article.slug + ": whitespace-only link");
    const path = new URL("../public" + article.image, import.meta.url);
    assert.ok((await stat(path)).size > 0, article.image);
    if (article.image.startsWith("/images/articles/")) assert.ok((await stat(path)).size < 200000, article.image + ": excessive payload");
  }
});

test("all 18 rendered routes preserve SEO, complete links and business details", async () => {
  const titles = new Set();
  for (const route of routes) {
    const response = await worker.fetch(new Request("https://www.azelhail.com" + route, { headers: { accept: "text/html" } }), env, ctx);
    assert.equal(response.status, 200, route);
    assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
    assert.match(response.headers.get("content-security-policy") || "", /object-src 'none'/);
    const html = await response.text();
    const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    assert.ok(title && title.length <= 60 && !titles.has(title), route + ": title invalid");
    titles.add(title);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, route);
    assert.match(html, /hreflang="x-default"/i, route);
    assert.ok(html.includes("https://www.azelhail.com" + (route === "/" ? "/" : route)), route + ": canonical");
    assert.ok(html.includes("0596204627"), route + ": phone missing");
    assert.ok(html.includes("اطلب معاينة الآن"), route + ": CTA missing");
    assert.ok(!html.includes("معاينة مجانية") && !html.includes("معاينة أولية مجانية"), route + ": free claim remains");
    for (const link of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
      const href = link[1].match(/href="([^"]+)"/)?.[1];
      if (href?.startsWith("/")) assert.ok(text(link[2]) || /alt="[^"]+"/.test(link[2]), route + ": empty internal link");
    }
  }
  console.log("Validated " + routes.length + " rendered pages.");
});
