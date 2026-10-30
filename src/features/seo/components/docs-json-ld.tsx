"use client";

import { usePathname } from "next/navigation";
import { articleLd, breadcrumbLd } from "../seo";
import { JsonLd } from "./json-ld";

/** Breadcrumb and article data for the current docs page; `site` comes from the server. */
export function DocsJsonLd({ site }: { site: string }) {
  const href = usePathname();
  const base = new URL(site);
  const article = articleLd(base, href);
  if (!article) return null;
  return (
    <>
      <JsonLd data={breadcrumbLd(base, href)} />
      <JsonLd data={article} />
    </>
  );
}
