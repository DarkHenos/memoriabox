// app/faq/page.tsx
import FAQSection from '@/components/FAQSection'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      <div className="container-max py-16">
        <div className="text-center mb-12">
          <h1 className="font-title text-4xl mb-4 text-encre">Questions fréquentes</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur MemoriaBox.
          </p>
        </div>

        {/* Pas d’en-tête interne ici pour éviter le doublon */}
        <FAQSection showHeader={false} showContact />
      </div>
    </div>
  )
}
