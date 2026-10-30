import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui";
import { Brand, Wrap } from "@/components/molecules";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center">
      <Wrap className="grid justify-items-start gap-4">
        <Brand />
        <h1 className="text-[clamp(28px,3.6vw,40px)] leading-[1.1] font-semibold tracking-[-0.02em]">
          This page is not on the board.
        </h1>
        <p className="text-muted-foreground">The link may be old, or the page moved.</p>
        <Link href="/" className={buttonVariants()}>
          Back to Mandor
        </Link>
      </Wrap>
    </main>
  );
}
