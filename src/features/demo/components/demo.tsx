"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Hand } from "@/components/ui";
import {
  demoReducer,
  followUps,
  initialDemo,
  MY_KEY,
  type DemoAction,
  type DemoState,
  type MyTask,
} from "../model/demo";
import { MY_BRANCH, MY_TITLE, OTHERS, type OtherTask } from "../model/runs";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { AgentRow } from "./agent-row";
import { DemoHint } from "./demo-hint";
import { DemoPanel } from "./demo-panel";
import { TaskCard, type CardData } from "./task-card";

const COLUMNS = [
  { id: "todo", label: "Todo" },
  { id: "prog", label: "In Progress" },
  { id: "review", label: "Review" },
] as const;

const STEPS = [
  "Start from Lark",
  "Agent works in its worktree",
  "Your turn",
  "PR opened, Lark updated",
  "Review fixes run themselves",
];

function otherCard(t: OtherTask): CardData {
  return { ...t, run: t.run ?? null, ready: t.col === "todo" && !t.blocked };
}

function myCard(m: MyTask): CardData {
  return { key: MY_KEY, title: MY_TITLE, run: m.run, pr: m.pr, branch: MY_BRANCH, ready: m.col === "todo" };
}

/**
 * The playable hero board. Timers drive the automatic steps; reduced
 * motion shortens them and stops the pulses.
 */
