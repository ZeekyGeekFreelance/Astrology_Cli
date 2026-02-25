import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const sitemapUrl = siteUrl ? `${siteUrl}/sitemap.xml` : undefined;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: sitemapUrl ? [sitemapUrl] : undefined,
    host: siteUrl,
  };
}