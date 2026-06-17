import type { MetadataRoute } from "next";
import { posts } from "./blog/posts-registry";

// Single source of truth for the sitemap. Blog entries are generated from
// posts-registry.ts so new posts appear automatically with an accurate
// <lastmod> (their publish date). This replaces the old hand-maintained
// public/sitemap.xml, which went stale and caused new posts to go
// undiscovered in Google Search Console.

const BASE_URL = "https://editpdfs.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // The blog index changes whenever the newest post is published.
  const newestPostDate = posts.reduce(
    (latest, post) => (post.date > latest ? post.date : latest),
    posts[0]?.date ?? "2026-01-01",
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/editor`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(newestPostDate), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
