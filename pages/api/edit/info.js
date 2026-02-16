import { supabase } from "@/lib/supabaseClient";

export default async function EditInfo(req, res) {
  const { method } = req;
  const userId = req.cookies.userId;
  let body = req.body || {};

  if (typeof req.body === "string") {
    try {
      body = JSON.parse(req.body || "{}");
    } catch {
      return res.status(400).send("잘못된 요청 본문입니다.");
    }
  }
  const { grantType, isPublic, channelId, followersCount } = body;

  if (!userId) {
    return res.status(401).send("로그인이 필요합니다.");
  }

  if (!channelId || channelId !== userId) {
    return res.status(403).send("본인 계정만 수정할 수 있습니다.");
  }

  switch (method) {
    case "PATCH":
      switch (grantType) {
        case "change_public": {
          if (typeof isPublic !== "boolean") {
            return res.status(400).send("잘못된 공개 상태 값입니다.");
          }

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
          if (!Number.isFinite(Number(followersCount))) {
            return res.status(400).send("잘못된 팔로워 수 값입니다.");
          }

          const { error: updateProfileFollowersErr } = await supabase
            .from("profiles")
            .update({
              follower_count: Number(followersCount),
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
