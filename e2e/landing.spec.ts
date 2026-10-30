import { expect, test } from "@playwright/test";

test.describe("landing page", () => {
  test("loads with security headers and no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    const headers = res?.headers() ?? {};
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Run a crew of Claude.Code agents/);
    await expect(page.getByRole("button", { name: "Start" })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("the demo walks a task to a pull request", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const demo = page.getByRole("region", { name: "Interactive Mandor demo" });
    await demo.getByRole("button", { name: "Start" }).click();
    await expect(demo.getByText("Lark · PGS-1402 → In Progress")).toBeVisible();
    await demo.getByRole("button", { name: "Open" }).click();
    const panel = demo.getByRole("dialog");
    await expect(panel.getByRole("button", { name: "Push & create PR" })).toBeFocused();
    await panel.getByRole("button", { name: "Push & create PR" }).click();
    await expect(demo.getByText("Lark · PGS-1402 → Waiting Review")).toBeVisible();
    await expect(page.getByRole("button", { name: "Replay" })).toBeVisible({ timeout: 15_000 });
    await page.getByRole("button", { name: "Replay" }).click();
    await expect(demo.getByRole("button", { name: "Start" })).toBeVisible();
  });

  test("the waitlist checks the email and says sign-ups are not open", async ({ page }) => {
    await page.goto("/");
    const form = page.locator("#join");
    await form.getByRole("button", { name: "Join early access" }).click();
    await expect(form.getByText("Enter your work email to join.")).toBeVisible();
    await expect(form.getByLabel("Work email")).toBeFocused();
    await form.getByLabel("Work email").fill("budi@kantor.co.id");
    await form.getByLabel("Team size").selectOption("2 to 5");
    await form.getByRole("button", { name: "Join early access" }).click();
    await expect(form.getByText(/sign-ups are not open yet/)).toBeVisible();
  });

  test("fits the screen without horizontal scrolling", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
