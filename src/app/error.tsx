"use client";

import { Button } from "@/components/ui";
import { Wrap } from "@/components/molecules";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-dvh place-items-center">
      <Wrap className="grid justify-items-start gap-4">
        <h1 className="text-[clamp(28px,3.6vw,40px)] leading-[1.1] font-semibold tracking-[-0.02em]">
          Something went wrong.
        </h1>
        <p className="text-muted-foreground">The page could not be shown. Try again in a moment.</p>
        <Button onClick={reset}>Try again</Button>
      </Wrap>
    </main>
  );
}
