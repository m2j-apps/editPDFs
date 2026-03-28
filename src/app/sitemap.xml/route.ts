import { posts } from "../blog/posts-registry";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = "https://editpdfs.app";

  const staticUrls = [
    { loc: baseUrl, priority: "1.0", changefreq: "weekly" },
    { loc: `${baseUrl}/editor`, priority: "0.9", changefreq: "weekly" },
    { loc: `${baseUrl}/blog`, priority: "0.7", changefreq: "weekly" },
    { loc: `${baseUrl}/about`, priority: "0.5", changefreq: "monthly" },
    { loc: `${baseUrl}/contact`, priority: "0.5", changefreq: "monthly" },
    { loc: `${baseUrl}/privacy`, priority: "0.3", changefreq: "monthly" },
    { loc: `${baseUrl}/terms`, priority: "0.3", changefreq: "monthly" },
  ];

  const blogUrls = posts.map((post) => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: post.date,
  }));

  const allUrls = [...staticUrls, ...blogUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>\n    ` : ""}<changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
