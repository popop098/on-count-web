import axios from "axios";
import { parse, serialize } from "cookie";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    // 1. Verify token and get userId from Chzzk API.
    const profileResponse = await fetch(
      "https://openapi.chzzk.naver.com/open/v1/users/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    ).then(r=>r.json());

    const { channelId } = profileResponse.content;

    // 2. Fetch the complete user profile from your Supabase DB
    const { data: profile, error: dbError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", channelId)
      .single();

    if (dbError || !profile) {
      console.error("Failed to find user profile in DB:", dbError);
      return res
        .status(404)
        .json({ message: "User profile not found in our database." });
    }
    console.log(profile);
    const reformatData = {
      channelId: profile.channel_id,
      channelName: profile.channel_name,
      channelImageUrl: profile.channel_image_url,
      followerCount: profile.follower_count,
      verifiedMark: profile.verified_mark,
    };

    // 3. Return the profile from the database
    res.status(200).json(reformatData);
  } catch (error) {
    // This block catches errors from the /users/me call, likely due to an expired/invalid token.
    console.error(
      "Access token expired or invalid. Forcing logout.",
      error.response?.data || error.message,
    );

    // Create expired cookies to clear them from the browser
    const accessTokenCookie = serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: -1, // Expire immediately
    });

    const refreshTokenCookie = serialize("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: -1, // Expire immediately
    });
    const userIdCookie = serialize("userId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: -1,
    });

    res.setHeader("Set-Cookie", [
      accessTokenCookie,
      refreshTokenCookie,
      userIdCookie,
    ]);

    // Respond with 401 to inform the client-side
    res
      .status(401)
      .json({ message: "Token expired, user has been logged out." });
  }
}
