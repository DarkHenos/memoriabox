// app/robots.ts
import type { MetadataRoute } from "next";
import { getSiteUrl, isProd } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  if (!isProd()) {
    // Préviews & dev : on bloque tout pour éviter le contenu dupliqué
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl,
    };
  }

  // Production : on autorise tout sauf les zones techniques
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",         // endpoints internes
          "/admin",        // si un jour présent
          "/private",      // zones privées éventuelles
          "/drafts",       // brouillons éventuels
        ],
      },
      // (facultatif) bots spécifiques si besoin plus tard
      // { userAgent: "GPTBot", disallow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
