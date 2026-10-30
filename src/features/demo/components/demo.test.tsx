import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Demo } from "./demo";

/** Advance in small steps so effects scheduling the next timers run between them, as in a browser. */
function advance(ms: number) {
  for (let t = 0; t < ms; t += 100) {
    act(() => {
      vi.advanceTimersByTime(Math.min(100, ms - t));
    });
  }
}

// The demo steps run on timers; user-event waits on timers itself, so clicks
// go through fireEvent while the timers are faked.
describe("hero demo", () => {
  beforeEach(() => vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] }));
  afterEach(() => vi.useRealTimers());

  it("walks a task from Start to a PR and back through Waiting Fix", () => {
    render(<Demo />);
    expect(screen.getByText(/Try it: press/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(screen.getByText("Lark · PGS-1402 → In Progress")).toBeInTheDocument();

    advance(4200);
    expect(screen.getByText("1 waiting for you")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    const panel = screen.getByRole("dialog", { name: /PGS-1402/ });
    expect(within(panel).getByRole("button", { name: "Push & create PR" })).toHaveFocus();
    fireEvent.click(within(panel).getByRole("button", { name: "Push & create PR" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    advance(1400);
    expect(screen.getByText("Lark · PGS-1402 → Waiting Review")).toBeInTheDocument();
    expect(screen.getByText("#418")).toBeInTheDocument();

    advance(3200);
    expect(screen.getByText("Lark · Sari moved PGS-1402 → Waiting Fix")).toBeInTheDocument();
    // Five quiet seconds, then the fix (2.6 s); a little margin past each boundary.
    advance(5100);
    advance(2700);
    expect(screen.getByText(/Fix pushed to PR #418/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Replay" }));
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    expect(screen.getByText("Lark · Sprint Tasks synced")).toBeInTheDocument();
  });

  it("closes the panel with Escape or Close without pushing", () => {
    render(<Demo />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    advance(4200);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });
});
