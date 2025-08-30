// components/FAQSection.tsx
'use client'

import { useState } from 'react'
import { ChevronDown, QrCode, Smartphone, Shield, Palette, Clock, Headphones, Download, Lock, Tag } from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
  icon: JSX.Element
}

export default function FAQSection({ showContact = true, showHeader = true }: { showContact?: boolean; showHeader?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "Comment fonctionne MemoriaBox ?",
      answer: "Vous créez une page web privée pour votre événement. Les invités scannent un QR code ou cliquent sur un lien et peuvent envoyer leurs photos/vidéos sans inscription ni application. Tous les souvenirs se centralisent automatiquement dans votre espace.",
      icon: <QrCode className="w-5 h-5 text-or" />,
    },
    {
      question: "Mes invités doivent-ils créer un compte ?",
      answer: "Non. L’accès est instantané : un clic suffit. Même vos proches les moins technophiles peuvent participer facilement. Pas de compte, pas d’application, pas de mot de passe.",
      icon: <Smartphone className="w-5 h-5 text-or" />,
    },
    {
      question: "Comment la confidentialité est-elle assurée ?",
      answer: "Votre page est privée : seuls vos invités disposant du lien ou du QR code peuvent y accéder. Aucune diffusion publique sur les réseaux sociaux. Les données sont hébergées en Europe, de manière sécurisée et conforme au RGPD.",
      icon: <Shield className="w-5 h-5 text-or" />,
    },
    {
      question: "Puis-je personnaliser ma page ?",
      answer: "Oui. Vous choisissez le titre, le style visuel et les couleurs pour refléter parfaitement l’ambiance de votre événement. L’URL peut être personnalisée dans la formule Premium.",
      icon: <Palette className="w-5 h-5 text-or" />,
    },
    {
      question: "Combien de temps la page reste active ?",
      answer: "La durée dépend de la formule choisie : l’essai Découverte dure 7 jours, le Pack Classique 3 mois, et le Premium 1 an. Vous pouvez prolonger à tout moment si vous souhaitez conserver vos souvenirs en ligne.",
      icon: <Clock className="w-5 h-5 text-or" />,
    },
    {
      question: "Quels services complémentaires sont inclus ?",
      answer: "Selon la formule : assistance le jour J, support prioritaire, tri et modération des contenus, export ZIP en qualité HD, voire album imprimé ou montage vidéo en option.",
      icon: <Headphones className="w-5 h-5 text-or" />,
    },
    {
      question: "Quels formats sont acceptés ?",
      answer: "La plupart des photos et vidéos sont compatibles : JPEG, PNG, HEIC, MP4, MOV… Les fichiers sont stockés en qualité HD et restent téléchargeables à tout moment.",
      icon: <Download className="w-5 h-5 text-or" />,
    },
    {
      question: "Combien ça coûte ?",
      answer: "Trois offres existent : Essai Découverte (99 €), Classique (119 € au lieu de 199 € en lancement), Premium (179 € au lieu de 299 € en lancement). L’offre de lancement est limitée et ne s’applique pas au pack Découverte.",
      icon: <Tag className="w-5 h-5 text-or" />,
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="font-title text-3xl mb-4 text-encre">Questions fréquentes</h2>
            <p className="text-gray-700">Tout ce que vous devez savoir avant d’utiliser MemoriaBox</p>
          </div>
        )}

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card overflow-hidden transition-all border border-gray-100 hover:shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/60 transition-colors"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center gap-3">
                  {faq.icon}
                  <h3 className="font-medium text-encre">{faq.question}</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 pl-8">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {showContact && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Vous n’avez pas trouvé votre réponse&nbsp;?</p>
            <Link href="/contact" className="btn btn-primary">Contactez-nous</Link>
          </div>
        )}
      </div>
    </section>
  )
}
