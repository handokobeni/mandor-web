import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Bot, Button, ChevronRight, CircleCheck, GitPullRequestArrow, Wrench, X } from "@/components/ui";
import { MY_KEY } from "../model/demo";
import { MY_BRANCH, MY_TITLE } from "../model/runs";

interface DemoPanelProps {
  reduceMotion: boolean;
  onClose: () => void;
  onPush: () => void;
}

/** The run panel: the agent's reply and Push & create PR. */
export function DemoPanel({ reduceMotion, onClose, onPush }: DemoPanelProps) {
  const push = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    push.current?.focus({ preventScroll: true });
  }, []);
  return (
    <div
      role="dialog"
      aria-label={`${MY_KEY} ${MY_TITLE}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="absolute top-[38px] right-0 bottom-0 flex w-full max-w-[440px] animate-panel-in flex-col border-l bg-popover shadow-pop"
    >
      <div className="flex items-center gap-2 border-b px-3.5 py-2.5">
        <span className="font-mono text-muted-foreground">{MY_KEY}</span>
        <b className="truncate font-semibold">{MY_TITLE}</b>
        <Button size="icon-xs" variant="ghost" className="ml-auto" aria-label="Close" onClick={onClose}>
          <X aria-hidden />
        </Button>
      </div>
      <div className="grid flex-1 content-start gap-3 overflow-auto p-3.5">
        <div className="flex h-8 items-center gap-2 rounded-lg border bg-card px-2.5 text-xs text-muted-foreground">
          <ChevronRight aria-hidden className="size-[13px]" />
          <Wrench aria-hidden className="size-[13px]" />
          <span>Read 3 files, edited 2 files, ran 1 command</span>
        </div>
        <div className="max-w-[72ch] leading-relaxed">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Bot aria-hidden className="size-[13px]" />
            Agent
          </div>
          <p>
            Added status and date-range filters to the invoice list. The filters live in the URL, so a
            filtered view can be shared.
          </p>
          <p className="mt-2">
            <code className="rounded-sm bg-muted px-1 font-mono text-xs">listInvoices()</code> now takes{" "}
            <code className="rounded-sm bg-muted px-1 font-mono text-xs">status</code>,{" "}
            <code className="rounded-sm bg-muted px-1 font-mono text-xs">from</code>, and{" "}
            <code className="rounded-sm bg-muted px-1 font-mono text-xs">to</code>. Tests pass.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <CircleCheck aria-hidden className="size-[13px]" />
          <span>Turn finished · 3m 48s</span>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t px-3.5 py-2.5">
        <span className="text-xs text-muted-foreground">2 files changed on {MY_BRANCH}</span>
        <Button
          ref={push}
          size="sm"
          className={cn("ml-auto", !reduceMotion && "animate-btn-pulse")}
          onClick={onPush}
        >
          <GitPullRequestArrow aria-hidden />
          Push &amp; create PR
        </Button>
      </div>
    </div>
  );
}
