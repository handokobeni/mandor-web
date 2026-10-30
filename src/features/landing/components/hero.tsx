import { Demo } from "@/features/demo";
import { WaitlistForm } from "@/features/waitlist";
import { Wrap } from "@/components/molecules";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-14 pb-10 before:pointer-events-none before:absolute before:top-[420px] before:left-1/2 before:h-[560px] before:w-[1100px] before:-translate-x-1/2 before:bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary),transparent_84%),transparent)] sm:pt-[88px]"
    >
      <Wrap>
        <p className="mb-3.5 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
          Early access · Linux and Windows (WSL)
        </p>
        <h1
          id="hero-title"
          className="max-w-[15ch] text-[clamp(40px,6.4vw,72px)] leading-[1.02] font-semibold tracking-[-0.035em]"
        >
          Run a crew of Claude&nbsp;Code agents from one board.
        </h1>
        <p className="mt-5 max-w-[62ch] text-[clamp(16px,1.6vw,19px)] text-muted-foreground">
          Mandor puts every agent on a kanban board that stays in sync with Lark Base, both ways. Each agent
          works in its own git worktree, opens a PR, and never merges to main. You see who is working, who is
          waiting for you, and what broke.
        </p>
        <WaitlistForm idPrefix="hero" />
        <p className="max-w-[62ch] text-[13px] text-muted-foreground">
          Needs your own Claude Code subscription, a Lark Custom App with a Sprint Tasks base, and the GitHub
          CLI.
        </p>
      </Wrap>
      <Wrap className="relative mt-12">
        <div id="demo" className="scroll-mt-20">
          <Demo />
        </div>
      </Wrap>
    </section>
  );
}
