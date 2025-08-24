// lib/site.ts
export function getSiteUrl() {
    // 1) fixe ta prod ici ou via l'env NEXT_PUBLIC_SITE_URL
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (envUrl) return envUrl.replace(/\/+$/, "");
  
    // 2) Vercel preview/prod (VERCEL_URL sans https)
    const vercel = process.env.VERCEL_URL?.trim();
    if (vercel) return `https://${vercel}`;
  
    // 3) fallback local
    return "http://localhost:3000";
  }
  
  export function isProd() {
    // VERCEL_ENV vaut "production" en prod
    return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
  }
  