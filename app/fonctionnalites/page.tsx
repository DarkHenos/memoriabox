// app/fonctionnalites/page.tsx
'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import {
  QrCode,
  Smartphone,
  Camera,
  Download,
  Shield,
  Eye,
  Lock,
  Palette,
  Link2,
  CheckCircle2,
  FolderDown,
  Clock,
  Sparkles,
  Users,
  Heart,
  Zap,
  ArrowRight,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

export default function FonctionnalitesPage() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Données pour la timeline du processus
  const processSteps = [
    {
      icon: QrCode,
      title: "1. Création de votre page",
      desc: "Page personnalisée avec QR code et lien unique"
    },
    {
      icon: Camera,
      title: "2. Partage avec vos invités",
      desc: "QR affiché sur place ou lien envoyé par message"
    },
    {
      icon: Upload,
      title: "3. Collecte automatique",
      desc: "Photos et vidéos arrivent dans votre espace"
    },
    {
      icon: Download,
      title: "4. Récupération facile",
      desc: "Export HD de tous vos souvenirs en un clic"
    }
  ];

  return (
    <main className="bg-gradient-to-br from-rosepale via-white to-beige/20">
      {/* HERO avec animation d'entrée */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Éléments décoratifs de fond */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-or/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-beige/20 rounded-full blur-3xl" />
        
        <div className="container-max relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            
            <h1 className="font-title text-4xl md:text-5xl lg:text-6xl text-encre mb-6">
              Collectez <span className="text-or">toutes</span> les photos & vidéos
              <br />de votre événement
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Une page privée avec <strong>QR code + lien</strong>. 
              Vos invités partagent en 2 clics, vous récupérez tout automatiquement.
            </p>

            {/* Processus visuel en 4 étapes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-br from-or/20 to-beige/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-or" />
                      </div>
                      <h3 className="font-semibold text-sm text-encre mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-600">{step.desc}</p>
                    </div>
                    {idx < processSteps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Points de validation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm"
            >
              <span className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                Sans application
              </span>
              <span className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                100% privé
              </span>
              <span className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                Export HD inclus
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* EXPÉRIENCE INVITÉS - Design moderne avec cartes */}
      <section className="py-16 md:py-20">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Pour vos invités
            </div>
            <h2 className="font-title text-3xl md:text-4xl text-encre mb-4">
              Une expérience <span className="text-or">ultra simple</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Conçu pour que tout le monde puisse participer, même les moins technophiles
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: QrCode,
                title: "Accès instantané",
                desc: "Scan du QR ou clic sur le lien",
                detail: "Pas de compte, pas de mot de passe",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Camera,
                title: "Partage en 2 clics",
                desc: "Sélection des photos/vidéos",
                detail: "Upload direct depuis le téléphone",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Heart,
                title: "Message personnel",
                desc: "Ajout d'un petit mot optionnel",
                detail: "Pour accompagner les souvenirs",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={item}
                  className="group relative"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-encre mb-2">{feature.title}</h3>
                    <p className="text-gray-700 mb-2">{feature.desc}</p>
                    <p className="text-sm text-gray-500">{feature.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* EXPÉRIENCE ORGANISATEUR - Mise en avant visuelle */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-beige/10 to-rosepale/10">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Pour vous
            </div>
            <h2 className="font-title text-3xl md:text-4xl text-encre mb-4">
              Tout est <span className="text-or">centralisé automatiquement</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Fini les clés USB, WhatsApp et Google Drive éparpillés
            </p>
          </motion.div>

          {/* Grille de fonctionnalités avec badges */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: FolderDown, title: "Centralisation auto", desc: "Tous les contenus au même endroit", badge: "Inclus", badgeColor: "green" },
              { icon: Shield, title: "Espace 100% privé", desc: "Accessible uniquement via votre lien", badge: "Inclus", badgeColor: "green" },
              { icon: Download, title: "Export HD", desc: "Téléchargez tout en qualité originale", badge: "Inclus", badgeColor: "green" },
              { icon: Clock, title: "Durée flexible", desc: "De 7 jours à 1 an selon formule", badge: "Inclus", badgeColor: "green" },
              { icon: Palette, title: "Personnalisation", desc: "Couleurs et style à votre image", badge: "Inclus", badgeColor: "green" },
              { icon: Link2, title: "URL personnalisée", desc: "memoriabox.fr/votre-evenement", badge: "Premium", badgeColor: "blue" }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-gradient-to-br from-or/10 to-beige/20 rounded-lg">
                      <Icon className="w-5 h-5 text-or" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      feature.badgeColor === 'green' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="font-semibold text-encre mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Tarifs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
              <span className="text-sm text-gray-600">3 formules dès 79€</span>
              <span className="text-gray-300">•</span>
              <Link href="/tarifs" className="text-sm font-medium text-or hover:underline">
                Voir les tarifs →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SÉCURITÉ - Design moderne avec icônes */}
      <section className="py-16 md:py-20">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Sécurité & Confidentialité
              </div>
              <h2 className="font-title text-3xl md:text-4xl text-encre mb-4">
                Vos souvenirs sont <span className="text-or">protégés</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Lock, title: "RGPD respecté", desc: "Données hébergées en Europe" },
                { icon: Eye, title: "Non public", desc: "Pas de diffusion sur les réseaux" },
                { icon: Shield, title: "Accès contrôlé", desc: "Vous gérez qui peut voir" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-encre mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 md:py-20">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-or/5 to-beige/10 rounded-3xl p-8 md:p-12 text-center border border-or/10">
              <h3 className="font-title text-2xl md:text-3xl text-encre mb-4">
                Prêt à simplifier la collecte de vos souvenirs ?
              </h3>
              <p className="text-gray-700 mb-8">
                Testez une page exemple ou démarrez votre projet en quelques minutes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo" className="btn btn-outline">
                  Voir la démo
                </Link>
                <Link href="/contact" className="btn btn-primary group">
                  Démarrer mon projet
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}