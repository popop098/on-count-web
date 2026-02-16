import { supabase } from "@/lib/supabaseClient";

const toProfileRow = (channel) => ({
  id: channel.channelId,
  channel_id: channel.channelId,
  channel_name: channel.channelName,
  channel_image_url: channel.channelImageUrl,
  follower_count: channel.followerCount,
  verified_mark: channel.verifiedMark,
  updated_at: new Date().toISOString(),
});

export const ensureProfilesExist = async (channels = []) => {
  const normalized = channels.filter((channel) => channel?.channelId);
  if (normalized.length === 0) return;

  const rows = normalized.map(toProfileRow);
  const { error } = await supabase
    .from("profiles")
    .insert(rows, { ignoreDuplicates: true });

  if (error) {
    throw error;
  }
};

export const upsertProfileSnapshot = async ({ channel, profile }) => {
  if (!channel?.channelId) return;

  const row = {
    ...toProfileRow(channel),
  };

  if (typeof profile?.is_public === "boolean") {
    row.is_public = profile.is_public;
  }

  const { error } = await supabase
    .from("profiles")
    .upsert(row, { onConflict: "id" });

  if (error) {
    throw error;
  }
};
