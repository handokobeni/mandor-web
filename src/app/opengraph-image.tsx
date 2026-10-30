import { ImageResponse } from "next/og";

export const alt = "Mandor: run a crew of Claude Code agents from one board, synced with Lark Base";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse cannot read CSS variables; these are the :root tokens of globals.css.
const BG = "#12110e";
const FG = "#d4c5a9";
const PRIMARY = "#c8a97e";
const MUTED = "#988b74";

function Bar({ left, width }: { left: number; width: number }) {
  return <div style={{ marginLeft: left, width, height: 22, borderRadius: 6, background: PRIMARY }} />;
}

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: BG,
        color: FG,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Bar left={0} width={120} />
          <Bar left={36} width={84} />
          <Bar left={0} width={52} />
        </div>
        <div style={{ fontSize: 56, fontWeight: 600 }}>Mandor</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1.5 }}>
          Run a crew of Claude Code agents from one board.
        </div>
        <div style={{ fontSize: 30, color: MUTED }}>
          Synced both ways with Lark Base. Every agent opens a PR; none merges to main.
        </div>
      </div>
    </div>,
    size,
  );
}
