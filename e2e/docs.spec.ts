import { expect, test } from "@playwright/test";

const PAGES = [
  "/docs",
  "/docs/installation",
  "/docs/lark",
  "/docs/github-and-claude",
  "/docs/repos",
  "/docs/board",
  "/docs/start-a-task",
  "/docs/push-and-pr",
  "/docs/waiting-fix",
  "/docs/ac-review",
  "/docs/grouped-cards",
  "/docs/overnight",
  "/docs/overnight/vm-setup",
  "/docs/troubleshooting",
  "/docs/reference",
];

test.describe("docs", () => {
  test("every page in the sidebar opens with one heading and no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    for (const path of PAGES) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBe(200);
      await expect(page.getByRole("heading", { level: 1 }), path).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });

  test("reads from the landing page into the docs and on to the next page", async ({ page, isMobile }) => {
    test.skip(isMobile, "the section nav is hidden on small screens");
    await page.goto("/");
    await page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name: "Docs" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Quick start" })).toBeVisible();
    const sidebar = page.getByRole("navigation", { name: "Docs" }).last();
    await expect(sidebar.getByRole("link", { name: "Quick start" })).toHaveAttribute("aria-current", "page");
    await page.getByRole("link", { name: /Next.*Installation/ }).click();
    await expect(page).toHaveURL(/\/docs\/installation$/);
    await page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Linux" }).click();
    await expect(page).toHaveURL(/#linux$/);
  });

  test("the docs menu opens on small screens", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/docs/board");
    await page.getByText("Docs menu").click();
    await page
      .getByRole("navigation", { name: "Docs" })
      .first()
      .getByRole("link", { name: "AC review" })
      .click();
    await expect(page.getByRole("heading", { level: 1, name: "AC review" })).toBeVisible();
  });
});
