import { cn } from "@/lib/utils";
import type { RunState } from "../model/demo";
import { RUNS } from "../model/runs";
import { RunBadge, TONE_DOT } from "./run-badge";

interface AgentRowProps {
  taskKey: string;
  title: string;
  run: RunState;
  reduceMotion: boolean;
}

/** Sidebar row (design: AgentRow). Runs waiting for you are tinted and pulse. */
export function AgentRow({ taskKey, title, run, reduceMotion }: AgentRowProps) {
  const tone = RUNS[run].tone;
  const attention = tone === "attention";
  return (
    <li
      className={cn(
        "grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-0.5 rounded-lg p-2",
        attention && "bg-[color-mix(in_oklab,var(--status-attention),transparent_88%)]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "row-span-2 mt-1.5 size-[7px] self-start rounded-full",
          TONE_DOT[tone],
          attention && !reduceMotion && "animate-dot-pulse",
        )}
      />
      <span className="flex min-w-0 items-baseline gap-1.5">
        <span className="shrink-0 font-mono text-[11px] leading-snug font-medium text-muted-foreground">
          {taskKey}
        </span>
        <span className="truncate text-xs font-medium">{title}</span>
      </span>
      <RunBadge
        state={run}
        label={run === "wf_quiet" ? "Quiet period" : undefined}
        reduceMotion={reduceMotion}
        className="text-[11px]"
      />
    </li>
  );
}
