import { cn } from "@/lib/utils";
import { ArrowRight, CircleCheck, GitBranch, GitPullRequest, Lock, Play } from "@/components/ui";
import { Button } from "@/components/ui";
import type { RunState } from "../model/demo";
import { RunBadge } from "./run-badge";

export interface CardData {
  key: string;
  title: string;
  run: RunState | null;
  pr?: number | null;
  branch?: string;
  blocked?: { text: string; code: string };
  ready: boolean;
}

interface TaskCardProps {
  task: CardData;
  mine?: boolean;
  quietLabel?: string;
  reduceMotion: boolean;
  onStart?: () => void;
  onOpen?: () => void;
}

/** Board card (design: TaskCard). */
export function TaskCard({ task, mine = false, quietLabel, reduceMotion, onStart, onOpen }: TaskCardProps) {
  const attention = task.run === "awaiting_dev";
  return (
    <article
      aria-label={`${task.key} ${task.title}`}
      className={cn(
        "grid min-w-0 animate-card-in grid-cols-[minmax(0,1fr)] gap-2 rounded-lg border bg-card px-2.5 pt-2.5 pb-2",
        mine && "border-[color-mix(in_oklab,var(--primary),transparent_45%)]",
        attention &&
          "border-[color-mix(in_oklab,var(--status-attention),transparent_35%)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--status-attention),transparent_70%)]",
      )}
    >
      <div className="flex min-h-[18px] items-center gap-1.5">
        <span className="font-mono text-xs leading-none font-medium text-muted-foreground">{task.key}</span>
        {task.ready && (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <CircleCheck aria-hidden className="size-3 text-status-ok" />
            Ready To Dev
          </span>
        )}
        {task.pr ? (
          <span className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] leading-none font-medium text-status-pr">
            <GitPullRequest aria-hidden className="size-[13px]" />#{task.pr}
          </span>
        ) : null}
      </div>
      <div className="line-clamp-2 text-[13px] leading-[1.38] font-medium">{task.title}</div>
      {task.run && (
        <div className="flex flex-wrap items-center gap-2">
          <RunBadge state={task.run} label={quietLabel} reduceMotion={reduceMotion} />
        </div>
      )}
      {task.blocked && (
        <div className="flex items-start gap-1.5 text-xs leading-snug text-muted-foreground">
          <Lock aria-hidden className="mt-0.5 size-[13px] shrink-0" />
          <span>
            Can&apos;t start: {task.blocked.text}{" "}
            <code className="font-mono text-[11px] text-foreground">{task.blocked.code}</code>
          </span>
        </div>
      )}
      <div className="flex min-h-6 items-center gap-1.5">
        {task.run && task.branch && (
          <span className="flex min-w-0 items-center gap-1 font-mono text-[11px] leading-none text-muted-foreground">
            <GitBranch aria-hidden className="size-[13px] shrink-0" />
            <span className="truncate">{task.branch}</span>
          </span>
        )}
        <span className="ml-auto flex shrink-0 gap-1">
          {onStart && (
            <Button size="xs" className={cn(!reduceMotion && "animate-btn-pulse")} onClick={onStart}>
              <Play aria-hidden />
              Start
            </Button>
          )}
          {onOpen && (
            <Button size="xs" variant="ghost" onClick={onOpen}>
              Open
              <ArrowRight aria-hidden />
            </Button>
          )}
        </span>
      </div>
    </article>
  );
}
