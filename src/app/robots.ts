import type { MetadataRoute } from "next";
import { robotsFor } from "@/features/seo";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return robotsFor(SITE_URL);
}
