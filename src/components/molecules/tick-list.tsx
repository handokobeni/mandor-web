import type { ReactNode } from "react";
import { Check } from "@/components/ui";

export function TickList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 grid gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[18px_1fr] gap-2.5 text-sm">
          <Check aria-hidden className="mt-[3px] size-4 stroke-[1.75] text-status-ok" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
