export interface DocPage {
  href: string;
  title: string;
  /** Search-result snippet and social description (about 70–160 characters). */
  description: string;
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
      {
        href: "/docs",
        title: "Quick start",
        description:
          "Install Mandor, connect Lark, GitHub, and Claude Code, and take your first Lark task from Start to a pull request.",
      },
      {
        href: "/docs/installation",
        title: "Installation",
        description:
          "Install Mandor on Windows with WSL or on Linux, keep agents working while you are away, and update or uninstall it.",
      },
      {
        href: "/docs/lark",
        title: "Set up Lark",
        description:
          "Create the Lark Custom App, choose its scopes, copy your Base IDs, and log in so Mandor can sync your Sprint Tasks.",
      },
      {
        href: "/docs/github-and-claude",
        title: "GitHub and Claude Code",
        description:
          "Log in to the GitHub CLI and Claude Code where Mandor's daemon runs, and see what the agent is never allowed to do.",
      },
      {
        href: "/docs/repos",
        title: "Add a repo",
        description:
          "Register a repo for Mandor's agents, choose its settings, trusted reviewers, and test mode, and group repos in workspaces.",
      },
    ],
  },
  {
    title: "Everyday work",
    pages: [
      {
        href: "/docs/board",
        title: "The board",
        description:
          "How Lark statuses become Mandor columns, which tasks can be started, and what the agent sidebar and card flags mean.",
      },
      {
        href: "/docs/start-a-task",
        title: "Start a task",
        description:
          "Start a Lark task in Mandor: the Start dialog, approving the agent's plan, chatting with it, and reviewing its changes.",
      },
      {
        href: "/docs/push-and-pr",
        title: "Push & create PR",
        description:
          "What Push & create PR does: AC review, the push gate, commit, branch push, the pull request, and the Lark status change.",
      },
      {
        href: "/docs/waiting-fix",
        title: "The Waiting Fix loop",
        description:
          "How Mandor fixes review feedback by itself: Waiting Fix in Lark, the quiet period, trusted comments, and Fix Notes.",
      },
      {
        href: "/docs/ac-review",
        title: "AC review",
        description:
          "Review every acceptance criterion before the PR, let the reviewer test your web app in Chrome, and use design sources.",
      },
      {
        href: "/docs/grouped-cards",
        title: "Grouped cards",
        description:
          "Run several cards of one epic as a single run with one branch and one PR, card by card, including Waiting Fix.",
      },
    ],
  },
  {
    title: "Overnight",
    pages: [
      {
        href: "/docs/overnight",
        title: "Overnight on a VM",
        description:
          "Queue Lark tasks for agents on a team VM overnight, cap usage per night, and decide on draft PRs from the morning report.",
      },
      {
        href: "/docs/overnight/vm-setup",
        title: "Set up the VM",
        description:
          "Set up a shared Linux VM for Mandor's overnight agents: users, sudoers, ports, the VM daemon, SSH or IAP, and logins.",
      },
    ],
  },
  {
    title: "Reference",
    pages: [
      {
        href: "/docs/troubleshooting",
        title: "Troubleshooting",
        description:
          "Fix common Mandor problems: an unreachable daemon, Lark login and sync, reviews without a browser, and the overnight VM.",
      },
      {
        href: "/docs/reference",
        title: "Data, logs, and environment",
        description:
          "Where Mandor keeps its database, logs, logins, and worktrees, and the environment variables the daemon reads.",
      },
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

/** The page for `href`, or null when it is not in the docs. */
export function docPage(href: string): DocPage | null {
  return allDocPages().find((p) => p.href === normalise(href)) ?? null;
}

export function sectionOf(href: string): string | null {
  const h = normalise(href);
  return DOC_SECTIONS.find((s) => s.pages.some((p) => p.href === h))?.title ?? null;
}