export function Demo() {
  const reduceMotion = useReducedMotion();
  const [{ state, last }, setDemo] = useState<{ state: DemoState; last: DemoAction | null }>({
    state: initialDemo,
    last: null,
  });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function act(action: DemoAction) {
    setDemo((d) => ({ state: demoReducer(d.state, action), last: action }));
  }

  // Each action sets off its automatic follow-ups as timers. They are not
  // cleared when the next action lands (the steps overlap), only on reset
  // and unmount. Reduced motion is read when the timers are set.
  const schedule = useEffectEvent((action: DemoAction, after: DemoState) => {
    if (action.type === "reset") {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      return;
    }
    for (const f of followUps(action, after)) {
      const delay = reduceMotion ? Math.min(f.after, 300) : f.after;
      timers.current.push(setTimeout(() => act(f.action), delay));
    }
  });
  useEffect(() => {
    if (last) schedule(last, state);
  }, [last, state]);
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const { mine } = state;
  const waiting = mine.run === "awaiting_dev";
  const quietLabel = mine.run === "wf_quiet" ? `Quiet period · 0:0${state.quiet}` : undefined;
  const agents = [
    ...(mine.run ? [{ key: MY_KEY, title: MY_TITLE, run: mine.run }] : []),
    ...OTHERS.flatMap((t) => (t.run ? [{ key: t.key, title: t.title, run: t.run }] : [])),
  ].sort((a, b) => Number(b.run === "awaiting_dev") - Number(a.run === "awaiting_dev"));

  return (
    <div>
      <div
        aria-label="Interactive Mandor demo"
        role="region"
        className="relative overflow-hidden rounded-3xl border bg-background text-[13px] leading-normal shadow-[var(--shadow-pop-value),0_0_0_1px_color-mix(in_oklab,var(--primary),transparent_88%)]"
      >
        <div className="flex h-[38px] items-center gap-2.5 border-b border-sidebar-border bg-sidebar px-3">
          <BrandMarkSmall />
          <b className="shrink-0 font-semibold">Mandor</b>
          <span className="hidden items-center gap-1.5 text-xs whitespace-nowrap text-muted-foreground sm:inline-flex">
            <span aria-hidden className="size-[7px] rounded-full bg-status-ok" />
            Daemon connected
          </span>
          {waiting && (
            <span className="ml-auto inline-flex h-[22px] shrink-0 items-center gap-1.5 rounded-lg bg-status-attention px-2 text-xs font-semibold whitespace-nowrap text-status-attention-foreground">
              <Hand aria-hidden className="size-[13px]" />1 waiting for you
            </span>
          )}
          <span
            key={state.lark}
            aria-live="polite"
            className={cn(
              "min-w-0 truncate font-mono text-[11px] whitespace-nowrap text-muted-foreground",
              state.lark !== initialDemo.lark && "animate-lark-flash",
              waiting ? "ml-2" : "ml-auto",
            )}
          >
            Lark · {state.lark}
          </span>
        </div>
        <div className="grid min-h-[420px] grid-cols-[minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside
            aria-label="Active agents"
            className="hidden border-r border-sidebar-border bg-sidebar px-2 py-2.5 lg:block"
          >
            <div className="px-2 pt-0.5 pb-2 text-[11px] font-medium tracking-[0.07em] text-muted-foreground uppercase">
              Active agents
            </div>
            <ul>
              {agents.map((a) => (
                <AgentRow
                  key={a.key}
                  taskKey={a.key}
                  title={a.title}
                  run={a.run}
                  reduceMotion={reduceMotion}
                />
              ))}
            </ul>
          </aside>
          <div className="grid min-w-0 grid-cols-[repeat(3,240px)] gap-2.5 overflow-x-auto p-3 sm:grid-cols-3">
            {COLUMNS.map((c) => {
              const others = OTHERS.filter((t) => t.col === c.id).map(otherCard);
              const here = mine.col === c.id;
              const card = here && (
                <TaskCard
                  key={MY_KEY}
                  task={myCard(mine)}
                  mine
                  quietLabel={quietLabel}
                  reduceMotion={reduceMotion}
                  onStart={mine.col === "todo" ? () => act({ type: "start" }) : undefined}
                  onOpen={waiting ? () => act({ type: "open" }) : undefined}
                />
              );
              return (
                <section
                  key={c.id}
                  aria-label={c.label}
                  className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-1.5 rounded-xl border border-[color-mix(in_oklab,var(--border),transparent_40%)] bg-[color-mix(in_oklab,var(--muted),var(--background)_35%)] px-2 pb-2"
                >
                  <div className="flex h-[34px] items-center gap-2 px-1 font-semibold">
                    {c.label}
                    <span className="font-mono text-[11px] font-normal text-muted-foreground">
                      {others.length + (here ? 1 : 0)}
                    </span>
                  </div>
                  {waiting && card}
                  {others.map((t) => (
                    <TaskCard key={t.key} task={t} reduceMotion={reduceMotion} />
                  ))}
                  {!waiting && card}
                </section>
              );
            })}
          </div>
        </div>
        {state.panelOpen && (
          <DemoPanel
            reduceMotion={reduceMotion}
            onClose={() => act({ type: "close" })}
            onPush={() => act({ type: "push" })}
          />
        )}
      </div>
      <ol aria-label="Demo steps" className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const on = state.step === n;
          const done = state.step > n;
          return (
            <li
              key={label}
              aria-current={on ? "step" : undefined}
              className={cn(
                "flex items-baseline gap-2 border-t-2 px-3 py-2.5 text-[13px] transition-colors duration-300",
                on && "border-primary text-foreground",
                done && "border-[color-mix(in_oklab,var(--primary),transparent_60%)] text-foreground",
                !on && !done && "text-muted-foreground",
              )}
            >
              <span className="font-mono text-[11px]">0{n}</span>
              {label}
            </li>
          );
        })}
      </ol>
      <DemoHint hint={state.hint} onReplay={() => act({ type: "reset" })} />
    </div>
  );
}

function BrandMarkSmall() {
  return (
    <span aria-hidden className="grid size-4 content-center gap-0.5">
      <i className="block h-[3px] rounded-[1px] bg-primary" />
      <i className="block h-[3px] w-[70%] justify-self-end rounded-[1px] bg-primary" />
      <i className="block h-[3px] w-[42%] rounded-[1px] bg-primary" />
    </span>
  );
}
