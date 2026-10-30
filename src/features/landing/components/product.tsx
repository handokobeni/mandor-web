import type { LucideIcon } from "@/components/ui";
import {
  ArrowLeftRight,
  ArrowRight,
  Ban,
  Card,
  ChevronRight,
  GitPullRequest,
  MessageSquareText,
  ShieldAlert,
  ShieldCheck,
  SquareTerminal,
  Timer,
  Wrench,
} from "@/components/ui";
import { Heading, Kicker, Lede, Section, TickList, Wrap } from "@/components/molecules";
import { cn } from "@/lib/utils";

const code = "rounded-sm bg-muted px-1.5 py-px font-mono text-[0.88em]";

export function Problem() {
  return (
    <Section labelledBy="problem-title">
      <Wrap className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Kicker>The problem</Kicker>
          <Heading id="problem-title">Six terminals. Which one is waiting for you?</Heading>
          <Lede>
            Running agents in parallel works until you lose track. One terminal per task, one task per Lark
            record, and nothing tells you which session finished its turn twenty minutes ago. Then the Lark
            board drifts, because someone has to copy every status by hand.
          </Lede>
        </div>
        <div aria-hidden className="overflow-hidden rounded-2xl border bg-sidebar">
          <div className="flex gap-0.5 overflow-hidden border-b px-1.5 pt-1.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={cn(
                  "rounded-t-md px-3 py-1.5 font-mono text-xs",
                  i === 2 ? "bg-background text-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                claude
              </span>
            ))}
          </div>
          <pre className="m-0 px-4 pt-[18px] pb-[22px] font-mono text-[13px] leading-[1.8] whitespace-pre-wrap">
            {"$ claude\n> which task was this again?\n"}
            <span className="text-muted-foreground">{"… 3 other sessions finished their turn\n"}</span>
            <span className="text-muted-foreground">{'… Lark still says "To Do"'}</span>
          </pre>
        </div>
      </Wrap>
    </Section>
  );
}

const HOW = [
  {
    title: "Press Start on a ready task",
    text: "Mandor claims the Lark record, creates a worktree from origin, and starts Claude Code with the title, description, and acceptance criteria. Lark moves to In Progress.",
  },
  {
    title: "Every agent in one sidebar",
    text: "Working, waiting for you, failed, or parked. Runs that need your reply are pinned to the top, with a count in the title bar and the tray.",
  },
  {
    title: "Push & create PR",
    text: "When the diff looks right, one button commits, pushes the branch, and opens the PR. Lark moves to Waiting Review. Merging stays with your team.",
  },
  {
    title: "Review fixes come back on their own",
    text: "A reviewer moves the task to Waiting Fix and comments in Lark. Mandor forwards trusted comments, the agent fixes, and the task returns to review.",
  },
];

