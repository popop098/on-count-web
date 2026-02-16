const DISCORD_API_BASE = "https://discord.com/api/v10";
const DEFAULT_LIMIT = 15;
const CACHE_TTL_MS = 60 * 1000;
const STALE_TTL_MS = 10 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8 * 1000;
const DEFAULT_SUPPORT_SERVER_ID = "1425092871752519873";
const DEFAULT_NOTICE_CHANNEL_ID = "1425092873170190438";
const DEFAULT_FOLLOW_URL = "https://discord.gg/p2UnyUXU7P";

function getCacheStore() {
  if (!globalThis.__onCountNoticeCache) {
    globalThis.__onCountNoticeCache = {
      data: null,
      etag: null,
      lastModified: null,
      expiresAt: 0,
      staleUntil: 0,
      updatedAt: 0,
      inflightPromise: null,
      inflightStartedAt: 0,
    };
  }
  return globalThis.__onCountNoticeCache;
}

function embedToText(embed) {
  if (!embed) return "";

  const lines = [];
  if (embed.title) lines.push(embed.title);
  if (embed.description) lines.push(embed.description);

  if (Array.isArray(embed.fields)) {
    for (const field of embed.fields) {
      if (field?.name) lines.push(field.name);
      if (field?.value) lines.push(field.value);
    }
  }

  if (embed.footer?.text) lines.push(embed.footer.text);
  if (embed.author?.name) lines.push(embed.author.name);

  return lines.join("\n").trim();
}

function parseDiscordMessage(message) {
  const baseText =
    typeof message.content === "string" ? message.content.trim() : "";

  const embedText = Array.isArray(message.embeds)
    ? message.embeds.map(embedToText).filter(Boolean).join("\n\n").trim()
    : "";

  const attachmentText = Array.isArray(message.attachments)
    ? message.attachments
        .map((file) => file?.url)
        .filter(Boolean)
        .join("\n")
    : "";

  const mergedText = [baseText, embedText, attachmentText]
    .filter(Boolean)
    .join("\n\n")
    .trim();

  const firstLine = mergedText.split("\n").find((line) => line.trim());

  return {
    id: message.id,
    title: firstLine || message.author?.username || "공지사항",
    description: mergedText || "(메시지 내용이 비어있습니다)",
    rawText: mergedText || "(메시지 내용이 비어있습니다)",
    url: `https://discord.com/channels/${message.guild_id}/${message.channel_id}/${message.id}`,
    authorName:
      message.author?.global_name || message.author?.username || "on-count",
    createdAt: message.timestamp,
    pinned: Boolean(message.pinned),
    messageType: message.type,
  };
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchNoticesFromDiscord({ token, channelId, limit, cache }) {
  const headers = {
    Authorization: `Bot ${token}`,
    "Content-Type": "application/json",
  };

  if (cache.etag) headers["If-None-Match"] = cache.etag;
  if (cache.lastModified) headers["If-Modified-Since"] = cache.lastModified;

  const resp = await fetchWithTimeout(
    `${DISCORD_API_BASE}/channels/${channelId}/messages?limit=${limit}`,
    { headers },
    FETCH_TIMEOUT_MS,
  );

  if (resp.status === 304) {
    cache.expiresAt = Date.now() + CACHE_TTL_MS;
    cache.staleUntil = Date.now() + STALE_TTL_MS;
    return { status: "not-modified", notices: cache.data || [] };
  }

  if (resp.status === 429) {
    const retryAfterHeader = Number(resp.headers.get("retry-after") || 0);
    const rateData = await resp.json().catch(() => ({}));
    const retryAfterMs = Math.ceil(
      (retryAfterHeader > 0
        ? retryAfterHeader
        : Number(rateData?.retry_after || 1)) * 1000,
    );

    cache.expiresAt = Date.now() + Math.max(retryAfterMs, CACHE_TTL_MS);

    if (cache.data) {
      return { status: "rate-limited-stale", notices: cache.data };
    }

    throw new Error("Discord API rate limited and no cached data available.");
  }

  if (!resp.ok) {
    const discordError = await resp.text().catch(() => "");
    throw new Error(
      `Discord API request failed with status ${resp.status}: ${discordError}`,
    );
  }

  const messages = await resp.json();
  const notices = Array.isArray(messages)
    ? messages.map(parseDiscordMessage).filter((item) => item.id)
    : [];

  cache.data = notices;
  cache.etag = resp.headers.get("etag");
  cache.lastModified = resp.headers.get("last-modified");
  cache.updatedAt = Date.now();
  cache.expiresAt = Date.now() + CACHE_TTL_MS;
  cache.staleUntil = Date.now() + STALE_TTL_MS;

  return { status: "updated", notices };
}

async function fetchNoticesWithDedup({ token, channelId, limit, cache }) {
  const now = Date.now();
  if (
    cache.inflightPromise &&
    now - cache.inflightStartedAt < FETCH_TIMEOUT_MS + 2000
  ) {
    return cache.inflightPromise;
  }

  cache.inflightStartedAt = now;
  cache.inflightPromise = fetchNoticesFromDiscord({
    token,
    channelId,
    limit,
    cache,
  }).finally(() => {
    cache.inflightPromise = null;
  });

  return cache.inflightPromise;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const discordBotToken = process.env.DISCORD_BOT_TOKEN;
  const supportServerId =
    process.env.DISCORD_SUPPORT_SERVER_ID || DEFAULT_SUPPORT_SERVER_ID;
  const noticeChannelId =
    process.env.DISCORD_NOTICE_CHANNEL_ID || DEFAULT_NOTICE_CHANNEL_ID;
  const followUrl = process.env.DISCORD_FOLLOW_URL || DEFAULT_FOLLOW_URL;
  const limit = Math.max(
    1,
    Math.min(Number(req.query.limit || DEFAULT_LIMIT), 50),
  );

  if (!discordBotToken) {
    return res.status(503).json({
      message: "DISCORD_BOT_TOKEN is not configured.",
      followUrl,
      notices: [],
    });
  }

  const cache = getCacheStore();
  const now = Date.now();

  try {
    if (cache.data && cache.expiresAt > now) {
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=300, stale-if-error=600",
      );
      return res.status(200).json({
        serverId: supportServerId,
        channelId: noticeChannelId,
        followUrl,
        source: "memory-cache",
        updatedAt: cache.updatedAt,
        notices: cache.data,
      });
    }

    const result = await fetchNoticesWithDedup({
      token: discordBotToken,
      channelId: noticeChannelId,
      limit,
      cache,
    });

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300, stale-if-error=600",
    );
    return res.status(200).json({
      serverId: supportServerId,
      channelId: noticeChannelId,
      followUrl,
      source: result.status,
      updatedAt: cache.updatedAt,
      notices: result.notices,
    });
  } catch (error) {
    if (cache.data && cache.staleUntil > now) {
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=300, stale-if-error=600",
      );
      return res.status(200).json({
        serverId: supportServerId,
        channelId: noticeChannelId,
        followUrl,
        source: "stale-fallback",
        updatedAt: cache.updatedAt,
        notices: cache.data,
      });
    }

    return res.status(500).json({
      message: "Failed to load notices from Discord.",
      error: error instanceof Error ? error.message : "Unknown error",
      followUrl,
      notices: [],
    });
  }
}
