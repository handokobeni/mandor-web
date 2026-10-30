import { expect, test } from "@playwright/test";

// playwright.config.ts builds with SITE_URL=https://mandor.example.
const SITE = "https://mandor.example";

test("the home page has a canonical URL, a share image, and structured data", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/mandor\.example\/?$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /^https:\/\/mandor\.example\/opengraph-image/,
  );
  const types = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((els) =>
      els.map((e) => (JSON.parse(e.textContent ?? "{}") as { "@type": string })["@type"]),
    );
  expect(types).toEqual(expect.arrayContaining(["SoftwareApplication", "FAQPage"]));
});

test("a docs page has its own title, description, canonical URL, and breadcrumb", async ({ page }) => {
  await page.goto("/docs/overnight/vm-setup");
  await expect(page).toHaveTitle("Set up the VM · Mandor");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /shared Linux VM/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${SITE}/docs/overnight/vm-setup`,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  const types = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((els) =>
      els.map((e) => (JSON.parse(e.textContent ?? "{}") as { "@type": string })["@type"]),
    );
  expect(types).toEqual(expect.arrayContaining(["BreadcrumbList", "TechArticle"]));
});

test("robots.txt and sitemap.xml point at the real site", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain(`<loc>${SITE}/docs/overnight/vm-setup</loc>`);
});

test("the share image renders", async ({ request }) => {
  const res = await request.get("/opengraph-image");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/png");
});

test("a missing page is not indexed", async ({ page }) => {
  await page.goto("/no-such-page");
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
});
