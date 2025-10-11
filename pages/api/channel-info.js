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

    let getChannelResp;
    if (error) {
      getChannelResp = await getChannelsInfo(channelid);
      if (getChannelResp.data?.length === 0)
        return res.status(404).send("No channel found");
      return res.status(200).json((getChannelResp.data || getChannelResp)[0]);
    }
    const { follower_count, channel_image_url, verified_mark, is_public } =
      profile;
    switch (mode) {
      case "followers": {
        const getChannelResp = await getChannelsInfo(channelid);
        if ((getChannelResp.data || getChannelResp).length === 0)
          return res.status(404).send("No channel found");
        const { followerCount, channelName } = (getChannelResp.data || getChannelResp)[0];
        return res.status(200).json({
          dbFollowerCount: follower_count,
          currFollowerCount: followerCount,
          isPublic: is_public,
          verifiedMark: verified_mark,
          channelImageUrl: channel_image_url,
          channelName: channelName,
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
