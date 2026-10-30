import { Badge, buttonVariants } from "@/components/ui";
import { Brand, Wrap } from "@/components/molecules";

const LINKS = [
  { href: "#demo", label: "Demo" },
  { href: "#lark", label: "Lark sync" },
  { href: "#fix", label: "Review loop" },
  { href: "#safety", label: "Safety" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-[color-mix(in_oklab,var(--border),transparent_40%)] bg-[color-mix(in_oklab,var(--background),transparent_12%)] backdrop-blur-[10px]">
      <Wrap className="flex h-14 items-center gap-3.5">
        <a href="#top" aria-label="Mandor home" className="text-base">
          <Brand />
        </a>
        <Badge className="text-muted-foreground max-sm:hidden">Early access</Badge>
        <nav aria-label="Sections" className="ml-auto hidden gap-0.5 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#join" className={buttonVariants({ size: "sm", className: "max-lg:ml-auto" })}>
          Join early access
        </a>
      </Wrap>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t pt-7 pb-10">
      <Wrap className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
        <Brand />
        <span className="text-muted-foreground">© 2026 Mandor</span>
        <span className="basis-full text-muted-foreground">
          Claude Code, Lark, and GitHub are trademarks of their respective owners. Mandor is an independent
          product and is not affiliated with or endorsed by them.
        </span>
      </Wrap>
    </footer>
  );
}
