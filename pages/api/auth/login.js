import crypto from "crypto";
import { serialize } from "cookie";

export default function handler(_req, res) {
  const state = crypto.randomBytes(32).toString("hex");
  const clientId = process.env.CHZZK_CLIENT_ID;
  const redirectUri = process.env.CHZZK_REDIRECT_URI;

  const stateCookie = serialize("oauthState", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  // 치지직 인증 코드 요청 URL
  const chzzkLoginUrl = `https://chzzk.naver.com/account-interlock?clientId=${clientId}&redirectUri=${redirectUri}&state=${state}`;

  res.setHeader("Set-Cookie", stateCookie);
  return res.status(200).send(chzzkLoginUrl);
}
