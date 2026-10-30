import { describe, expect, it } from "vitest";
import { allDocPages } from "@/features/docs";
import { breadcrumbLd, docMetadata, faqLd, jsonLdScript, productLd, robotsFor, sitemapFor } from "./seo";

const site = new URL("https://mandor.dev");

describe("sitemap and robots", () => {
  it("lists the home page and every docs page with absolute URLs", () => {
    const urls = sitemapFor(site).map((e) => e.url);
    expect(urls[0]).toBe("https://mandor.dev/");
    for (const p of allDocPages()) expect(urls).toContain(`https://mandor.dev${p.href}`);
    expect(urls).toHaveLength(allDocPages().length + 1);
  });

  it("allows crawling and points at the sitemap", () => {
    const r = robotsFor(site);
    expect(r.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(r.sitemap).toBe("https://mandor.dev/sitemap.xml");
  });
});

describe("docs metadata", () => {
  it("uses the page's title, description, and canonical path", () => {
    const m = docMetadata("/docs/lark");
    expect(m.title).toBe("Set up Lark");
    expect(m.description).toMatch(/Lark Custom App/);
    expect(m.alternates?.canonical).toBe("/docs/lark");
    expect(m.openGraph).toMatchObject({ url: "/docs/lark", type: "article" });
  });

  it("keeps the site's share image and large card on docs pages", () => {
    const m = docMetadata("/docs/lark");
    expect(m.openGraph).toMatchObject({ images: [{ url: "/opengraph-image", width: 1200, height: 630 }] });
    expect(m.twitter).toMatchObject({ card: "summary_large_image", images: ["/opengraph-image"] });
  });

  it("every docs page has a description of a useful length", () => {
    for (const p of allDocPages()) {
      const d = String(docMetadata(p.href).description);
      expect(d.length, p.href).toBeGreaterThanOrEqual(70);
      expect(d.length, p.href).toBeLessThanOrEqual(170);
    }
  });

  it("throws for a page that is not in the docs table of contents", () => {
    expect(() => docMetadata("/docs/nope")).toThrow(/not in the docs/);
  });
});

describe("structured data", () => {
  it("describes Mandor as a software application", () => {
    const ld = productLd(site);
    expect(ld).toMatchObject({ "@type": "SoftwareApplication", name: "Mandor", url: "https://mandor.dev/" });
  });

  it("turns the FAQ into FAQPage questions and answers", () => {
    const ld = faqLd([{ q: "Does it merge?", a: "No." }]);
    expect(ld).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Does it merge?", acceptedAnswer: { "@type": "Answer", text: "No." } },
      ],
    });
  });

  it("gives a docs page its breadcrumb trail", () => {
    const ld = breadcrumbLd(site, "/docs/overnight/vm-setup");
    expect(ld.itemListElement.map((i) => i.name)).toEqual(["Docs", "Overnight", "Set up the VM"]);
    expect(ld.itemListElement.at(-1)?.item).toBe("https://mandor.dev/docs/overnight/vm-setup");
  });

  it("serialises safely inside a script tag", () => {
    expect(jsonLdScript({ text: "</script><b>" })).not.toContain("</script>");
  });
});
