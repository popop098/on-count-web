import buzzk from "buzzk";
import { ensureProfilesExist } from "@/lib/profileSync";

buzzk.login(process.env.CHZZK_NID_AUT, process.env.CHZZK_NID_SES);
export default async function handler(req, res) {
  const { q } = req.query;
  const searchResult = Object.values((await buzzk.channel.search(q)) || {});

  try {
    await ensureProfilesExist(searchResult);
  } catch (error) {
    console.error("Failed to sync profiles from search:", error);
  }

  return res.status(200).json(searchResult);
}
