import { upsertProfileSnapshot } from "@/lib/profileSync";
import { supabase } from "@/lib/supabaseClient";
import { getChannelsInfo } from "@/tools/fetchTools";

export default async function handler(req, res) {
  const { mode, channelid } = req.query;
  if (!channelid)
    return res.status(403).send("필수 파라미터가 존재하지 않습니다.");

  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", channelid)
      .single();

    if (error) {
      const getChannelResp = await getChannelsInfo(channelid);
      if (getChannelResp.data.length === 0)
        return res.status(404).send("No channel found");

      const channel = getChannelResp.data[0];
      try {
        await upsertProfileSnapshot({ channel, profile: null });
      } catch (syncError) {
        console.error("Failed to save new channel profile:", syncError);
      }

      return res.status(200).json(channel);
    }

    const { follower_count, channel_image_url, verified_mark, is_public } =
      profile;

    switch (mode) {
      case "followers": {
        const getChannelResp = await getChannelsInfo(channelid);
        if (getChannelResp.data.length === 0)
          return res.status(404).send("No channel found");
        const channel = getChannelResp.data[0];
        const { followerCount, channelName } = channel;

        try {
          await upsertProfileSnapshot({ channel, profile });
        } catch (syncError) {
          console.error("Failed to refresh channel snapshot:", syncError);
        }

        return res.status(200).json({
          dbFollowerCount: follower_count,
          currFollowerCount: followerCount,
          isPublic: is_public,
          verifiedMark: verified_mark,
          channelImageUrl: channel_image_url,
          channelName,
        });
      }
      default:
        return res.status(200).json({
          dbFollowerCount: follower_count,
          currFollowerCount: null,
          isPublic: is_public,
          verifiedMark: verified_mark,
          channelImageUrl: channel_image_url,
        });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
