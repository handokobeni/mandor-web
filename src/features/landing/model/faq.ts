/** Questions developers ask first: shown on the page and as FAQPage structured data. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "Does Mandor need an Anthropic API key?",
    a: "No. Mandor starts the Claude Code CLI unmodified, using the subscription you are already logged in with.",
  },
  {
    q: "Will an agent ever merge to main?",
    a: "No. Each task gets its own branch and worktree. Mandor pushes that branch and opens a PR. Merging is always a person on your team.",
  },
  {
    q: "Can I drag cards between columns?",
    a: "No, on purpose. Columns follow Task Status in Lark. Cards move when you press Start or Push & create PR, or when someone changes the status in Lark.",
  },
  {
    q: "What if two developers start the same task?",
    a: 'One claim wins. The other person sees "lost the claim" and nothing is created on their machine. An inactive claim can be taken over later.',
  },
  {
    q: "Does it run on macOS or native Windows?",
    a: "Not yet. Today the daemon runs on Linux, or inside WSL on Windows. Other platforms are not verified.",
  },
  {
    q: "Where does my code go?",
    a: "Agents run on your machine, in worktrees next to your repo. Code goes where Claude Code itself sends it, and to GitHub when you push.",
  },
  {
    q: "Is Mandor affiliated with Anthropic, Lark, or GitHub?",
    a: "No. Mandor is an independent tool that works with Claude Code, Lark Base, and the GitHub CLI.",
  },
];
