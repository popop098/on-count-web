import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

const Verified = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
  >
    <title>Verified</title>
    <path
      fill="#625bf5"
      d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
    />
  </svg>
);

export default async function handler(req) {
  const { searchParams } = new URL(req.url);

  const channelName = searchParams.get("name") || "Streamer";
  const follower = searchParams.get("follower") || "0";
  const verified = searchParams.get("verified") === "true";

  const followerText = `Followers ${Number(follower).toLocaleString()}`;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0f172a",
        color: "#fff",
        padding: "64px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 80, fontWeight: 900 }}>{channelName}</div>
        {verified && <Verified />}
      </div>

      <div style={{ fontSize: 40, color: "#cbd5e1", fontWeight: 600 }}>
        {followerText}
      </div>

      <div style={{ fontSize: 28, color: "#94a3b8" }}>
        On-Count | on-count.kr
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "cache-control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
