import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { POST_SLUGS_QUERY } from "@/lib/sanity/queries";
import { getSiteUrl } from "@/lib/site-url";

type BlogSlugRecord = {
  slug?: string;
  _updatedAt?: string;
};

const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/recommendations", changeFrequency: "weekly", priority: 0.85 },
  { path: "/blog", changeFrequency: "daily", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];

const buildUrl = (siteUrl: string, path: string) => `${siteUrl}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl() ?? "http://localhost:3000";

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((entry) => ({
    url: buildUrl(siteUrl, entry.path),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  try {
    const posts = await client.fetch<BlogSlugRecord[]>(POST_SLUGS_QUERY);

    const blogEntries: MetadataRoute.Sitemap = (posts ?? [])
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        url: buildUrl(siteUrl, `/blog/${post.slug}`),
        lastModified: post._updatedAt
          ? new Date(post._updatedAt)
          : undefined,
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [...staticEntries, ...blogEntries];
  } catch (error) {
    console.error("sitemap generation fallback to static pages:", error);
    return staticEntries;
  }
}
