import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LandingPage } from "./landing-page";

describe("landing page", () => {
  it("has one h1 and the sections in the design's order", () => {
    render(<LandingPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
      "Six terminals. Which one is waiting for you?",
      "The board is the foreman. You stay the reviewer.",
      "Lark stays the source of truth.",
      '"Waiting Fix" no longer waits for you.',
      "Agents write code. They don't ship it.",
      "Bring your own tools. Mandor brings the board.",
      "What works today, and what is coming.",
      "Early access first. Pricing before launch.",
      "Questions developers ask first.",
      "Get your crew on one board.",
    ]);
  });

  it("every section link in the nav points at a section on the page", () => {
    const { container } = render(<LandingPage />);
    const nav = screen.getByRole("navigation", { name: "Sections" });
    const targets = within(nav)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href") ?? "");
    expect(targets).toContain("/docs");
    // Section links are absolute ("/#lark") so they also work from the docs.
    const sections = targets.filter((h) => h.startsWith("/#"));
    expect(sections).toHaveLength(7);
    for (const href of sections) {
      expect(container.querySelector(href.slice(1)), href).not.toBeNull();
    }
    for (const a of screen.getAllByRole("link", { name: "Join early access" })) {
      expect(container.querySelector((a.getAttribute("href") ?? "").replace(/^\//, ""))).not.toBeNull();
    }
  });

  it("shows the Lark status mapping as a table", () => {
    render(<LandingPage />);
    const table = screen.getByRole("table", { name: /Lark Task Status maps to Mandor columns/ });
    expect(within(table).getAllByRole("row")).toHaveLength(6);
    expect(within(table).getByRole("cell", { name: "Waiting Review · In Review" })).toBeInTheDocument();
  });

  it("states what is available now", () => {
    render(<LandingPage />);
    expect(screen.getByText("Release 2 · available in early access")).toBeInTheDocument();
    expect(screen.getByText("Release 3 · in testing")).toBeInTheDocument();
  });

  it("opens an FAQ answer from its question", async () => {
    const user = userEvent.setup();
    render(<LandingPage />);
    const question = screen.getByText("Will an agent ever merge to main?");
    const details = question.closest("details");
    expect(details).not.toHaveAttribute("open");
    await user.click(question);
    expect(details).toHaveAttribute("open");
  });

  it("has a skip link to the main content", () => {
    render(<LandingPage />);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#top");
    expect(screen.getByRole("main")).toHaveAttribute("id", "top");
  });
});