export function HowItWorks() {
  return (
    <Section labelledBy="how-title">
      <Wrap>
        <Kicker>How it works</Kicker>
        <Heading id="how-title">The board is the foreman. You stay the reviewer.</Heading>
        <ol className="mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-4">
          {HOW.map((s, i) => (
            <li
              key={s.title}
              className={cn(
                "grid content-start gap-2.5 py-6 sm:pr-6",
                i > 0 && "max-sm:border-t",
                i % 2 === 1 && "sm:border-l sm:pl-6",
                i >= 2 && "sm:border-t lg:border-t-0",
                i === 2 && "lg:border-l lg:pl-6",
              )}
            >
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="text-[17px] leading-[1.3] font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </Section>
  );
}

const MAPPING = [
  { lark: "To Do", mandor: "Todo" },
  { lark: "In Progress · Waiting Fix", mandor: "In Progress" },
  { lark: "Waiting Review · In Review", mandor: "Review" },
  { lark: "Waiting Deploy · Delivered", mandor: "Done" },
];

export function LarkSync() {
  return (
    <Section id="lark" alt labelledBy="lark-title">
      <Wrap className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Kicker>Two-way Lark sync</Kicker>
          <Heading id="lark-title">Lark stays the source of truth.</Heading>
          <Lede>
            Columns come from Task Status, not a second board. Titles, descriptions, acceptance criteria, and
            assignees are read from Lark and never edited by Mandor. When Lark and Mandor disagree, Lark wins
            and the card says so.
          </Lede>
          <TickList
            items={[
              "Only three automatic moves: To Do → In Progress, In Progress → Waiting Review, Waiting Fix → In Progress",
              "Starts only tasks marked Ready To Dev or Commit To Sprint",
              'One owner per task. If two people press Start, one gets a clear "lost the claim"',
            ]}
          />
        </div>
        <Card className="py-2">
          <table className="w-full table-fixed border-collapse text-sm">
            <caption className="sr-only">How Lark Task Status maps to Mandor columns</caption>
            <thead>
              <tr className="text-[11px] font-medium tracking-[0.07em] text-muted-foreground uppercase">
                <th scope="col" className="px-3 py-2.5 text-left font-medium sm:px-[18px]">
                  Lark Task Status
                </th>
                <th scope="col" className="w-7">
                  <span className="sr-only">Sync</span>
                </th>
                <th scope="col" className="px-3 py-2.5 text-left font-medium sm:px-[18px]">
                  Mandor column
                </th>
              </tr>
            </thead>
            <tbody>
              {MAPPING.map((m) => (
                <MapRow
                  key={m.lark}
                  lark={m.lark}
                  mandor={m.mandor}
                  icon={ArrowLeftRight}
                  label="syncs both ways"
                />
              ))}
              <MapRow
                lark="Anything else"
                mandor="Unknown, shown only when used"
                icon={ArrowRight}
                label="read only"
                dim
              />
            </tbody>
          </table>
        </Card>
      </Wrap>
    </Section>
  );
}

function MapRow(props: { lark: string; mandor: string; icon: LucideIcon; label: string; dim?: boolean }) {
  const Icon = props.icon;
  return (
    <tr className="border-t">
      <td
        className={cn("px-3 py-2.5 font-mono text-[13px] sm:px-[18px]", props.dim && "text-muted-foreground")}
      >
        {props.lark}
      </td>
      <td className="text-center">
        <Icon aria-label={props.label} className="inline size-4 stroke-[1.75] text-muted-foreground" />
      </td>
      <td
        className={cn(
          "px-3 py-2.5 sm:px-[18px]",
          props.dim ? "font-normal text-muted-foreground" : "font-medium",
        )}
      >
        {props.mandor}
      </td>
    </tr>
  );
}

const LOOP: { icon: LucideIcon; label: string; tone: string; text: string }[] = [
  {
    icon: MessageSquareText,
    label: "Reviewer comments in Lark",
    tone: "text-status-waiting",
    text: "The task moves to Waiting Fix with a comment on the record.",
  },
  {
    icon: Timer,
    label: "Quiet period",
    tone: "text-status-waiting",
    text: "Mandor waits about two minutes so the reviewer can finish writing.",
  },
  {
    icon: ShieldCheck,
    label: "Trusted comments forwarded",
    tone: "text-status-ok",
    text: "From assignees, the reporter, and the reviewers you list per repo. Others are shown to you only.",
  },
  {
    icon: Wrench,
    label: "Fixing",
    tone: "text-status-working",
    text: "The agent applies the feedback in the same worktree and pushes to the same PR.",
  },
  {
    icon: GitPullRequest,
    label: "Back to Waiting Review",
    tone: "text-status-waiting",
    text: "Lark is updated. Nobody had to open a terminal.",
  },
];

export function ReviewLoop() {
  return (
    <Section id="fix" labelledBy="fix-title">
      <Wrap>
        <Kicker>The review loop</Kicker>
        <Heading id="fix-title">&quot;Waiting Fix&quot; no longer waits for you.</Heading>
        <Lede className="max-w-[56ch]">
          Reviewers keep working the way they do today: change the status in Lark and leave a comment on the
          record. Mandor handles the rest, and asks you only when a comment comes from someone it should not
          trust.
        </Lede>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {LOOP.map((s, i) => (
            <li
              key={s.label}
              className={cn(
                "relative grid content-start gap-2.5 rounded-xl border bg-card p-4",
                i < LOOP.length - 1 &&
                  "lg:after:absolute lg:after:top-7 lg:after:-right-[13px] lg:after:h-px lg:after:w-[13px] lg:after:bg-border",
              )}
            >
              <span className={cn("inline-flex items-center gap-1 text-xs font-medium", s.tone)}>
                <s.icon aria-hidden className="size-[13px] shrink-0 stroke-[1.75]" />
                <span className="text-foreground">{s.label}</span>
              </span>
              <p className="text-[13px] text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </Section>
  );
}

export function Safety() {
  return (
    <Section id="safety" alt labelledBy="safety-title">
      <Wrap className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Kicker>Safety</Kicker>
          <Heading id="safety-title">Agents write code. They don&apos;t ship it.</Heading>
          <ul className="mt-6 grid gap-3.5 text-muted-foreground [&_b]:font-semibold [&_b]:text-foreground">
            <li>
              <b>One worktree per task.</b> Agents never touch your checkout or each other&apos;s branches.
            </li>
            <li>
              <b>No merges to main, ever.</b> Mandor opens PRs; your team decides what lands.
            </li>
            <li>
              <b>
                <code className={code}>git push</code> belongs to Mandor.
              </b>{" "}
              The agent&apos;s own push is denied; pushing happens through Push &amp; create PR.
            </li>
            <li>
              <b>Sensitive files are held.</b> Changes to CI, agent config, or git hooks wait for your
              confirmation before any push.
            </li>
            <li>
              <b>Lark text is data, not instructions.</b> Titles, AC, and comments reach the agent as
              untrusted content.
            </li>
          </ul>
        </div>
        <SafetyExample />
      </Wrap>
    </Section>
  );
}

/** A static rendering of the run view: a denied push and a held CI change. */
function SafetyExample() {
  return (
    <figure className="text-[13px]">
      <figcaption className="sr-only">
        Example: the agent&apos;s own git push is denied, and a change to CI waits for confirmation.
      </figcaption>
      <div className="rounded-lg border bg-card text-xs">
        <div className="flex h-8 items-center gap-2 px-2.5 text-muted-foreground">
          <ChevronRight aria-hidden className="size-[13px] rotate-90" />
          <Wrench aria-hidden className="size-[13px]" />
          <span>Read 2 files, ran 2 commands</span>
          <span className="ml-auto inline-flex h-5 items-center gap-1 rounded-sm border px-1.5 text-[11px] font-medium text-status-failed">
            <Ban aria-hidden className="size-3" />1 denied
          </span>
        </div>
        <div className="grid min-h-[30px] grid-cols-[16px_64px_1fr] items-center gap-2 border-t px-2.5">
          <SquareTerminal aria-hidden className="size-[13px]" />
          <span className="font-mono text-[11px]">Bash</span>
          <span className="truncate font-mono text-[11px] text-muted-foreground">
            pnpm test src/lib/api/invoice
          </span>
        </div>
        <div className="border-t">
          <div className="grid min-h-[30px] grid-cols-[16px_64px_1fr_auto] items-center gap-2 px-2.5">
            <Ban aria-hidden className="size-[13px]" />
            <span className="font-mono text-[11px]">Bash</span>
            <span className="truncate font-mono text-[11px] text-muted-foreground">
              git push origin beni/pgs-1391-partial-payments
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-status-failed">
              <Ban aria-hidden className="size-[13px]" />
              Denied
            </span>
          </div>
          <div className="mx-2.5 mb-2.5 ml-[34px] rounded-sm bg-error-bg px-2 py-1.5 text-xs text-error-text">
            `git push` is run only by the daemon. Use Push &amp; create PR in Mandor.
          </div>
        </div>
      </div>
      <div
        role="note"
        className="mt-3 flex items-start gap-2.5 rounded-lg border border-[color-mix(in_oklab,var(--status-warning),transparent_55%)] bg-card px-3 py-2.5"
      >
        <ShieldAlert aria-hidden className="size-[15px] shrink-0 stroke-[1.75] text-status-warning" />
        <div>
          <div className="font-semibold">Push held: changes touch CI</div>
          <div className="text-muted-foreground">
            <span className="font-mono">.github/workflows/ci.yml</span> needs your confirmation.
          </div>
        </div>
      </div>
    </figure>
  );
}
