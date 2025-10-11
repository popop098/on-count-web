import { supabase } from "@/lib/supabaseClient";

// Cache for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let cachedData = null;
let lastFetch = 0;

export default async function handler(req, res) {
  // Set cache headers
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  
  try {
    // Check if we have cached data that's still fresh
    const now = Date.now();
    if (cachedData && (now - lastFetch) < CACHE_DURATION) {
      return res.status(200).json(cachedData);
    }

    // Fetch fresh data
    const { data, error } = await supabase
      .from("profiles")
      .select("channel_id, channel_name, channel_image_url, follower_count, verified_mark, is_public")
      .eq("is_public", true)
      .order("follower_count", { ascending: false });

    if (error) {
      throw error;
    }

    // Update cache
    cachedData = data;
    lastFetch = now;

    return res.status(200).json(data);
  } catch (e) {
    console.error('API Error:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
