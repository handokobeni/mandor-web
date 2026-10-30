import type { RunState } from "./demo";

export type Tone = "working" | "attention" | "waiting";

export interface RunInfo {
  label: string;
  tone: Tone;
  /** The icon spins while the agent is busy. */
  busy?: boolean;
}

export const RUNS: Record<RunState, RunInfo> = {
  preparing: { label: "Preparing", tone: "working" },
  running: { label: "Working", tone: "working", busy: true },
  awaiting_dev: { label: "Waiting for you", tone: "attention" },
  publishing: { label: "Creating PR", tone: "working" },
  in_review_loop: { label: "Done, waiting for review", tone: "waiting" },
  wf_quiet: { label: "Quiet period", tone: "waiting" },
  wf_running: { label: "Fixing", tone: "working" },
};

export interface OtherTask {
  key: string;
  title: string;
  col: "todo" | "prog" | "review";
  run?: RunState;
  pr?: number;
  branch?: string;
  /** Why the card can't be started, with the readiness value in code. */
  blocked?: { text: string; code: string };
}

/** Teammates' cards that keep moving on their own. */
export const OTHERS: OtherTask[] = [
  {
    key: "PGS-1405",
    title: "Bulk approve leave requests from the team calendar",
    col: "todo",
    blocked: { text: "not ready, Development Readiness", code: "Review AC By PM" },
  },
  {
    key: "PGS-1388",
    title: "Fix rounding in overtime pay for half-hour shifts",
    col: "prog",
    run: "running",
    branch: "beni/pgs-1388-overtime-rounding",
  },
  {
    key: "PGS-1380",
    title: "Payroll summary: group totals by cost center",
    col: "review",
    run: "in_review_loop",
    pr: 412,
    branch: "beni/pgs-1380-cost-center",
  },
];

export const MY_TITLE = "Invoice list: filter by payment status and date range";
export const MY_BRANCH = "beni/pgs-1402-invoice-filter";
