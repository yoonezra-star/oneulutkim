import type { MetadataRoute } from "next";
import { categories, posts } from "./data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oneulutkim.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-07-20T00:00:00+09:00");

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...categories.map((category) => ({
      url: `${siteUrl}/board/${category.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...["about", "contact", "privacy", "terms", "takedown"].map((path) => ({
      url: `${siteUrl}/${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
