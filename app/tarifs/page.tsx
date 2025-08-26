// app/tarifs/page.tsx
import PricingGrid from "@/components/PricingGrid";
import AddOnsMatrix from "@/components/AddOnsMatrix";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/tarifs" },
  title: "Tarifs MemoriaBox - Mariages, anniversaires et événements",
  description:
    "Découvrez nos formules pour collecter et partager photos et vidéos de vos invités. QR code inclus, aucune application, confidentialité garantie. Choisissez l'offre adaptée à votre événement.",
  keywords:
    "tarifs photobooth mariage, prix collecte photos événement, memoriabox prix, livre or digital tarif",
  openGraph: {
    title: "Tarifs MemoriaBox - Solutions de collecte photos pour événements",
    description: "3 formules adaptées à votre budget. De 99€ à 199€ TTC.",
    url: "https://memoriabox.fr/tarifs",
    siteName: "MemoriaBox",
    locale: "fr_FR",
    type: "website",
  },
};

// Données structurées pour SEO (produit + offres)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "MemoriaBox - Service de collecte photos événements",
  description:
    "Solution digitale pour collecter et partager les photos et vidéos de vos invités",
  brand: { "@type": "Brand", name: "MemoriaBox" },
  offers: [
    {
      "@type": "Offer",
      name: "Essai Découverte",
      price: "99",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Pack Classique",
      price: "129",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      // Remise de lancement (non applicable à Découverte)
      category: "launch-promo",
    },
    {
      "@type": "Offer",
      name: "Pack Premium",
      price: "199",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      category: "launch-promo",
    },
  ],
};

export default function TarifsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
        {/* ─────────────────────  BANNIÈRE OFFRE DE LANCEMENT  ───────────────────── */}
        <div className="container-max pt-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-center">
            <p className="text-amber-800 text-sm md:text-base font-medium leading-relaxed">
              🎉 <span className="font-semibold">Offre de lancement</span> :{" "}
              <span className="underline decoration-amber-300 underline-offset-2">
                -40% sur les packs Classique et Premium
              </span>
              .{" "}
              <span className="opacity-90">
                Non applicable sur l’<span className="font-semibold">Essai Découverte</span>.
              </span>
            </p>
          </div>
        </div>

        {/* En-tête simple et centré */}
        <section className="container-max pt-8 pb-4 text-center">
          <h1 className="font-title text-4xl md:text-5xl text-encre">
            Des tarifs simples pour des souvenirs qui durent
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            QR code inclus. Aucune application. Confidentialité activée par
            défaut.
          </p>
        </section>

        {/* Plans */}
        <section className="container-max py-6">
          <PricingGrid />
        </section>

        {/* Options complémentaires */}
        <section className="container-max py-10">
          <h2 className="font-title text-3xl md:text-4xl text-encre text-center mb-6">
            Options complémentaires
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
            Ajoutez des expériences qui plaisent aux invités, quand vous en avez
            besoin. Le Pack Classique est recommandé, le Premium vise la
            sérénité maximale.
          </p>
          <AddOnsMatrix />
        </section>

        {/* FAQ SEO */}
        <section
          className="container-max py-12"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <h2 className="font-title text-3xl text-center text-encre mb-8">
            Questions fréquentes
          </h2>

          <div className="max-w-3xl mx-auto grid gap-4">
            <details
              className="card p-6"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <summary
                className="cursor-pointer text-encre font-semibold"
                itemProp="name"
              >
                Quelle est la différence entre les 3 formules ?
              </summary>
              <div
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
                className="mt-3"
              >
                <p className="text-gray-700" itemProp="text">
                  <strong>Découverte (99€)</strong> : pour tester le service.{" "}
                  <br />
                  <strong>Classique (129€)</strong> : l’essentiel + mise en
                  route et personnalisation. <br />
                  <strong>Premium (199€)</strong> : tout inclus + support jour J
                  + modération + hébergement prolongé + URL personnalisée.
                </p>
              </div>
            </details>

            <details
              className="card p-6"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <summary
                className="cursor-pointer text-encre font-semibold"
                itemProp="name"
              >
                Pourquoi certains packs sont-ils en réduction ?
              </summary>
              <div
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
                className="mt-3"
              >
                <p className="text-gray-700" itemProp="text">
                  Il s’agit de notre <strong>offre de lancement</strong> :
                  réduction temporaire pour faire découvrir MemoriaBox. Elle
                  s’applique aux packs <strong>Classique</strong> et{" "}
                  <strong>Premium</strong>, et n’est pas applicable à l’
                  <strong>Essai Découverte</strong>.
                </p>
              </div>
            </details>

            <details
              className="card p-6"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <summary
                className="cursor-pointer text-encre font-semibold"
                itemProp="name"
              >
                Les invités doivent-ils télécharger une application ?
              </summary>
              <div
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
                className="mt-3"
              >
                <p className="text-gray-700" itemProp="text">
                  Non, aucune application n’est requise. Les invités scannent le
                  QR code ou cliquent sur le lien pour accéder à votre page
                  privée depuis leur navigateur.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* CTA final */}
        <section className="container-max pb-16" aria-labelledby="cta-title">
          <div id="cta" className="card p-8 text-center">
            <h3
              id="cta-title"
              className="font-title text-2xl md:text-3xl text-encre mb-2"
            >
              On regarde ensemble ?
            </h3>

            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Donnez-nous votre date et le style souhaité&nbsp;: on vous propose
              la configuration la plus simple pour obtenir de vrais souvenirs,
              sans surcharge.
            </p>

            <div className="flex flex-col sm:flex-row-reverse gap-3 justify-center">
              <Link
                href="/contact"
                className="btn btn-primary w-full sm:w-auto"
                aria-describedby="cta-note"
              >
                Démarrer mon projet
              </Link>
              <Link
                href="/templates"
                className="btn btn-outline w-full sm:w-auto"
                aria-describedby="cta-note"
              >
                Voir une page exemple
              </Link>
            </div>

            <p id="cta-note" className="mt-3 text-xs text-gray-500">
              Aucun compte invité. Vous conservez tous les contenus. Réponse
              rapide selon votre date.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
