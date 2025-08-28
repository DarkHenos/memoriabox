// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://memoriabox.fr");

// ✅ viewport pour gérer le themeColor
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "MemoriaBox - Souvenirs numériques pour mariages, anniversaires et événements",
  description:
    "Créez une galerie privée pour rassembler photos, vidéos et messages de vos invités. Mariages, anniversaires, baptêmes, événements d’entreprise : une solution simple et sécurisée.",
  keywords: [
    "souvenirs numériques",
    "mariage digital",
    "photobooth smartphone",
    "videobooth",
    "livre d’or en ligne",
    "galerie photo mariage",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
    other: [
      { rel: "icon", url: "/images/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/images/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "MemoriaBox",
    title: "MemoriaBox",
    description:
      "Rassemblez photos, vidéos et messages de vos invités dans une galerie privée et sécurisée.",
    images: [{ url: "/opengraph-image" }],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MemoriaBox",
    description:
      "Rassemblez photos, vidéos et messages de vos invités dans une galerie privée et sécurisée.",
    images: ["/twitter-image"],
  },
  manifest: "/manifest.json",
  // ❌ themeColor supprimé d’ici
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MemoriaBox",
    url: siteUrl,
    logo: `${siteUrl}/icon1.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contact@memoriabox.fr",
      },
    ],
    sameAs: ["https://www.linkedin.com/company/memoriabox-fr"],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
        <link rel="icon" type="image/png" href="/images/web-app-manifest-192x192.png?v=2" sizes="192x192" />
        <link rel="icon" type="image/png" href="/images/web-app-manifest-512x512.png?v=2" sizes="512x512" />
        <link rel="manifest" href="/manifest.json" />
        {/* ✅ theme-color n’est plus ici */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <AppHeader />
        <main className="min-h-screen">{children}</main>
        <AppFooter />
      </body>
    </html>
  );
}
