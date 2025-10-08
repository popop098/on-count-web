import { supabase } from "@/lib/supabaseClient";

export default async function handler(_req, res) {
  try {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("is_public", true);
    return res.status(200).json(data);
  } catch (e) {
    res.status(400).send({ error: e });
  }
}
