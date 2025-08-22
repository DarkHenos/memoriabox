// components/ExperienceOrganizer.tsx
'use client'

import { motion } from 'framer-motion'
import { Camera, Heart, Share2, Shield } from 'lucide-react'

export default function ExperienceOrganizer() {
  const features = [
    {
      icon: Camera,
      title: "Collecte simplifiée",
      description: "Vos invités partagent facilement photos et vidéos via QR code ou lien"
    },
    {
      icon: Heart,
      title: "Personnalisation totale",
      description: "Chaque page est créée sur-mesure selon vos couleurs et votre style"
    },
    {
      icon: Shield,
      title: "Espace privé sécurisé",
      description: "Tous vos souvenirs sont protégés et accessibles uniquement par vous"
    },
    {
      icon: Share2,
      title: "Partage instantané",
      description: "Partagez l'accès avec vos proches en un clic"
    }
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-title text-3xl mb-6 text-encre">
            L'expérience organisateur
          </h2>
          <p className="text-gray-700 mb-8">
            Vous nous dites l'ambiance souhaitée, nous préparons un site à votre image. 
            Couleurs, titres, sections et petits détails créent un ensemble cohérent et élégant.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-100"
                >
                  <Icon className="w-8 h-8 text-or mb-3" />
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="card p-8">
            <h3 className="font-title text-xl mb-4">Tout rassembler sans effort</h3>
            <p className="text-gray-700 mb-6">
              Vous suivez les contributions en temps réel et récupérez l'ensemble dans un espace privé. 
              La présentation est soignée, prête à partager avec vos proches.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="badge">Design personnalisé</span>
                <span className="text-sm text-gray-600">Vos couleurs et votre style</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="badge">Espace privé</span>
                <span className="text-sm text-gray-600">Souvenirs organisés au même endroit</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="badge">Accompagnement</span>
                <span className="text-sm text-gray-600">Mise en place simple et rapide</span>
              </li>
            </ul>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-or/10 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-beige/20 rounded-full blur-xl" />
        </motion.div>
      </div>
    </section>
  )
}