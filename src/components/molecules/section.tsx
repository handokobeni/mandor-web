import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page width (design: .lp-wrap). */
export function Wrap({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto w-[min(1120px,100%-32px)] sm:w-[min(1120px,100%-48px)]", className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  id?: string;
  /** Alternate band with a card tint and borders (design: .lp-alt). */
  alt?: boolean;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}

export function Section({ id, alt = false, className, children, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "scroll-mt-14 py-16 sm:py-24",
        alt &&
          "border-y border-[color-mix(in_oklab,var(--border),transparent_50%)] bg-[color-mix(in_oklab,var(--card),var(--background)_40%)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3.5 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">{children}</p>
  );
}

export function Heading({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "max-w-[22ch] text-[clamp(28px,3.6vw,40px)] leading-[1.1] font-semibold tracking-[-0.02em]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lede({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("mt-3.5 max-w-[60ch] text-muted-foreground", className)}>{children}</p>;
}
