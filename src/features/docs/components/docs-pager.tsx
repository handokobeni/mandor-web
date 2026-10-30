"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "@/components/ui";
import { pagerFor, type DocPage } from "../model/nav";

function PagerLink({ page, dir }: { page: DocPage; dir: "Previous" | "Next" }) {
  return (
    <Link
      href={page.href}
      className={`group grid gap-1 rounded-xl border px-5 py-4 hover:border-primary/60 ${dir === "Next" ? "text-right sm:col-start-2" : ""}`}
    >
      <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{dir}</span>
      <span className="inline-flex items-center gap-2 font-semibold group-hover:text-primary max-sm:justify-start sm:justify-end [.text-right_&]:justify-end">
        {dir === "Previous" && <ArrowRight aria-hidden className="size-4 rotate-180" />}
        {page.title}
        {dir === "Next" && <ArrowRight aria-hidden className="size-4" />}
      </span>
    </Link>
  );
}

export function DocsPager() {
  const { prev, next } = pagerFor(usePathname());
  if (!prev && !next) return null;
  return (
    <nav aria-label="Previous and next page" className="mt-16 grid gap-3 border-t pt-8 sm:grid-cols-2">
      {prev && <PagerLink page={prev} dir="Previous" />}
      {next && <PagerLink page={next} dir="Next" />}
    </nav>
  );
}
