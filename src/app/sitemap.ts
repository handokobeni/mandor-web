import type { MetadataRoute } from "next";
import { sitemapFor } from "@/features/seo";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapFor(SITE_URL);
}
