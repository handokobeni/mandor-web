export interface DocPage {
  href: string;
  title: string;
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

/** The docs table of contents, in reading order (sidebar and Previous/Next). */
export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Get started",
    pages: [
      { href: "/docs", title: "Quick start" },
      { href: "/docs/installation", title: "Installation" },
      { href: "/docs/lark", title: "Set up Lark" },
      { href: "/docs/github-and-claude", title: "GitHub and Claude Code" },
      { href: "/docs/repos", title: "Add a repo" },
    ],
  },
  {
    title: "Everyday work",
    pages: [
      { href: "/docs/board", title: "The board" },
      { href: "/docs/start-a-task", title: "Start a task" },
      { href: "/docs/push-and-pr", title: "Push & create PR" },
      { href: "/docs/waiting-fix", title: "The Waiting Fix loop" },
      { href: "/docs/ac-review", title: "AC review" },
      { href: "/docs/grouped-cards", title: "Grouped cards" },
    ],
  },
  {
    title: "Overnight",
    pages: [
      { href: "/docs/overnight", title: "Overnight on a VM" },
      { href: "/docs/overnight/vm-setup", title: "Set up the VM" },
    ],
  },
  {
    title: "Reference",
    pages: [
      { href: "/docs/troubleshooting", title: "Troubleshooting" },
      { href: "/docs/reference", title: "Data, logs, and environment" },
    ],
  },
];

export function allDocPages(): DocPage[] {
  return DOC_SECTIONS.flatMap((s) => s.pages);
}

function normalise(href: string): string {
  return href.length > 1 && href.endsWith("/") ? href.slice(0, -1) : href;
}

export function pagerFor(href: string): { prev: DocPage | null; next: DocPage | null } {
  const pages = allDocPages();
  const i = pages.findIndex((p) => p.href === normalise(href));
  if (i < 0) return { prev: null, next: null };
  return { prev: pages[i - 1] ?? null, next: pages[i + 1] ?? null };
}

export function sectionOf(href: string): string | null {
  const h = normalise(href);
  return DOC_SECTIONS.find((s) => s.pages.some((p) => p.href === h))?.title ?? null;
}
