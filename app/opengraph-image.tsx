import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./lib/site";

// Link preview shown when the portfolio is shared on LinkedIn, Slack, WhatsApp…
export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const profile = await readFile(join(process.cwd(), "public", "profile.png"));
  const profileSrc = `data:image/png;base64,${profile.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          backgroundColor: "#0F0E16",
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(0,229,134,0.22), rgba(15,14,22,0) 45%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 26,
              color: "#00E586",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#00E586" }} />
            Open to work
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 44, color: "#00E586", marginTop: 18 }}>{site.role}</div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", marginTop: 28 }}>
            Figma → React / Next.js · Responsive · Accessible
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profileSrc}
          alt=""
          width={380}
          height={380}
          style={{ borderRadius: 999, boxShadow: "0 0 90px rgba(0,229,134,0.45)" }}
        />
      </div>
    ),
    size,
  );
}
