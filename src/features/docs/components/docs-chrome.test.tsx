import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

let pathname = "/docs/lark";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

import { DocsPager } from "./docs-pager";
import { DocsSidebar } from "./docs-sidebar";
import { OnThisPage } from "./on-this-page";
import { slugify, Heading2 } from "./prose";

describe("docs chrome", () => {
  it("marks the current page in the sidebar", () => {
    pathname = "/docs/lark";
    render(<DocsSidebar />);
    const nav = screen.getByRole("navigation", { name: "Docs" });
    expect(within(nav).getByRole("link", { name: "Set up Lark" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Quick start" })).not.toHaveAttribute("aria-current");
  });

  it("links the previous and next pages", () => {
    pathname = "/docs/lark";
    render(<DocsPager />);
    expect(screen.getByRole("link", { name: /Previous.*Installation/ })).toHaveAttribute(
      "href",
      "/docs/installation",
    );
    expect(screen.getByRole("link", { name: /Next.*GitHub and Claude Code/ })).toHaveAttribute(
      "href",
      "/docs/github-and-claude",
    );
  });

  it("lists the h2 sections of the article", () => {
    render(
      <>
        <article data-docs-article>
          <h2 id="create-the-app">Create the app</h2>
          <h2 id="log-in">Log in</h2>
        </article>
        <OnThisPage />
      </>,
    );
    const toc = screen.getByRole("navigation", { name: "On this page" });
    expect(within(toc).getByRole("link", { name: "Create the app" })).toHaveAttribute(
      "href",
      "#create-the-app",
    );
    expect(within(toc).getAllByRole("link")).toHaveLength(2);
  });

  it("gives headings a stable id to link to", () => {
    expect(slugify("Push & create PR")).toBe("push-create-pr");
    expect(slugify("What is `mandord`?")).toBe("what-is-mandord");
    render(<Heading2>Set up Lark</Heading2>);
    expect(screen.getByRole("heading", { name: "Set up Lark" })).toHaveAttribute("id", "set-up-lark");
  });
});
