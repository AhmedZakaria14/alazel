import type { MetadataRoute } from "next";
import { siteConfig } from "./data";

export default function robots(): MetadataRoute.Robots {
  const allowAll = { allow: "/" };

  return {
    rules: [
      { userAgent: "*", ...allowAll },
      { userAgent: "Googlebot", ...allowAll },
      { userAgent: "Bingbot", ...allowAll },
      { userAgent: "OAI-SearchBot", ...allowAll },
      { userAgent: "ChatGPT-User", ...allowAll },
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Perplexity-User", ...allowAll },
      { userAgent: "Claude-SearchBot", ...allowAll },
      { userAgent: "Claude-User", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      { userAgent: "Google-Extended", ...allowAll },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: new URL(siteConfig.url).host,
  };
}
