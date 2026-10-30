import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Heading2, Heading3, Intro, Note, Pitfall, Security } from "@/features/docs";

function A({ href = "", ...props }: ComponentProps<"a">) {
  const cls = "font-medium text-primary underline-offset-4 hover:underline";
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} className={cls} {...props} />;
  return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props} />;
}

const components: MDXComponents = {
  h1: (p) => (
    <h1 className="text-[clamp(32px,4vw,44px)] leading-[1.1] font-semibold tracking-[-0.03em]" {...p} />
  ),
  h2: ({ children }) => <Heading2>{children}</Heading2>,
  h3: ({ children }) => <Heading3>{children}</Heading3>,
  p: (p) => <p className="my-4 leading-[1.75]" {...p} />,
  ul: (p) => <ul className="my-4 list-disc space-y-1.5 pl-6 marker:text-muted-foreground" {...p} />,
  ol: (p) => <ol className="my-4 list-decimal space-y-1.5 pl-6 marker:text-muted-foreground" {...p} />,
  li: (p) => <li className="pl-1 leading-[1.7]" {...p} />,
  a: A,
  strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
  hr: () => <hr className="my-10" />,
  blockquote: (p) => (
    <blockquote className="my-6 border-l-2 border-primary pl-4 text-muted-foreground" {...p} />
  ),
  code: (p) => (
    <code
      className="rounded-sm bg-muted px-1.5 py-px font-mono text-[0.86em] text-foreground [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-[13px]"
      {...p}
    />
  ),
  pre: (p) => (
    <pre
      className="my-5 overflow-x-auto rounded-xl border bg-sidebar px-4 py-3.5 font-mono text-[13px] leading-[1.7]"
      {...p}
    />
  ),
  table: (p) => (
    <div className="my-6 overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse text-sm" {...p} />
    </div>
  ),
  th: (p) => (
    <th
      className="border-b bg-card px-3.5 py-2.5 text-left text-[11px] font-medium tracking-[0.07em] text-muted-foreground uppercase"
      {...p}
    />
  ),
  td: (p) => <td className="border-t px-3.5 py-2.5 align-top leading-relaxed" {...p} />,
  Intro,
  Note,
  Pitfall,
  Security,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
