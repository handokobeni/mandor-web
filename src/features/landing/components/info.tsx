import { Badge, buttonVariants, Card, CircleCheck, Clock, Plus } from "@/components/ui";
import { Heading, Kicker, Lede, Section, TickList, Wrap } from "@/components/molecules";
import { WaitlistForm } from "@/features/waitlist";
import { cn } from "@/lib/utils";
import { FAQ } from "../model/faq";

const code = "rounded-sm bg-muted px-1.5 py-px font-mono text-[0.88em]";

const REQUIREMENTS = [
  {
    title: "Claude Code, your subscription",
    text: (
      <>
        Mandor runs the Claude Code CLI as it is, logged in with your own subscription. No API key, no resold
        usage.
      </>
    ),
  },
  {
    title: "Lark Custom App + Base",
    text: (
      <>
        A Custom App with access to your Sprint Tasks table and its Acceptance Criteria table. You log in with
        Lark once.
      </>
    ),
  },
  {
    title: "GitHub CLI",
    text: (
      <>
        <code className={code}>gh</code> logged in on the machine where agents run. It opens the PRs, with a
        separate profile per repo if you like.
      </>
    ),
  },
  {
    title: "Linux, or Windows with WSL",
    text: <>The daemon runs on Linux or inside WSL on Windows. macOS is not supported yet.</>,
  },
];

export function Requirements() {
  return (
    <Section labelledBy="req-title">
      <Wrap>
        <Kicker>What you need</Kicker>
        <Heading id="req-title">Bring your own tools. Mandor brings the board.</Heading>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REQUIREMENTS.map((r) => (
            <div key={r.title} className="grid content-start gap-2 rounded-xl border p-5">
              <h3 className="text-[17px] leading-[1.3] font-semibold">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

export function Roadmap() {
  return (
    <Section id="roadmap" alt labelledBy="road-title">
      <Wrap>
        <Kicker>Roadmap</Kicker>
        <Heading id="road-title">What works today, and what is coming.</Heading>
        <div className="mt-10 grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="grid content-start gap-2.5 rounded-xl border bg-card p-[22px]">
            <Badge>
              <CircleCheck aria-hidden className="text-status-ok" />
              Release 1 · available in early access
            </Badge>
            <ul className="mt-1 grid list-disc gap-1.5 pl-[18px] text-sm">
              <li>Kanban board synced with Lark Sprint Tasks</li>
              <li>Start, chat, diff, and Push &amp; create PR per task</li>
              <li>Active agents sidebar, notifications, and tray</li>
              <li>Automatic Waiting Fix loop with trusted reviewers</li>
            </ul>
          </div>
          <div className="grid content-start gap-2.5 rounded-xl border bg-card p-[22px]">
            <Badge>
              <CircleCheck aria-hidden className="text-status-ok" />
              Release 2 · available in early access
            </Badge>
            <h3 className="text-[17px] leading-[1.3] font-semibold">AC review</h3>
            <p className="text-sm text-muted-foreground">
              Before the PR, a pass or fail check against each acceptance criterion, with browser checks in
              your own Chrome. Failing or unverified criteria hold the push until you decide.
            </p>
          </div>
          <div className="grid content-start gap-2.5 rounded-xl border border-dashed p-[22px]">
            <Badge>
              <Clock aria-hidden />
              Release 3 · in testing
            </Badge>
            <h3 className="text-[17px] leading-[1.3] font-semibold">AI Lembur</h3>
            <p className="text-sm text-muted-foreground">
              Queue ready tasks for overnight agents on a team machine, with a headless browser review, a
              usage limit per night, and draft PRs. In the morning, a report in Lark of what got done, what
              got parked, and what needs your decision.
            </p>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

export function Pricing() {
  return (
    <Section id="pricing" labelledBy="price-title">
      <Wrap>
        <Kicker>Pricing</Kicker>
        <Heading id="price-title">Early access first. Pricing before launch.</Heading>
        <div className="mt-10 grid max-w-[880px] gap-3 sm:grid-cols-2">
          <Card className="grid content-start gap-2.5 p-[26px]">
            <div className="flex items-center gap-2.5">
              <h3 className="text-[17px] leading-[1.3] font-semibold">Early access</h3>
              <Badge variant="secondary">Now</Badge>
            </div>
            <p className="text-[28px] font-semibold tracking-[-0.02em]">Invite only</p>
            <TickList
              items={[
                "Everything in Releases 1 and 2: board, agents, PRs, Waiting Fix loop, and AC review",
                "Linux, or Windows with WSL",
                "Your own Claude Code subscription, unchanged",
              ]}
            />
            <a href="#join" className={buttonVariants({ className: "mt-2.5 justify-self-start" })}>
              Join early access
            </a>
          </Card>
          <Card className="grid content-start gap-2.5 p-[26px]">
            <div className="flex items-center gap-2.5">
              <h3 className="text-[17px] leading-[1.3] font-semibold">Team</h3>
              <Badge>At launch</Badge>
            </div>
            <p className="text-[28px] font-semibold tracking-[-0.02em] text-muted-foreground">
              Pricing to be announced
            </p>
            <Lede className="mt-0">Pricing will be published before general availability.</Lede>
            <p className="mt-1.5 border-t pt-3 text-[13px] text-muted-foreground">
              In every plan you bring your own Claude Code subscription. Mandor does not resell model usage.
            </p>
          </Card>
        </div>
      </Wrap>
    </Section>
  );
}

export function Faq() {
  return (
    <Section id="faq" alt labelledBy="faq-title">
      <Wrap className="grid items-start gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
        <div>
          <Kicker>FAQ</Kicker>
          <Heading id="faq-title">Questions developers ask first.</Heading>
        </div>
        <div>
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b">
              <summary className="flex cursor-pointer list-none items-center gap-3 py-[18px] font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  aria-hidden
                  className="ml-auto size-[15px] shrink-0 stroke-[1.75] text-muted-foreground transition-transform duration-150 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[62ch] pb-[18px] text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section labelledBy="cta-title" className="sm:py-[120px]">
      <Wrap className={cn("grid justify-items-start")}>
        <Heading id="cta-title" className="text-[clamp(32px,4.6vw,52px)] tracking-[-0.03em]">
          Get your crew on one board.
        </Heading>
        <Lede>Early access is open to teams already running Claude Code on Lark Sprint Tasks.</Lede>
        <div id="join" className="w-full scroll-mt-20">
          <WaitlistForm idPrefix="final" withTeamSize />
        </div>
      </Wrap>
    </Section>
  );
}
