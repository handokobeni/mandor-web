import { cn } from "@/lib/utils";
import {
  FolderGit2,
  GitPullRequest,
  GitPullRequestArrow,
  Hand,
  LoaderCircle,
  Timer,
  Wrench,
  type LucideIcon,
} from "@/components/ui";
import type { RunState } from "../model/demo";
import { RUNS, type Tone } from "../model/runs";

const ICONS: Record<RunState, LucideIcon> = {
  preparing: FolderGit2,
  running: LoaderCircle,
  awaiting_dev: Hand,
  publishing: GitPullRequestArrow,
  in_review_loop: GitPullRequest,
  wf_quiet: Timer,
  wf_running: Wrench,
};

export const TONE_TEXT: Record<Tone, string> = {
  working: "text-status-working",
  waiting: "text-status-waiting",
  attention: "text-status-attention",
};

export const TONE_DOT: Record<Tone, string> = {
  working: "bg-status-working",
  waiting: "bg-status-waiting",
  attention: "bg-status-attention",
};

interface RunBadgeProps {
  state: RunState;
  label?: string;
  reduceMotion: boolean;
  className?: string;
}

/** Run status (design: RunStatusBadge). "Waiting for you" is a filled pill. */
export function RunBadge({ state, label, reduceMotion, className }: RunBadgeProps) {
  const run = RUNS[state];
  const Icon = ICONS[state];
  const attention = run.tone === "attention";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium whitespace-nowrap",
        attention
          ? "h-5 rounded-sm bg-status-attention pr-2 pl-1.5 font-semibold text-status-attention-foreground"
          : TONE_TEXT[run.tone],
        className,
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          "size-[13px] stroke-[1.75]",
          run.busy && !reduceMotion && "animate-[spin_1.6s_linear_infinite]",
        )}
      />
      <span className={attention ? undefined : "text-foreground"}>{label ?? run.label}</span>
    </span>
  );
}
