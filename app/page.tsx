// app/page.tsx
import Hero from '@/components/Hero'
import ExperienceOrganizer from '@/components/ExperienceOrganizer'
import PricingGrid from '@/components/PricingGrid'
import FAQSection from '@/components/FAQSection'

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-rosepale via-white to-beige/20">
      <Hero />

      {/* Présentation de l'expérience */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-title text-3xl mb-4 text-encre">
            Une expérience simple et mémorable
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            On vous accompagne pour cadrer votre page, la personnaliser à votre ambiance
            et la partager simplement avec vos proches. Accès ouvert <span className="font-medium">progressivement</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-or/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-semibold mb-2">Simple et fluide</h3>
            <p className="text-sm text-gray-600">
            Un lien, et tout le monde participe sans se poser de questions.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-beige/40 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💌</span>
            </div>
            <h3 className="font-semibold mb-2">Pense pour vos invites</h3>
            <p className="text-sm text-gray-600">
            Un parcours clair pour partager des messages et des souvenirs.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-or/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-semibold mb-2">Rendu soigné</h3>
            <p className="text-sm text-gray-600">
              Design personnalisé selon vos couleurs et votre style
            </p>
          </div>
        </div>
      </section>

      <ExperienceOrganizer />

      {/* Section tarifs */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-title text-3xl mb-4 text-encre">
            Tarifs transparents
          </h2>
          <p className="text-gray-700">
            Chaque page est créée sur-mesure par notre équipe. Offre de lancement sur
            <span className="font-medium"> Pack Classique</span> et
            <span className="font-medium"> Pack Premium</span>.
          </p>
        </div>
        <PricingGrid />
      </section>

      <FAQSection showContact={false} />

      {/* CTA final honnête */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/50">
          <h2 className="font-title text-3xl mb-4 text-encre">
            Envies de tester MemoriaBox ?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            MemoriaBox est en pré-lancement. Nous ouvrons l’accès petit à petit.
            Donnez-nous votre date et vos besoins&nbsp;: on vous répond avec la meilleure
            configuration et une place prioritaire si nécessaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary">
              Demander un accès anticipé
            </a>
            <a href="/templates" className="btn btn-outline">
              Découvrir une page exemple
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
