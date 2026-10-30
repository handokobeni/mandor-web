"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DOC_SECTIONS } from "../model/nav";

export function DocsSidebar() {
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  return (
    <nav aria-label="Docs" className="grid gap-6 text-sm">
      {DOC_SECTIONS.map((s) => (
        <div key={s.title}>
          <p className="mb-2 px-3 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            {s.title}
          </p>
          <ul className="grid gap-0.5">
            {s.pages.map((p) => {
              const current = p.href === pathname;
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-1.5",
                      current
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
