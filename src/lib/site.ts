import { z } from "zod";

const LOCAL = "http://localhost:3000";

const siteUrlSchema = z
  .url({ protocol: /^https?$/, message: "SITE_URL must be an absolute http(s) URL, e.g. https://mandor.dev" })
  .transform((u) => new URL(new URL(u).origin + "/"));

/** The site's origin; the one place SITE_URL is read. Local default when unset. */
export function parseSiteUrl(raw: string | undefined): URL {
  const value = raw?.trim() ? raw.trim() : LOCAL;
  const parsed = siteUrlSchema.safeParse(value);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid SITE_URL");
  return parsed.data;
}

export const SITE_URL = parseSiteUrl(process.env.SITE_URL);
