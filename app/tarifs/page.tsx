// app/tarifs/page.tsx
import Link from "next/link";
import PricingGrid from "@/components/PricingGrid";
import TarifsServices from "./TarifsServices"; // <-- nouveau sous-composant client

// SEO (autorisé ici car Server Component)
export const metadata = {
  alternates: { canonical: "/tarifs" },
  title: "Tarifs — MemoriaBox",
  description:
    "Des formules claires pour collecter facilement photos et vidéos de vos invités.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      {/* Hero compact & clair */}
      <section className="container-max pt-16 pb-10 text-center">
        <div className="flex flex-col items-center">
          <h1 className="font-title text-4xl md:text-5xl mt-4 text-encre">
            Tarifs MemoriaBox
          </h1>
          <p className="text-gray-700 mt-3 max-w-2xl">
            Collectez toutes les <strong>photos</strong>,{" "}
            <strong>vidéos</strong> et<strong> messages</strong> de vos invités,
            via une page privée à votre image. QR code, modération simple, export
            final — tout est compris.
          </p>

          {/* Bandeau Offre de lancement */}
          <div className="mt-8 w-full">
            <div className="mx-auto max-w-4xl rounded-2xl border border-or/30 bg-gradient-to-r from-or/10 via-beige/10 to-beige/20 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-or/10 text-encre px-3 py-1 text-sm font-medium">
                  <span className="text-base">🎉</span>
                  Offre de lancement
                </span>
              </div>
              <p className="text-encre/90 text-center mt-3">
                <span className="font-semibold">-40% sur votre premier pack</span>{" "}
                <span className="text-encre/100">
                  (réduction plafonnée à 120€ • hors options et matériel)
                </span>
              </p>
              <p className="text-xs text-center text-gray-500 mt-1">
                Non cumulable • Valable uniquement sur la première commande
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des formules */}
      <section className="container-max pb-6">
        <PricingGrid />
      </section>

      {/* Services et options complémentaires (partie interactive déplacée en client) */}
      <section className="container-max py-14">
        <h2 className="font-title text-3xl md:text-4xl text-encre text-center mb-10">
          Services et options complémentaires
        </h2>
        <TarifsServices />
      </section>

      {/* CTA final */}
      <section className="container-max pt-2 pb-16">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <h3 className="font-title text-2xl md:text-3xl text-encre mb-3">
            Besoin d’un devis personnalisé ou d’un conseil pour choisir&nbsp;?
          </h3>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Expliquez votre événement (date, style, contraintes)&nbsp;: nous vous
            guidons vers la configuration idéale, sans surplus et parfaitement
            adaptée à vos besoins.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition font-medium text-encre"
          >
            💬 Discuter avec notre équipe
          </Link>
        </div>
      </section>
    </main>
  );
}
