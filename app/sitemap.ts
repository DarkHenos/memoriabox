// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const routes: Array<{
    path: string;
    changefreq: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/",          changefreq: "weekly",  priority: 1.0 },
    { path: "/tarifs",    changefreq: "weekly",  priority: 0.9 },
    { path: "/contact",   changefreq: "monthly", priority: 0.7 },
    { path: "/faq",       changefreq: "monthly", priority: 0.6 },
    { path: "/templates", changefreq: "monthly", priority: 0.6 },
  ];

  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));
}
