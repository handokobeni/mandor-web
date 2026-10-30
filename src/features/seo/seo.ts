import type { Metadata, MetadataRoute } from "next";
import { allDocPages, docPage, sectionOf } from "@/features/docs";

export const SITE_NAME = "Mandor";
export const SITE_TITLE = "Mandor · Run a crew of Claude Code agents from one board";
export const SITE_DESCRIPTION =
  "Mandor puts every Claude Code agent on one kanban board, synced both ways with Lark Base. Each agent works in its own git worktree, opens a PR, and never merges to main. Early access.";

// A page's own openGraph/twitter replaces the root's, which drops the file-based
// share image (src/app/opengraph-image.tsx); docs pages name it again.
const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Mandor docs" };

function abs(site: URL, path: string): string {
  return new URL(path, site).href;
}

export function sitemapFor(site: URL): MetadataRoute.Sitemap {
  return [
    { url: abs(site, "/"), changeFrequency: "monthly", priority: 1 },
    ...allDocPages().map((p) => ({
      url: abs(site, p.href),
      changeFrequency: "monthly" as const,
      priority: p.href === "/docs" ? 0.8 : 0.6,
    })),
  ];
}

export function robotsFor(site: URL): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: abs(site, "/sitemap.xml") };
}

/** Title, description, canonical URL, and social cards of a docs page, from the docs table of contents. */
export function docMetadata(href: string): Metadata {
  const page = docPage(href);
  if (!page) throw new Error(`${href} is not in the docs table of contents (src/features/docs/model/nav.ts)`);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title: `${page.title} · Mandor docs`,
      description: page.description,
      url: page.href,
      siteName: SITE_NAME,
      type: "article",
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} · Mandor docs`,
      description: page.description,
      images: [SHARE_IMAGE.url],
    },
  };
}

type JsonLd = Record<string, unknown>;

export function productLd(site: URL): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: site.href,
    description: SITE_DESCRIPTION,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, Windows (WSL)",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      description: "Early access, invite only",
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: site.href, logo: abs(site, "/icon.svg") },
  };
}

export function faqLd(faq: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

interface Crumb {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

/** Docs › section › page; the section links to its first page. */
export function breadcrumbLd(
  site: URL,
  href: string,
): { "@context": string; "@type": string; itemListElement: Crumb[] } {
  const page = docPage(href);
  const section = sectionOf(href);
  const trail: { name: string; path: string }[] = [{ name: "Docs", path: "/docs" }];
  if (page && section && page.href !== "/docs") {
    const first = allDocPages().find((p) => sectionOf(p.href) === section);
    if (first && first.href !== page.href) trail.push({ name: section, path: first.href });
    trail.push({ name: page.title, path: page.href });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(site, t.path),
    })),
  };
}

export function articleLd(site: URL, href: string): JsonLd | null {
  const page = docPage(href);
  if (!page) return null;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.title,
    description: page.description,
    url: abs(site, page.href),
    isPartOf: { "@type": "WebSite", name: `${SITE_NAME} docs`, url: abs(site, "/docs") },
    publisher: { "@type": "Organization", name: SITE_NAME, url: site.href },
  };
}

/** JSON for a `<script type="application/ld+json">`, with `<` escaped so text cannot close the tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
