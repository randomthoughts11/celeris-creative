import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Celeris Creative — AI Marketing Agency in Plano, TX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05050a",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(132,120,255,0.35), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(110,231,249,0.18), transparent 50%)",
          }}
        />
        <div style={{ display: "flex", position: "relative", fontSize: 36, fontWeight: 700, color: "#f4f4f8" }}>
          celeris<span style={{ color: "#8478ff" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: "relative", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 650,
              lineHeight: 1.05,
              color: "#f4f4f8",
              maxWidth: 900,
            }}
          >
            Growth isn&apos;t luck. It&apos;s a system.
          </div>
          <div style={{ fontSize: 26, color: "#a3a3b2", maxWidth: 720 }}>
            AI-powered growth agency — brand, web, marketing & automation.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            fontSize: 20,
            color: "#6b6b7b",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Plano, TX — Worldwide
        </div>
      </div>
    ),
    { ...size }
  );
}
