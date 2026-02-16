import { supabase } from "@/lib/supabaseClient";
import { getChannelsInfo } from "@/tools/fetchTools";
export default async function handler(req, res) {
  const { method } = req;
  const { fcm_token, channel_id, topic } = req.body || {};
  const { need_more_info } = req.query;
  const curr_user_id = req.cookies.userId;

  const isInvalidTopic =
    typeof topic !== "string" || topic.length < 1 || topic.length > 120;
  const isInvalidChannelId =
    typeof channel_id !== "string" || channel_id.length < 1 || channel_id.length > 100;

  try {
    if (method === "POST") {
      if (!curr_user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (isInvalidTopic || isInvalidChannelId || typeof fcm_token !== "string") {
        return res.status(400).json({ message: "Invalid request payload" });
      }

      const { error } = await supabase.from("subscribes").insert({
        fcm_token: fcm_token,
        channel_id: channel_id,
        user_id: curr_user_id,
        topic: topic,
      });
      return res.status(200).json(error);
    } else if (method === "DELETE") {
      if (!curr_user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (isInvalidTopic || isInvalidChannelId) {
        return res.status(400).json({ message: "Invalid request payload" });
      }

      // const {error:getDataErr, data} = await supabase.from("subscribes").select("*").eq("topic",topic)
      // let id;
      // if(getDataErr) {
      //     return res.status(400).json(getDataErr);
      // }
      // id = data.data.filter((item) => item.user_id === user_id);
      const deleteDataErr = await supabase
        .from("subscribes")
        .delete()
        .match({ channel_id: channel_id, user_id: curr_user_id, topic: topic });
      if (deleteDataErr.status !== 204) {
        console.error(deleteDataErr);
        return res.status(400).json(deleteDataErr);
      }
      return res.status(200).json({});
    } else if (method === "GET") {
      if (!curr_user_id) {
        return res.status(401).json({});
      }
      const { data: subscribedData, error: subscribedError } = await supabase
        .from("subscribes")
        .select("channel_id, user_id, id")
        .eq("user_id", curr_user_id);
      if (subscribedError) {
        return res.status(400).json(subscribedError);
      }
      if (need_more_info === "y") {
        const channelIdsArray = subscribedData.map((item) => item.channel_id);
        // 2. join()을 사용하여 배열의 요소들을 쉼표와 공백으로 연결하여 문자열로 변환
        const resultString = channelIdsArray.join(",");
        const resp = await getChannelsInfo(resultString);
        return res.status(200).json(resp.data);
      }
      return res.status(200).json(subscribedData);
    }
    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
}
