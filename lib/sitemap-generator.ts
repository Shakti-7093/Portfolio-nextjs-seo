import { projects } from "../data/portfolio-data"

// Generate additional sitemap entries for dynamic content
export function generateDynamicSitemap() {
  const baseUrl = "https://yourportfolio.com"
  const currentDate = new Date().toISOString()

  const staticPages = [
    { url: baseUrl, priority: "1.0", changefreq: "monthly" },
    { url: `${baseUrl}/#about`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/#experience`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/#projects`, priority: "0.9", changefreq: "weekly" },
    { url: `${baseUrl}/#skills`, priority: "0.7", changefreq: "monthly" },
    { url: `${baseUrl}/#contact`, priority: "0.6", changefreq: "yearly" },
  ]

  // Add project pages if they exist as separate routes
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    priority: "0.7",
    changefreq: "monthly",
  }))

  const allPages = [...staticPages, ...projectPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`

  return sitemap
}

// Generate robots.txt content
export function generateRobotsTxt() {
  const baseUrl = "https://yourportfolio.com"

  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}

# Crawl-delay for all bots
Crawl-delay: 1`
}
