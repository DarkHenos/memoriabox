// app/page.tsx
'use client'

import Hero from '@/components/Hero'
import ExperienceOrganizer from '@/components/ExperienceOrganizer'
import PricingGrid from '@/components/PricingGrid'
import FAQSection from '@/components/FAQSection'
import { motion } from 'framer-motion'
import { Sparkles, Users, Palette } from 'lucide-react'

export default function HomePage() {
  const simpleSteps = [
    {
      icon: Sparkles,
      title: "Simple et fluide",
      description: "Un lien ou QR code, et vos invités participent instantanément sans inscription"
    },
    {
      icon: Users,
      title: "Pensé pour tous",
      description: "Interface intuitive testée avec des utilisateurs de tous âges et niveaux"
    },
    {
      icon: Palette,
      title: "100% personnalisé",
      description: "Page créée sur-mesure avec vos couleurs, votre style et votre ambiance"
    }
  ]

  return (
    <div className="bg-gradient-to-br from-rosepale via-white to-beige/20">
      <Hero />

      {/* 3 points clés - Complète le Hero */}
      <section className="container-max py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-title text-3xl lg:text-4xl mb-4 text-encre">
            Pourquoi ça fonctionne <span className="text-or">vraiment</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Notre obsession : que <strong>chaque invité</strong> puisse participer facilement, 
            et que <strong>vous récupériez tout</strong> sans effort
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {simpleSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-center p-6 h-full rounded-xl hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-sm border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-or/20 to-beige/30 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-or" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-encre">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Section détaillée du fonctionnement */}
      <ExperienceOrganizer />

      {/* Section tarifs */}
      <section className="container-max py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-title text-3xl lg:text-4xl mb-4 text-encre">
            Des tarifs simples et transparents
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Chaque page est créée sur-mesure pour votre événement. 
            <strong className="text-encre"> Offre de lancement</strong> disponible sur nos formules principales.
          </p>
        </motion.div>
        <PricingGrid />
      </section>

      {/* FAQ */}
      <FAQSection showContact={false} />

      {/* CTA final - Honnête sur le pré-lancement */}
      <section className="container-max py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 lg:p-12 text-center border border-gray-100 shadow-sm"
        >
          <h2 className="font-title text-3xl lg:text-4xl mb-4 text-encre">
            Prêt à simplifier vos souvenirs ?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
            MemoriaBox est en <strong>phase de lancement</strong>. Nous ouvrons l'accès progressivement 
            pour garantir un service parfait. Réservez votre place dès maintenant et bénéficiez 
            de nos <strong>tarifs de lancement</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary">
              Réserver mon accès prioritaire
            </a>
            <a href="/demo" className="btn btn-outline">
              Découvrir une page exemple
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}