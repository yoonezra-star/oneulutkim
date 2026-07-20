import type { MetadataRoute } from "next";
import { categories, posts } from "./data";

export const dynamic = "force-static";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://oneulutkim.pages.dev").replace(
  /\/$/,
  "",
);
const routeUrl = (path = "") => `${siteUrl}/${path ? `${path}/` : ""}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-07-20T00:00:00+09:00");

  return [
    {
      url: routeUrl(),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...categories.map((category) => ({
      url: routeUrl(`board/${category.id}`),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: routeUrl(`posts/${post.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...[
      "archive",
      "search",
      "about",
      "editorial-policy",
      "corrections",
      "contact",
      "privacy",
      "cookie-policy",
      "advertising-policy",
      "terms",
      "disclaimer",
      "youth-protection",
      "takedown",
    ].map((path) => ({
      url: routeUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
