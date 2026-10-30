import { describe, expect, it } from "vitest";
import { parseSiteUrl } from "./site";

describe("SITE_URL", () => {
  it("falls back to localhost when unset", () => {
    expect(parseSiteUrl(undefined).href).toBe("http://localhost:3000/");
    expect(parseSiteUrl("").href).toBe("http://localhost:3000/");
  });

  it("accepts an absolute http(s) URL and drops any path", () => {
    expect(parseSiteUrl("https://mandor.dev/").href).toBe("https://mandor.dev/");
    expect(parseSiteUrl("https://mandor.dev/some/path").href).toBe("https://mandor.dev/");
  });

  it("rejects anything else", () => {
    expect(() => parseSiteUrl("mandor.dev")).toThrow(/SITE_URL/);
    expect(() => parseSiteUrl("ftp://mandor.dev")).toThrow(/SITE_URL/);
  });
});
