// The hero demo walks one task through the real Mandor loop:
// Start → Working → Waiting for you → Push & create PR → Review →
// Waiting Fix → Fixing → back to Review. Other agents keep working.

export type RunState =
  "preparing" | "running" | "awaiting_dev" | "publishing" | "in_review_loop" | "wf_quiet" | "wf_running";

export type Column = "todo" | "prog" | "review";

export type Hint =
  "try" | "claimed" | "working" | "your-turn" | "panel" | "pushing" | "pr" | "quiet" | "fixing" | "done";

export interface MyTask {
  col: Column;
  run: RunState | null;
  pr: number | null;
}

export interface DemoState {
  /** 0 = not started, 1–5 = the five steps, 6 = finished. */
  step: number;
  mine: MyTask;
  panelOpen: boolean;
  /** Seconds left in the (shortened) quiet period. */
  quiet: number;
  lark: string;
  hint: Hint;
}

export type DemoAction =
  | { type: "start" }
  | { type: "working" }
  | { type: "awaitDev" }
  | { type: "open" }
  | { type: "close" }
  | { type: "push" }
  | { type: "prOpened" }
  | { type: "fixRequested" }
  | { type: "quietTick" }
  | { type: "fixing" }
  | { type: "fixed" }
  | { type: "reset" };

export const MY_KEY = "PGS-1402";
export const MY_PR = 418;
const QUIET_SECONDS = 5;

export const initialDemo: DemoState = {
  step: 0,
  mine: { col: "todo", run: null, pr: null },
  panelOpen: false,
  quiet: 0,
  lark: "Sprint Tasks synced",
  hint: "try",
};

export function demoReducer(s: DemoState, a: DemoAction): DemoState {
  switch (a.type) {
    case "start":
      return {
        ...s,
        step: 1,
        mine: { ...s.mine, col: "prog", run: "preparing" },
        lark: `${MY_KEY} → In Progress`,
        hint: "claimed",
      };
    case "working":
      return { ...s, step: 2, mine: { ...s.mine, run: "running" }, hint: "working" };
    case "awaitDev":
      return { ...s, step: 3, mine: { ...s.mine, run: "awaiting_dev" }, hint: "your-turn" };
    case "open":
      return s.mine.run === "awaiting_dev" ? { ...s, panelOpen: true, hint: "panel" } : s;
    case "close":
      return { ...s, panelOpen: false };
    case "push":
      return { ...s, step: 4, panelOpen: false, mine: { ...s.mine, run: "publishing" }, hint: "pushing" };
    case "prOpened":
      return {
        ...s,
        mine: { col: "review", run: "in_review_loop", pr: MY_PR },
        lark: `${MY_KEY} → Waiting Review`,
        hint: "pr",
      };
    case "fixRequested":
      return {
        ...s,
        step: 5,
        mine: { ...s.mine, col: "prog", run: "wf_quiet" },
        quiet: QUIET_SECONDS,
        lark: `Sari moved ${MY_KEY} → Waiting Fix`,
        hint: "quiet",
      };
    case "quietTick":
      return { ...s, quiet: Math.max(0, s.quiet - 1) };
    case "fixing":
      return {
        ...s,
        mine: { ...s.mine, run: "wf_running" },
        lark: `${MY_KEY} → In Progress`,
        hint: "fixing",
      };
    case "fixed":
      return {
        ...s,
        step: 6,
        mine: { ...s.mine, col: "review", run: "in_review_loop" },
        lark: `${MY_KEY} → Waiting Review`,
        hint: "done",
      };
    case "reset":
      return initialDemo;
  }
}

export interface FollowUp {
  /** Delay in milliseconds after the triggering action. */
  after: number;
  action: DemoAction;
}

/**
 * The automatic steps an action sets off, as timers. The quiet period
 * counts down one second at a time, then the fix starts.
 */
export function followUps(a: DemoAction, after: DemoState = initialDemo): FollowUp[] {
  switch (a.type) {
    case "start":
      return [
        { after: 1600, action: { type: "working" } },
        { after: 4200, action: { type: "awaitDev" } },
      ];
    case "push":
      return [
        { after: 1400, action: { type: "prOpened" } },
        { after: 4600, action: { type: "fixRequested" } },
      ];
    case "fixRequested":
      return [{ after: 1000, action: { type: "quietTick" } }];
    case "quietTick":
      return after.quiet > 0
        ? [{ after: 1000, action: { type: "quietTick" } }]
        : [{ after: 0, action: { type: "fixing" } }];
    case "fixing":
      return [{ after: 2600, action: { type: "fixed" } }];
    default:
      return [];
  }
}
