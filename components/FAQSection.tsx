// components/FAQSection.tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
  icon: string
}

interface FAQSectionProps {
  /** Affiche le bloc "Contactez-nous" (true par défaut) */
  showContact?: boolean
  /** Affiche le titre/intro intégrés au composant (true par défaut) */
  showHeader?: boolean
  /** Permet d’écraser le titre par défaut */
  title?: string
  /** Permet d’écraser l’intro par défaut */
  intro?: string
}

export default function FAQSection({
  showContact = true,
  showHeader = true,
  title = 'Questions fréquentes',
  intro = 'Tout ce que vous devez savoir sur MemoriaBox',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: 'Comment fonctionne MemoriaBox ?',
      answer:
        "Nous créons une page web personnalisée pour votre événement. Vos invités y accèdent via un QR code ou un lien, et partagent photos, vidéos et messages. Tout est centralisé dans votre espace privé.",
      icon: '🎯',
    },
    {
      question: 'Mes invités doivent-ils créer un compte ?',
      answer:
        "Non. Les invités accèdent directement à la page sans inscription et peuvent participer en quelques clics, même les moins technophiles.",
      icon: '👥',
    },
    {
      question: 'Comment récupérer tous les souvenirs ?',
      answer:
        "Tous les contenus sont sauvegardés dans votre espace privé sécurisé. Vous pouvez les consulter et les télécharger en haute qualité.",
      icon: '📁',
    },
    {
      question: 'Puis-je personnaliser ma page ?',
      answer:
        "Oui. Nous adaptons couleurs, style, textes et sections pour correspondre parfaitement à votre ambiance.",
      icon: '🎨',
    },
    {
      question: 'Combien de temps la page reste active ?',
      answer:
        "Selon la formule : 7 jours (Essai), 3 mois (Célébration), 1 an (Premium). Prolongation possible à tout moment.",
      icon: '⏱️',
    },
    {
      question: 'Proposez-vous un accompagnement ?',
      answer:
        "Oui. De la création au jour J si besoin. Notre équipe est là pour que tout se passe sereinement.",
      icon: '🤝',
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="font-title text-3xl mb-4 text-encre">{title}</h2>
            <p className="text-gray-700">{intro}</p>
          </div>
        )}

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card overflow-hidden transition-all">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{faq.icon}</span>
                  <h3 className="font-medium text-encre">{faq.question}</h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 pl-12">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {showContact && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Vous avez d’autres questions&nbsp;?</p>
            <Link href="/contact" className="btn btn-primary">
              Contactez-nous
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
