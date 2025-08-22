// components/PricingGrid.tsx
'use client'

import Link from 'next/link'
import { Check, Star } from 'lucide-react'

type Plan = {
  name: string
  price: string                 // prix affiché (remisé si applicable)
  duration: string
  intro: string
  includes: string[]
  recommended?: boolean
  ctaText: string
  ctaLink: string
  note?: string
  originalPrice?: string        // prix barré (si promo)
  savingText?: string           // ex: "Économie : 80 € TTC"
  promoHint?: string            // petit texte sous le prix: "Réduction de lancement"
}

export default function PricingGrid() {
  const plans: Plan[] = [
    {
      name: 'Essai Découverte',
      price: '99 € TTC',
      duration: "7 jours d’accès",
      intro: 'Pour tester en douceur.',
      includes: [
        "Découverte de l’interface complète",
        'Page de démonstration fonctionnelle',
        'Invitation de quelques proches',
        'Assistance par e-mail',
        'Réduction sur votre pack suivant',
      ],
      ctaText: "Commencer l'essai",
      ctaLink: '/contact?plan=essai',
      note: 'Offre de lancement non applicable à la formule Essai.',
    },
    {
      name: 'Pack Classique',
      // -40% sur 199 → 119
      originalPrice: '199 € TTC',
      price: '119 € TTC',
      savingText: 'Économie : 80 € TTC',
      duration: 'Pour 1 événement',
      intro: "L’essentiel pour votre événement",
      includes: [
        'Page créée sur-mesure par notre équipe',
        'Mode statique OU portable au choix',
        'Espace privé pour récupérer vos contenus',
        'Personnalisation des couleurs et du style',
        'Assistance e-mail tout au long',
      ],
      promoHint: 'Réduction de lancement',
      ctaText: 'Choisir Classique',
      ctaLink: '/contact?plan=classique',
    },
    {
      name: 'Pack Premium',
      // -40% sur 299 → 179 (cap 120€)
      originalPrice: '299 € TTC',
      price: '179 € TTC',
      savingText: 'Économie : 120 € TTC',
      duration: 'Pour 1 événement',
      intro: "L’expérience complète",
      includes: [
        'Tout du Pack Classique',
        'Adresse web personnalisée',
        'Design et détails particulièrement soignés',
        'Mise en route guidée étape par étape',
        'Support prioritaire et accompagnement renforcé',
      ],
      promoHint: 'Réduction de lancement',
      recommended: true,
      ctaText: 'Choisir Premium',
      ctaLink: '/contact?plan=premium',
    },
  ]

  return (
    <>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`card relative overflow-visible p-8 pt-10 flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${
              plan.recommended ? 'ring-2 ring-or' : ''
            }`}
          >
            {/* Badge recommandé */}
            {plan.recommended && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-or text-white px-3 py-1 text-[11px] font-semibold shadow-md ring-1 ring-or/70">
                  <Star className="h-3.5 w-3.5" />
                  Recommandé
                </span>
              </div>
            )}

            <header className="text-center mb-6">
              <h3 className="font-title text-2xl text-encre">{plan.name}</h3>

              {/* Bloc prix avec éventuel prix barré + économie */}
              <div className="mt-2 space-y-1">
                {plan.originalPrice && (
                  <span className="block text-sm text-gray-400 line-through">
                    {plan.originalPrice}
                  </span>
                )}

                <div>
                  <span className="text-4xl font-bold text-or">{plan.price}</span>
                </div>

                {plan.savingText && (
                  <p className="text-sm font-semibold text-emerald-600">
                    {plan.savingText}
                  </p>
                )}

                {plan.duration && (
                  <p className="text-xs text-gray-500">{plan.duration}</p>
                )}

                {plan.promoHint && (
                  <p className="text-[11px] text-encre/70">{plan.promoHint}</p>
                )}
              </div>

              <p className="text-sm text-gray-700 mt-3">{plan.intro}</p>
            </header>

            <ul className="space-y-3 mb-6 flex-1">
              {plan.includes.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-or mt-0.5 flex-shrink-0 fill-current"
                  >
                    <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z" />
                  </svg>
                  <span className="text-sm text-gray-800">{f}</span>
                </li>
              ))}
            </ul>

            {plan.note && (
              <p className="text-xs text-gray-500 mb-4 text-center">{plan.note}</p>
            )}

            <footer>
              <Link
                href={plan.ctaLink}
                className={`btn w-full ${plan.recommended ? 'btn-primary' : 'btn-outline'}`}
              >
                {plan.ctaText}
              </Link>
            </footer>
          </article>
        ))}
      </div>

      {/* précision globale sous la grille */}
      <p className="text-xs text-center text-gray-600 mt-4">
        Offre de lancement valable sur <strong>Pack Classique</strong> et <strong>Pack Premium</strong> uniquement (hors Essai).
      </p>
    </>
  )
}
