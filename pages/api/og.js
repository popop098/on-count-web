import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "On-Count";
  const description =
    searchParams.get("description") || "Real-time streamer follower tracking";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#111827",
        color: "#ffffff",
        padding: "64px",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 800, marginBottom: 18 }}>
        {title}
      </div>
      <div style={{ fontSize: 34, color: "#d1d5db" }}>{description}</div>
      <div style={{ marginTop: 30, fontSize: 24, color: "#93c5fd" }}>
        on-count.kr
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "cache-control":
          "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    },
  );
}
