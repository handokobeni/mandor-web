import { Children, isValidElement, type ReactNode } from "react";
import { CircleCheck, Lock, ShieldAlert } from "@/components/ui";
import { cn } from "@/lib/utils";

/** A heading's anchor id: lowercase words joined by dashes. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`'"’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

function Anchored({ level, children }: { level: 2 | 3; children: ReactNode }) {
  const id = slugify(textOf(Children.toArray(children)));
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag
      id={id}
      className={cn(
        "group scroll-mt-20 font-semibold",
        level === 2
          ? "mt-12 mb-4 text-[26px] leading-tight tracking-[-0.02em]"
          : "mt-8 mb-3 text-[19px] leading-snug tracking-[-0.01em]",
      )}
    >
      {children}
      {/* Visual anchor only; "On this page" links each section for keyboard and screen readers. */}
      <a
        href={`#${id}`}
        aria-hidden
        tabIndex={-1}
        className="ml-2 text-muted-foreground opacity-0 group-hover:opacity-100"
      >
        #
      </a>
    </Tag>
  );
}

export function Heading2({ children }: { children: ReactNode }) {
  return <Anchored level={2}>{children}</Anchored>;
}

export function Heading3({ children }: { children: ReactNode }) {
  return <Anchored level={3}>{children}</Anchored>;
}

const CALLOUTS = {
  note: { label: "Note", icon: CircleCheck, tone: "border-status-working/40 [&_svg]:text-status-working" },
  pitfall: {
    label: "Pitfall",
    icon: ShieldAlert,
    tone: "border-status-warning/50 [&_svg]:text-status-warning",
  },
  security: { label: "Security", icon: Lock, tone: "border-status-failed/40 [&_svg]:text-status-failed" },
} as const;

/** A highlighted aside, like react.dev's Note and Pitfall boxes. */
export function Callout({ kind = "note", children }: { kind?: keyof typeof CALLOUTS; children: ReactNode }) {
  const c = CALLOUTS[kind];
  return (
    <aside className={cn("my-6 rounded-xl border bg-card px-5 py-4", c.tone)}>
      <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
        <c.icon aria-hidden className="size-4 stroke-[1.75]" />
        {c.label}
      </p>
      <div className="text-[15px] text-muted-foreground [&_p+p]:mt-2 [&_strong]:text-foreground">
        {children}
      </div>
    </aside>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <Callout kind="note">{children}</Callout>;
}

export function Pitfall({ children }: { children: ReactNode }) {
  return <Callout kind="pitfall">{children}</Callout>;
}

export function Security({ children }: { children: ReactNode }) {
  return <Callout kind="security">{children}</Callout>;
}

/** A "You will learn" box at the top of a page. */
export function Intro({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-xl border bg-card px-6 py-5">
      <p className="mb-2 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
        You will learn
      </p>
      <div className="[&_li]:my-1 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>
    </div>
  );
}
