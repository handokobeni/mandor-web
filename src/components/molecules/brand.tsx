import { cn } from "@/lib/utils";

/** The three-bar Mandor mark (design: .brand-mark). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("grid size-[18px] content-center gap-0.5", className)}>
      <i className="block h-[3px] rounded-[1px] bg-primary" />
      <i className="block h-[3px] w-[70%] justify-self-end rounded-[1px] bg-primary" />
      <i className="block h-[3px] w-[42%] rounded-[1px] bg-primary" />
    </span>
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 font-semibold tracking-[0.01em]", className)}>
      <BrandMark />
      Mandor
    </span>
  );
}
