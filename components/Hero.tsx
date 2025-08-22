"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Shield, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const WORDS = ["mariage", "anniversaire", "baptême", "soirée", "événement d’entreprise"];

  // machine à écrire
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);

  // timings : 3s/cycle avec pause stable plus longue
  const TOTAL_MS = 3200;
  const PAUSE_FULL_MS = 2750; // pause lorsque le mot est complet
  const PAUSE_EMPTY_MS = 450; // pause à vide
  const stepMs = Math.max(
    50,
    Math.floor((TOTAL_MS - (PAUSE_FULL_MS + PAUSE_EMPTY_MS)) / (2 * Math.max(1, WORDS[index].length)))
  );

  useEffect(() => {
    const full = WORDS[index];
    let t: number;

    if (!del) {
      if (sub < full.length) t = window.setTimeout(() => setSub((s) => s + 1), stepMs);
      else t = window.setTimeout(() => setDel(true), PAUSE_FULL_MS);
    } else {
      if (sub > 0) t = window.setTimeout(() => setSub((s) => s - 1), stepMs);
      else
        t = window.setTimeout(() => {
          setDel(false);
          setIndex((i) => (i + 1) % WORDS.length);
        }, PAUSE_EMPTY_MS);
    }

    return () => clearTimeout(t);
  }, [sub, del, index, stepMs]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
  };

  return (
    <section
      className="relative isolate flex items-center py-12 lg:py-20"
      style={{ minHeight: "calc(100vh - 140px)" }}
      aria-label="Présentation de MemoriaBox"
    >
      <div className="container-max">
        <motion.div variants={container} initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
          {/* H1 : largeur max pour autoriser 2-3 lignes, mot animé dans le flux */}
          <motion.h1
            variants={item}
            className="font-title text-4xl lg:text-6xl mb-5 text-encre leading-tight mx-auto
                       max-w-[22ch] sm:max-w-[28ch] lg:max-w-[34ch]"
          >
            Réunissez tous les souvenirs de votre{" "}
            <span className="relative inline-flex items-baseline overflow-visible pb-[0.06em]">
              <span className="sr-only">événement</span>
              <span aria-hidden className="text-or">{WORDS[index].slice(0, sub)}</span>
              <span aria-hidden className="ml-1 inline-block align-baseline caret" />
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-lg lg:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Photos, vidéos et messages rassemblés dans un <strong>lien privé</strong>. Accès par{" "}
            <strong>QR ou lien</strong>, aucune application, aucun compte invité.
          </motion.p>

          <motion.ul variants={item} className="flex flex-wrap justify-center gap-4 mb-8" aria-label="Avantages clés">
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600" aria-hidden>✓</span> Prêt en 72 h max
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600" aria-hidden>✓</span> Pas d’app à installer
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600" aria-hidden>✓</span> Aucun compte invité
            </li>
          </motion.ul>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact" className="btn btn-primary" aria-label="Demander un accès">
              <span className="flex items-center gap-2">
                Demander un accès
                <motion.span aria-hidden animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </span>
            </Link>
            <Link href="/templates" className="btn btn-outline" aria-label="Voir une page exemple">
              Voir une page exemple
            </Link>
          </motion.div>

          <motion.div variants={item} className="px-4 py-3 bg-white/70 rounded-xl border border-gray-100 max-w-xl mx-auto">
            <p className="text-sm text-gray-700">Accompagnement humain et création sur-mesure. Réponse rapide selon votre date.</p>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" /> <span>Confidentialité par défaut</span>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden>❤️</span> <span>Suivi personnalisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" /> <span>Réponse rapide</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div aria-hidden className="pointer-events-none absolute top-16 left-10 w-32 h-32 bg-or/5 rounded-full blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-20 right-10 w-48 h-48 bg-beige/20 rounded-full blur-3xl" />

      <style jsx>{`
        .caret {
          width: 2px;
          height: 1em;
          background: currentColor;
          animation: caretBlink 1s step-end infinite;
        }
        @keyframes caretBlink { 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
