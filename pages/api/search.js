let buzzkInstance;
export default async function handler(req, res) {
  const { q } = req.query;
  if (!buzzkInstance) {
    const { default: buzzk } = await import("buzzk");
    buzzk.login(process.env.CHZZK_NID_AUT, process.env.CHZZK_NID_SES);
    buzzkInstance = buzzk;
  }
  return res.status(200).json(Object.values(await buzzkInstance.channel.search(q)));
}
