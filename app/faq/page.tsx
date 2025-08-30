// app/faq/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronDown,
  HelpCircle,
  Shield,
  CreditCard,
  Users,
  Settings,
  Sparkles,
  Mail
} from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Catégories simplifiées
  const categories = [
    { id: 'general', label: 'Général', icon: Sparkles },
    { id: 'invites', label: 'Invités', icon: Users },
    { id: 'technique', label: 'Technique', icon: Settings },
    { id: 'tarifs', label: 'Tarifs', icon: CreditCard },
    { id: 'securite', label: 'Sécurité', icon: Shield }
  ]

  // Questions essentielles organisées
  const allFaqs: FAQItem[] = [
    // GÉNÉRAL
    {
      category: 'general',
      question: 'Comment fonctionne MemoriaBox ?',
      answer: 'Nous créons une page web personnalisée pour votre événement avec un QR code et un lien unique. Vos invités scannent le QR ou cliquent sur le lien, puis partagent leurs photos et vidéos en 2 clics, sans app ni inscription. Tout arrive automatiquement dans votre espace privé sécurisé.'
    },
    {
      category: 'general',
      question: 'Pour quels événements est-ce adapté ?',
      answer: 'MemoriaBox convient à tous les événements : mariages, anniversaires, baptêmes, communions, soirées d’entreprise, séminaires, réunions de famille, baby showers, départs en retraite, et plus encore.'
    },
    {
      category: 'general',
      question: 'Quelle différence avec WhatsApp ou Google Drive ?',
      answer: 'Contrairement à WhatsApp qui compresse les photos, MemoriaBox conserve la qualité originale. Pas besoin de compte Google, tout est centralisé automatiquement, et c’est 100% privé sans publication sur les réseaux.'
    },

    // INVITÉS
    {
      category: 'invites',
      question: 'Faut-il télécharger une application ?',
      answer: 'Non ! Les invités accèdent directement depuis leur navigateur (Safari, Chrome) en scannant le QR code ou cliquant sur le lien. Aucune installation nécessaire.'
    },
    {
      category: 'invites',
      question: 'Les invités doivent-ils créer un compte ?',
      answer: 'Non, aucune inscription requise. Ils arrivent sur la page et peuvent immédiatement partager leurs photos et vidéos.'
    },
    {
      category: 'invites',
      question: 'Est-ce simple pour les personnes âgées ?',
      answer: 'Oui ! Interface conçue pour être intuitive avec de gros boutons et des instructions claires.'
    },
    {
      category: 'invites',
      question: 'Y a-t-il une limite d’invités ?',
      answer: 'Non, que vous ayez 20 ou 500 invités, tous peuvent contribuer. Le système gère de nombreux uploads simultanés.'
    },

    // TECHNIQUE
    {
      category: 'technique',
      question: 'Quels formats sont acceptés ?',
      answer: 'Photos : JPEG, PNG, HEIC (iPhone). Vidéos : MP4, MOV, AVI. Taille max indicative : 500 MB/vidéo, 50 MB/photo. La qualité originale est conservée pour le téléchargement.'
    },
    {
      category: 'technique',
      question: 'Quelle capacité de stockage ?',
      answer: 'Essai Découverte : 10 Go. Pack Classique : 50 Go. Pack Premium : 100 Go. Extension possible si dépassement.'
    },
    {
      category: 'technique',
      question: 'Comment récupérer les fichiers ?',
      answer: 'Depuis votre espace : export ZIP haute qualité (tout ou sélection). Les fichiers conservent leur qualité originale et leurs métadonnées.'
    },
    {
      category: 'technique',
      question: 'Ça marche sur tous les téléphones ?',
      answer: 'Oui, compatible avec tous les smartphones (iPhone, Android), tablettes et ordinateurs. Site responsive testé sur les navigateurs majeurs.'
    },

    // TARIFS
    {
      category: 'tarifs',
      question: 'Quels sont les tarifs ?',
      answer: 'Essai Découverte : 99€ (7 jours, 10 Go). Pack Classique : 199€, soit 119€ avec la réduction de lancement (3 mois, 50 Go). Pack Premium : 299€, soit 179€ avec la réduction de lancement (1 an, 100 Go).'
    },
    {
      category: 'tarifs',
      question: 'Y a-t-il des frais cachés ?',
      answer: 'Non, tout est inclus : création personnalisée, QR code, hébergement, support, export illimité. Seules les options (album photo, montage vidéo) sont en supplément.'
    },
    {
      category: 'tarifs',
      question: 'Comment payer ?',
      answer: 'Paiement sécurisé par carte via Stripe ou virement. Paiement en 3x sans frais possible. Facture avec TVA pour les entreprises.'
    },
    {
      category: 'tarifs',
      question: 'Puis-je prolonger après l’événement ?',
      answer: 'Oui : +3 mois pour 49€, +6 mois pour 79€, +1 an pour 149€. Vous recevez un rappel avant expiration avec la possibilité de télécharger ou prolonger.'
    },
    {
      category: 'tarifs',
      question: 'Que se passe-t-il si je dépasse l’espace inclus ?',
      answer:
        'Pas de stress : la collecte continue pour ne rien rater. Vous recevez un email d’alerte à 50% puis à 90% d’occupation. Une fois le quota dépassé, vous avez 24h pour passer au palier supérieur (ou à une formule supérieure ; Premium n’a pas d’upgrade requis). Si vous ne changez pas d’offre dans ce délai, un dépassement est facturé après l’événement au forfait de 5€ TTC par palier de 10 Go entamé. Vous pouvez aussi opter pour une extension d’hébergement par la suite.'
    },

    // SÉCURITÉ
    {
      category: 'securite',
      question: 'Mes photos sont-elles privées ?',
      answer: 'Oui, page accessible uniquement avec votre lien/QR. Non indexée sur Google, invisible sans le lien. Vous contrôlez totalement l’accès.'
    },
    {
      category: 'securite',
      question: 'Où sont stockées les données ?',
      answer: 'Serveurs sécurisés en Europe, pratiques conformes au RGPD. Chiffrement SSL et sauvegardes régulières.'
    },
    {
      category: 'securite',
      question: 'Que deviennent mes données après ?',
      answer: 'Rappels avant expiration pour télécharger. Conservation de 30 jours après expiration (période de grâce), puis suppression définitive. Suppression immédiate possible sur demande.'
    },
    {
      category: 'securite',
      question: 'Puis-je modérer les contenus ?',
      answer: 'Oui, contrôle total depuis votre espace : suppression de contenus, modération avant publication. Option tri professionnel disponible.'
    }
  ]

  // Filtrage par catégorie
  const filteredFaqs = allFaqs.filter(faq => faq.category === selectedCategory)

  return (
    <main className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      {/* Header simple */}
      <section className="py-12 md:py-16">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h1 className="font-title text-3xl md:text-4xl lg:text-5xl text-encre mb-4">
              Questions fréquentes
            </h1>
            <p className="text-gray-700">
              Toutes les réponses pour bien comprendre MemoriaBox
            </p>
          </motion.div>

          {/* Onglets de catégories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setOpenIndex(null)
                  }}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all
                    ${isActive
                      ? 'bg-or text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Questions */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index
                  return (
                    <motion.div
                      key={`${selectedCategory}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <h3 className="font-medium text-encre">
                          {faq.question}
                        </h3>
                        <ChevronDown
                          className={`
                            w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200
                            ${isOpen ? 'rotate-180' : ''}
                          `}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="container-max pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 max-w-2xl mx-auto text-center"
        >
          <div className="w-12 h-12 bg-or/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6 text-or" />
          </div>
          <h2 className="font-title text-2xl text-encre mb-3">
            Une question sans réponse ?
          </h2>
          <p className="text-gray-600 mb-6">
            Contactez-nous, nous vous répondons rapidement
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm text-gray-500 mb-6">
            <a href="mailto:contact@memoriabox.fr" className="flex items-center gap-2 hover:text-or transition-colors">
              <Mail className="w-4 h-4" />
              contact@memoriabox.fr
            </a>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Nous contacter
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
