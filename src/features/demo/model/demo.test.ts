import { describe, expect, it } from "vitest";
import { demoReducer, followUps, initialDemo, type DemoAction, type DemoState } from "./demo";

function run(actions: DemoAction[], from: DemoState = initialDemo): DemoState {
  return actions.reduce(demoReducer, from);
}

describe("demo loop", () => {
  it("starts in Todo with the replay-ready hint", () => {
    expect(initialDemo).toMatchObject({ step: 0, mine: { col: "todo", run: null }, hint: "try" });
  });

  it("Start claims the task, moves it to In Progress, and updates Lark", () => {
    const s = run([{ type: "start" }]);
    expect(s).toMatchObject({
      step: 1,
      mine: { col: "prog", run: "preparing" },
      lark: "PGS-1402 → In Progress",
    });
    expect(followUps({ type: "start" }).map((f) => f.action.type)).toEqual(["working", "awaitDev"]);
  });

  it("the agent works, then waits for the developer", () => {
    const s = run([{ type: "start" }, { type: "working" }, { type: "awaitDev" }]);
    expect(s).toMatchObject({ step: 3, mine: { run: "awaiting_dev" }, hint: "your-turn" });
  });

  it("Open shows the panel only while the agent waits", () => {
    expect(run([{ type: "open" }]).panelOpen).toBe(false);
    const s = run([{ type: "start" }, { type: "awaitDev" }, { type: "open" }]);
    expect(s.panelOpen).toBe(true);
    expect(run([{ type: "close" }], s).panelOpen).toBe(false);
  });

  it("Push closes the panel, opens PR #418, and moves Lark to Waiting Review", () => {
    const waiting = run([{ type: "start" }, { type: "awaitDev" }, { type: "open" }]);
    const pushing = run([{ type: "push" }], waiting);
    expect(pushing).toMatchObject({ step: 4, panelOpen: false, mine: { run: "publishing" } });
    const opened = run([{ type: "prOpened" }], pushing);
    expect(opened).toMatchObject({
      mine: { col: "review", run: "in_review_loop", pr: 418 },
      lark: "PGS-1402 → Waiting Review",
    });
    expect(followUps({ type: "push" }).map((f) => f.action.type)).toEqual(["prOpened", "fixRequested"]);
  });

  it("Waiting Fix counts down the quiet period, fixes, and returns to review", () => {
    let s = run([{ type: "fixRequested" }]);
    expect(s).toMatchObject({ step: 5, mine: { col: "prog", run: "wf_quiet" }, quiet: 5 });
    expect(s.lark).toBe("Sari moved PGS-1402 → Waiting Fix");
    s = run([{ type: "quietTick" }], s);
    expect(s.quiet).toBe(4);
    expect(followUps({ type: "quietTick" }, s)[0]?.action.type).toBe("quietTick");
    s = run([{ type: "quietTick" }, { type: "quietTick" }, { type: "quietTick" }, { type: "quietTick" }], s);
    expect(s.quiet).toBe(0);
    expect(followUps({ type: "quietTick" }, s)[0]?.action.type).toBe("fixing");
    s = run([{ type: "fixing" }, { type: "fixed" }], s);
    expect(s).toMatchObject({ step: 6, mine: { col: "review", run: "in_review_loop" }, hint: "done" });
  });

  it("Reset returns to the start", () => {
    const done = run([{ type: "start" }, { type: "awaitDev" }, { type: "push" }, { type: "fixRequested" }]);
    expect(run([{ type: "reset" }], done)).toEqual(initialDemo);
  });
});
