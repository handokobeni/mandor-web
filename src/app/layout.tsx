import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
  // Latin subset only: the page is English. Two files at the same weight
  // without unicode-range would make the browser use the last one for all text.
  src: "./fonts/SpaceGrotesk-latin.woff2",
  weight: "400 600",
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-latin.woff2",
  weight: "400 600",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description =
  "Mandor puts every Claude Code agent on one kanban board, synced both ways with Lark Base. Each agent works in its own git worktree, opens a PR, and never merges to main. Early access.";

export const metadata: Metadata = {
  title: "Mandor · Run a crew of Claude Code agents from one board",
  description,
  openGraph: {
    title: "Mandor · Run a crew of Claude Code agents from one board",
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#12110e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
