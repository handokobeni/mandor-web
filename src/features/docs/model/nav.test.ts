import { describe, expect, it } from "vitest";
import { DOC_SECTIONS, pagerFor, allDocPages, sectionOf } from "./nav";

describe("docs navigation", () => {
  it("lists every page once, starting with Quick start at /docs", () => {
    const pages = allDocPages();
    expect(pages[0]).toMatchObject({ href: "/docs", title: "Quick start" });
    expect(new Set(pages.map((p) => p.href)).size).toBe(pages.length);
    expect(DOC_SECTIONS.map((s) => s.title)).toEqual([
      "Get started",
      "Everyday work",
      "Overnight",
      "Reference",
    ]);
  });

  it("gives the previous and next page across sections", () => {
    expect(pagerFor("/docs")).toMatchObject({
      prev: null,
      next: { href: "/docs/installation", title: "Installation" },
    });
    const firstEveryday = DOC_SECTIONS[1]!.pages[0]!;
    const lastGetStarted = DOC_SECTIONS[0]!.pages.at(-1)!;
    expect(pagerFor(firstEveryday.href).prev).toEqual(lastGetStarted);
    const last = allDocPages().at(-1)!;
    expect(pagerFor(last.href).next).toBeNull();
  });

  it("ignores a trailing slash and unknown pages", () => {
    expect(pagerFor("/docs/installation/").prev?.href).toBe("/docs");
    expect(pagerFor("/docs/nope")).toEqual({ prev: null, next: null });
  });

  it("names the section a page belongs to", () => {
    expect(sectionOf("/docs/overnight")).toBe("Overnight");
    expect(sectionOf("/docs/nope")).toBeNull();
  });
});
