import type { MetadataRoute } from "next";
import { services, siteConfig } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-07-12T00:00:00+03:00");
  const absolute = (path: string) => `${siteConfig.url}${path}`;

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absolute(siteConfig.heroImage),
        absolute(siteConfig.logo),
        ...[1, 2, 3, 4, 5, 6].map((number) => absolute(`/images/work-${number}.webp`)),
      ],
      alternates: { languages: { "ar-SA": `${siteConfig.url}/` } },
    },
    ...services.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [absolute(service.image)],
      alternates: {
        languages: { "ar-SA": `${siteConfig.url}/services/${service.slug}` },
      },
    })),
  ];
}
