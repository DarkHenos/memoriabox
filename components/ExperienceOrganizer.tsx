// components/ExperienceOrganizer.tsx
'use client'

import { motion } from 'framer-motion'
import { 
  QrCode, 
  Link2, 
  Shield, 
  Palette,
  Clock,
  Download,
  HeadphonesIcon,
  Sparkles,
  Camera,
  Users,
  FolderDown,
  Lock
} from 'lucide-react'

export default function ExperienceOrganizer() {
  // Points clés pour l'organisateur
  const keyBenefits = [
    {
      icon: QrCode,
      title: "QR Code & Lien fournis",
      description: "Affichez le QR sur place, partagez le lien par message"
    },
    {
      icon: Palette,
      title: "Page 100% personnalisée",
      description: "Vos couleurs, votre style, votre ambiance"
    },
    {
      icon: Lock,
      title: "Espace privé sécurisé",
      description: "Accessible uniquement avec le lien ou QR"
    },
    {
      icon: Clock,
      title: "Durée adaptée",
      description: "De 7 jours à 1 an selon votre formule"
    }
  ];

  // Ce que vivent les invités
  const guestExperience = [
    "Scannent le QR ou cliquent sur le lien",
    "Arrivent sur votre page personnalisée",
    "Uploadent photos/vidéos en 2 clics",
    "Sans app, sans compte, sans friction"
  ];

  // Services inclus selon formule
  const includedServices = [
    { 
      title: "Centralisation automatique",
      desc: "Tous les contenus arrivent dans votre espace",
      highlight: true
    },
    { 
      title: "Tri et organisation", 
      desc: "Modération et classement chronologique"
    },
    { 
      title: "Export HD disponible", 
      desc: "Téléchargez tout en qualité originale"
    },
    { 
      title: "Support dédié", 
      desc: "Accompagnement de la création au jour J"
    }
  ];

  return (
    <section className="container-max py-20">
      {/* Titre de section */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-title text-3xl lg:text-4xl mb-4 text-encre"
        >
          Comment ça marche <span className="text-or">concrètement</span> ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Un service pensé pour simplifier chaque étape, de la création à la récupération des souvenirs
        </motion.p>
      </div>

      {/* Section 1: Ce que vous obtenez */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h3 className="font-title text-2xl mb-8 text-center text-encre">
          Ce que vous obtenez
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-or/10 to-beige/20">
                    <Icon className="w-6 h-6 text-or" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-encre mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Section 2: L'expérience pour vos invités */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-title text-2xl mb-6 text-encre">
            Pour vos invités : <span className="text-or">ultra simple</span>
          </h3>
          
          <div className="space-y-4">
            {guestExperience.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-or/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-or">{index + 1}</span>
                </div>
                <p className="text-gray-700">{step}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <p className="text-sm text-green-800">
              <strong>💚 Conçu pour tous</strong> : interface intuitive pensée 
              même pour les moins technophiles
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="card bg-gradient-to-br from-white to-gray-50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-8 h-8 text-or" />
              <h4 className="font-title text-xl text-encre">Collecte en temps réel</h4>
            </div>
            
            {/* Stats simulées */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-or">2 clics</p>
                <p className="text-xs text-gray-600">pour partager</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-or">0 app</p>
                <p className="text-xs text-gray-600">à télécharger</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm">
              Vos invités peuvent même ajouter un petit message avec leurs photos. 
              Tout arrive instantanément dans votre espace.
            </p>
          </div>
          
          {/* Déco */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-or/10 rounded-full blur-xl" />
        </motion.div>
      </div>

      {/* Section 3: Votre espace organisateur */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-beige/10 to-rosepale/10 rounded-2xl p-8 lg:p-12"
      >
        <div className="text-center mb-8">
          <h3 className="font-title text-2xl mb-3 text-encre">
            Pour vous : <span className="text-or">tout est géré</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            De la création personnalisée à la récupération des souvenirs, 
            on s'occupe de tout pour que vous profitiez de votre événement
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {includedServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`
                p-5 rounded-xl 
                ${service.highlight 
                  ? 'bg-white border-2 border-or/30 shadow-lg' 
                  : 'bg-white/80 border border-gray-100'
                }
              `}
            >
              {service.highlight && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-or" />
                  <span className="text-xs font-semibold text-or uppercase">Le plus important</span>
                </div>
              )}
              <h4 className="font-semibold text-encre mb-1">{service.title}</h4>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Options supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100"
        >
          <p className="text-sm text-center text-gray-600 mb-3">
            <strong className="text-encre">Services complémentaires disponibles :</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="badge">Album photo imprimé</span>
            <span className="badge">Montage vidéo souvenir</span>
            <span className="badge">Support prioritaire jour J</span>
            <span className="badge">Extension de durée</span>
          </div>
        </motion.div>
      </motion.div>

      {/* CTA final */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-gray-600 mb-6">
          Rejoignez les premiers à <strong className="text-encre">révolutionner</strong> la collecte de souvenirs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/tarifs" className="btn btn-primary">
            Voir les formules
          </a>
          <a href="/demo" className="btn btn-outline">
            Tester la démo
          </a>
        </div>
      </motion.div>
    </section>
  );
}