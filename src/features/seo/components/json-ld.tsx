import { jsonLdScript } from "../seo";

/** Structured data for search engines, as a `<script type="application/ld+json">`. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }} />;
}
