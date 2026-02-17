import { writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const generateSitemap = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const staticPages = [
    "/",
    "/notice",
    "/privacy",
    "/terms",
    "/about",
    "/guide",
  ];

  const dynamicPages = [];

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase environment variables are not set. Generating sitemap with static pages only.",
    );
  } else {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id");

    if (error) {
      console.error("Error fetching profiles:", error);
      return;
    }

    dynamicPages.push(...profiles.map((profile) => `/info/${profile.id}`));
  }

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map((page) => {
      return `
    <url>
      <loc>${`https://on-count.kr${page}`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`;
    })
    .join("")}
</urlset>`;

  writeFileSync("public/sitemap.xml", sitemap);
  console.log("Sitemap generated successfully!");
};

generateSitemap();
