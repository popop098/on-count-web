import buzzk from "buzzk";

buzzk.login(process.env.CHZZK_NID_AUT, process.env.CHZZK_NID_SES);
export default async function handler(req, res) {
  const { q } = req.query;
  return res.status(200).json(Object.values(await buzzk.channel.search(q)));
}
