import { supabase } from "@/lib/supabaseClient";

export default async function EditInfo(req, res) {
  const { method } = req;
  const { grantType, isPublic, channelId, followersCount } = JSON.parse(
    req.body,
  );
  switch (method) {
    case "PATCH":
      switch (grantType) {
        case "change_public": {
          const { error: updateProfilePublicErr } = await supabase
            .from("profiles")
            .update({
              is_public: isPublic,
            })
            .eq("id", channelId);
          if (updateProfilePublicErr)
            return res.status(400).send(updateProfilePublicErr);
          return res.status(200).send("ok");
        }
        case "update_followers": {
          const { error: updateProfileFollowersErr } = await supabase
            .from("profiles")
            .update({
              follower_count: followersCount,
            })
            .eq("id", channelId);
          if (updateProfileFollowersErr)
            return res.status(400).send(updateProfileFollowersErr);
          return res.status(200).send("ok");
        }
        default:
          return res.status(400).send("잘못된 접근입니다.");
      }
    default:
      return res.status(400).send("잘못된 접근입니다.");
  }
}
