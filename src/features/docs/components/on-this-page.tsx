"use client";

import { useMemo, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
}

const ARTICLE = "[data-docs-article]";

function headingsSnapshot(): string {
  const items = Array.from(document.querySelectorAll<HTMLHeadingElement>(`${ARTICLE} h2[id]`)).map((h) => ({
    id: h.id,
    text: (h.firstChild?.textContent ?? h.textContent ?? "").trim(),
  }));
  return JSON.stringify(items);
}

function subscribeArticle(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}

function activeSnapshot(): string {
  const hs = Array.from(document.querySelectorAll<HTMLHeadingElement>(`${ARTICLE} h2[id]`));
  let active = hs[0]?.id ?? "";
  for (const h of hs) if (h.getBoundingClientRect().top <= 120) active = h.id;
  return active;
}

function subscribeScroll(onChange: () => void): () => void {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** The page's sections, read from the article's h2 headings; highlights the one in view. */
export function OnThisPage() {
  const json = useSyncExternalStore(subscribeArticle, headingsSnapshot, () => "[]");
  const items = useMemo(() => JSON.parse(json) as TocItem[], [json]);
  const active = useSyncExternalStore(subscribeScroll, activeSnapshot, () => "");
  if (items.length === 0) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="grid gap-1.5 border-l">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={it.id === active ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-0.5 pl-3",
                it.id === active
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
