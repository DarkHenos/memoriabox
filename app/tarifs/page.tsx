// app/tarifs/page.tsx
import PricingGrid from "@/components/PricingGrid";
import AddOnsMatrix from "@/components/AddOnsMatrix";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/tarifs" },
  title: "Tarifs MemoriaBox - Mariages, anniversaires et événements",
  description:
    "Découvrez nos formules pour collecter et partager photos et vidéos de vos invités. QR code inclus, aucune application, confidentialité garantie. Choisissez l’offre adaptée à votre événement.",
};

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      {/* En-tête simple et centré */}
      <section className="container-max pt-10 pb-4 text-center">
        <h1 className="font-title text-4xl md:text-5xl text-encre">
          Des tarifs simples pour des souvenirs qui durent
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          QR code inclus. Aucune application. Confidentialité activée par défaut.
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
          besoin. Le Pack Classique est recommandé, le Premium vise la sérénité
          maximale.
        </p>
        <AddOnsMatrix />
      </section>

      {/* CTA final */}
      <section className="container-max pb-16" aria-labelledby="cta-title">
        <div
          id="cta"
          className="card rounded-3xl border border-gray-200 bg-gradient-to-b from-white to-beige/30 shadow-sm p-8 text-center"
        >
          <h3
            id="cta-title"
            className="font-title text-2xl md:text-3xl text-encre mb-2"
          >
            On regarde ensemble ?
          </h3>

          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Donnez-nous votre date et le style souhaité&nbsp;: on vous propose la
            configuration la plus simple pour obtenir de vrais souvenirs, sans surcharge.
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
            Aucun compte invité. Vous conservez tous les contenus. Réponse rapide selon votre date.
          </p>
        </div>
      </section>
    </main>
  );
}
