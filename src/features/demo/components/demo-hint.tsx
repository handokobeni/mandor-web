import type { ReactNode } from "react";
import {
  Button,
  CircleCheck,
  FileDiff,
  FolderGit2,
  GitCommitHorizontal,
  GitPullRequest,
  Hand,
  LoaderCircle,
  MessageSquareText,
  MousePointerClick,
  RotateCcw,
  Wrench,
  type LucideIcon,
} from "@/components/ui";
import { MY_KEY, MY_PR, type Hint } from "../model/demo";
import { MY_BRANCH } from "../model/runs";

const HINTS: Record<Hint, { icon: LucideIcon; text: ReactNode }> = {
  try: {
    icon: MousePointerClick,
    text: (
      <>
        Try it: press <b>Start</b> on {MY_KEY}.
      </>
    ),
  },
  claimed: {
    icon: FolderGit2,
    text: (
      <>
        Claimed in Lark. Creating the worktree <span className="font-mono">{MY_BRANCH}</span> and starting
        Claude Code.
      </>
    ),
  },
  working: {
    icon: LoaderCircle,
    text: <>The agent reads the task and acceptance criteria, then works. PGS-1388 keeps going next to it.</>,
  },
  "your-turn": {
    icon: Hand,
    text: (
      <>
        <b>Your turn.</b> {MY_KEY} is pinned to the top of the sidebar. Press <b>Open</b> on the card.
      </>
    ),
  },
  panel: {
    icon: FileDiff,
    text: (
      <>
        Read the reply, check the diff, then <b>Push &amp; create PR</b>.
      </>
    ),
  },
  pushing: {
    icon: GitCommitHorizontal,
    text: <>Committing and pushing the branch. The agent itself never pushes.</>,
  },
  pr: {
    icon: GitPullRequest,
    text: <>PR #{MY_PR} is open and Lark says Waiting Review. Merging stays with your team.</>,
  },
  quiet: {
    icon: MessageSquareText,
    text: (
      <>
        A reviewer asked for a fix in Lark. Mandor waits a quiet period (about 2 min, shortened here) before
        forwarding trusted comments.
      </>
    ),
  },
  fixing: { icon: Wrench, text: <>Trusted comments forwarded. The agent is fixing in the same worktree.</> },
  done: {
    icon: CircleCheck,
    text: <>Fix pushed to PR #{MY_PR} and back in review. You did not open a terminal.</>,
  },
};

export function DemoHint({ hint, onReplay }: { hint: Hint; onReplay: () => void }) {
  const { icon: Icon, text } = HINTS[hint];
  return (
    <p
      aria-live="polite"
      className="mt-2.5 flex min-h-6 items-center gap-2.5 text-sm text-muted-foreground [&_b]:font-medium [&_b]:text-foreground"
    >
      <Icon aria-hidden className="size-[13px] shrink-0" />
      <span>{text}</span>
      {hint === "done" && (
        <Button size="xs" variant="outline" onClick={onReplay}>
          <RotateCcw aria-hidden />
          Replay
        </Button>
      )}
    </p>
  );
}
