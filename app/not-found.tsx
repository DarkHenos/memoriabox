// app/not-found.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowRight, Mail, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rosepale via-white to-beige/20 px-4">
      {/* Bandeau info (style ancien) */}
      <div className="absolute top-6 inset-x-0 flex justify-center">
        <div className="bg-or text-white text-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="whitespace-nowrap">
            SITE EN TRAVAUX · Certaines fonctionnalités peuvent ne pas être disponibles
          </span>
        </div>
      </div>

      {/* Carte principale (arrondis + ombre douce, comme avant) */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="bg-white rounded-[28px] shadow-xl border border-gray-100 max-w-3xl w-full p-10 md:p-14 text-center mt-6 lg:mt-0"
      >
        {/* Icône d’alerte */}
        <div className="w-16 h-16 bg-or/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-7 h-7 text-or" />
        </div>

        {/* Titres */}
        <h1 className="font-title text-4xl md:text-5xl text-encre mb-3">
          Oups, page introuvable
        </h1>
        <p className="text-gray-600 mb-10">
          L’URL est peut-être erronée ou la page a changé d’adresse.
        </p>

        {/* Illustration SVG maison */}
        <div className="px-8 pt-6">
              <div className="relative mx-auto mt-2 w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200/70 bg-gradient-to-br from-white to-gray-50">
                <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-rose-300" />
                <div className="absolute right-11 top-6 h-3 w-3 rounded-full bg-amber-300" />
                <div className="absolute right-16 top-6 h-3 w-3 rounded-full bg-emerald-300" />

                <svg viewBox="0 0 800 360" className="h-[220px] w-full">
                  <defs>
                    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#b8941f" />
                    </linearGradient>
                    <linearGradient id="soft" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f2eadb" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>

                  {/* “route” courbe */}
                  <path d="M0,280 C160,240 320,320 480,290 C640,260 720,280 800,250"
                        fill="none" stroke="url(#gold)" strokeWidth="3" opacity="0.3" />

                  {/* Bornes QR/Upload (cards) */}
                  <g>
                    <rect x="80" y="80" width="150" height="110" rx="14" fill="url(#soft)" stroke="#e6e0d2" />
                    <rect x="95" y="100" width="30" height="30" rx="4" fill="#f0efe9" />
                    <rect x="130" y="100" width="30" height="30" rx="4" fill="#f0efe9" />
                    <rect x="165" y="100" width="30" height="30" rx="4" fill="#f0efe9" />
                    <rect x="95" y="140" width="100" height="10" rx="5" fill="#e3dccb" />
                    <rect x="95" y="158" width="60" height="10" rx="5" fill="#efe7d7" />
                  </g>

                  <g>
                    <rect x="560" y="70" width="160" height="120" rx="14" fill="url(#soft)" stroke="#e6e0d2" />
                    <rect x="580" y="92" width="60" height="12" rx="6" fill="#efe7d7" />
                    <rect x="580" y="110" width="40" height="12" rx="6" fill="#e3dccb" />
                    <rect x="580" y="130" width="100" height="60" rx="8" fill="#f0efe9" />
                  </g>

                  {/* cônes chantier */}
                  <g opacity="0.9">
                    <polygon points="350,270 370,230 390,270" fill="#f59e0b" />
                    <rect x="350" y="270" width="40" height="12" fill="#111827" opacity="0.85" rx="3" />
                    <rect x="355" y="245" width="30" height="6" fill="#fff" opacity="0.9" rx="2" />
                  </g>
                  <g opacity="0.9">
                    <polygon points="430,275 450,235 470,275" fill="#f59e0b" />
                    <rect x="430" y="275" width="40" height="12" fill="#111827" opacity="0.85" rx="3" />
                    <rect x="435" y="250" width="30" height="6" fill="#fff" opacity="0.9" rx="2" />
                  </g>

                  {/* éclats doux */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <circle key={i}
                            cx={60 + i * 60}
                            cy={50 + ((i * 37) % 90)}
                            r="2"
                            fill="#d4af37" opacity="0.35" />
                  ))}
                </svg>
              </div>
            </div>

        {/* Badge phase de lancement */}
        <div className="my-6">
          <span className="inline-flex items-center gap-2 bg-or/10 text-or px-4 py-1.5 rounded-full text-sm font-medium">
            Phase de lancement · nous améliorons encore l’expérience
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-10">
          Merci pour votre patience. Certaines pages peuvent évoluer ou être momentanément indisponibles.
        </p>

        {/* Boutons — version « large » comme avant */}
        <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/"
            className="btn btn-outline whitespace-nowrap flex justify-center px-5 py-3"
          >
            <Home className="mr-2 h-4 w-4" />
            Accueil
          </Link>

          <Link
            href="/tarifs"
            className="btn btn-outline whitespace-nowrap flex justify-center px-5 py-3 group"
          >
            Découvrir les tarifs
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/contact"
            className="btn btn-primary whitespace-nowrap flex justify-center px-5 py-3"
          >
            <Mail className="mr-2 h-4 w-4" />
            Nous contacter
          </Link>
        </div>

        {/* Lien retour */}
        <div className="mt-6">
          <Link href="/" className="text-gray-500 text-sm hover:text-or transition-colors">
            ← Revenir à la page précédente
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
