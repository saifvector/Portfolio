import { ImageResponse } from "next/og";

export const alt = "Saif — Software Developer & AI/DS Student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#f5f5f5",
        padding: 80,
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#a1a1aa", textTransform: "uppercase" }}>
        Shaik Saifur Rahman
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05 }}>
        <span>I build intelligent systems</span>
        <span style={{ color: "#c9a66b" }}>and digital experiences.</span>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>
        Software Developer · AI &amp; Data Science Student · Aspiring Game Developer
      </div>
    </div>,
    size,
  );
}
