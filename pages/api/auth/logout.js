// pages/api/auth/logout.js

import { serialize } from "cookie";

export default async function handler(_req, res) {
  // accessToken 쿠키를 만료시켜 삭제
  const accessTokenCookie = serialize("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: -1, // 즉시 만료
    path: "/",
  });

  // refreshToken 쿠키를 만료시켜 삭제
  const refreshTokenCookie = serialize("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: -1, // 즉시 만료
    path: "/",
  });
  const userIdCookie = serialize("userId", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    path: "/",
    maxAge: -1,
  });
  const oauthStateCookie = serialize("oauthState", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    path: "/",
    maxAge: -1,
  });

  res.setHeader("Set-Cookie", [
    accessTokenCookie,
    refreshTokenCookie,
    userIdCookie,
    oauthStateCookie,
  ]);

  // 참고: 공식 문서의 'Access Token 삭제' API를 호출하여
  // 치지직 서버에서도 토큰을 무효화하는 로직을 추가하면 더 안전합니다.

  // 로그아웃 후 메인 페이지로 리디렉션
  res.redirect("/");
}
