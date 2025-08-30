// components/Hero.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  QrCode,
  Smartphone,
  Download,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Hero() {
  /* ===== Machine à écrire (inchangée) ===== */
  const WORDS = ["mariage", "anniversaire", "baptême", "soirée", "événement"];
  const DYNAMIC_PREFIX = "votre\u00A0";

  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const TOTAL_MS = 3200;
  const PAUSE_FULL_MS = 2750;
  const PAUSE_EMPTY_MS = 450;
  const stepMs = Math.max(
    50,
    Math.floor(
      (TOTAL_MS - (PAUSE_FULL_MS + PAUSE_EMPTY_MS)) /
        (2 * Math.max(1, WORDS[i].length))
    )
  );

  useEffect(() => {
    const fullLen = WORDS[i].length;
    let t: number;

    if (!del) {
      setIsTyping(true);
      if (sub < fullLen) t = window.setTimeout(() => setSub((s) => s + 1), stepMs);
      else {
        setIsTyping(false);
        t = window.setTimeout(() => setDel(true), PAUSE_FULL_MS);
      }
    } else {
      setIsTyping(true);
      if (sub > 0) t = window.setTimeout(() => setSub((s) => s - 1), stepMs);
      else {
        setIsTyping(false);
        t = window.setTimeout(() => {
          setDel(false);
          setI((n) => (n + 1) % WORDS.length);
        }, PAUSE_EMPTY_MS);
      }
    }
    return () => clearTimeout(t);
  }, [sub, del, i, stepMs]);

  /* ===== Mesures (pour la zone du mot animé) ===== */
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const measureWrapRef = useRef<HTMLSpanElement>(null);
  const measureNowrapRef = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const LONGEST_WORD = WORDS.reduce((a, b) => (a.length >= b.length ? a : b));
  const LONGEST_DYNAMIC = DYNAMIC_PREFIX + LONGEST_WORD;

  const doMeasure = () => {
    const h1W = h1Ref.current?.getBoundingClientRect().width ?? 0;
    if (measureWrapRef.current) {
      measureWrapRef.current.style.width = h1W ? `${h1W}px` : "auto";
    }
    const hRect = measureWrapRef.current?.getBoundingClientRect();
    const wRect = measureNowrapRef.current?.getBoundingClientRect();
    setBox({
      w: Math.ceil((wRect?.width ?? 0) + 4),
      h: Math.ceil(hRect?.height ?? 0),
    });
  };

  useLayoutEffect(() => { doMeasure(); }, []);
  useEffect(() => {
    const onResize = () => doMeasure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ===== Animations ===== */
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] } },
  };

  const features = [
    { icon: QrCode, title: "Page web dédiée", desc: "URL personnalisée pour votre événement" },
    { icon: Smartphone, title: "Sans app ni compte", desc: "Les invités partagent en 2 clics" },
    { icon: Download, title: "Tout centralisé", desc: "Photos et vidéos dans votre espace privé" },
  ];

  /* ===== Chevron mobile : fixed + hide on scroll ===== */
  const [showChevron, setShowChevron] = useState(true);
  useEffect(() => {
    const onScroll = () => setShowChevron(window.scrollY < 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative isolate flex flex-col justify-center py-8 pb-20 sm:pb-10 lg:py-20 overflow-hidden"
      style={{ minHeight: "calc(100vh - 120px)" }}
      aria-label="Présentation de MemoriaBox"
    >
      <div className="container-max">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl text-center"
        >
          {/* Titre */}
          <motion.h1
            ref={h1Ref}
            variants={item}
            className="font-title text-[28px] leading-[1.2] sm:text-4xl lg:text-6xl mb-5 text-encre mx-auto max-w-[22ch] sm:max-w-[28ch] lg:max-w-[34ch]"
          >
            Collectez tous les souvenirs de{" "}
            <span
              className="relative block mx-auto whitespace-normal break-words sm:inline-flex sm:justify-center sm:whitespace-nowrap sm:break-normal"
              style={{
                height: box.h ? `${box.h}px` : undefined,
                width: box.w ? `${box.w}px` : undefined,
                verticalAlign: "baseline",
                maxWidth: "100%",
              }}
            >
              <span className="font-medium">
                <span className="text-encre">votre&nbsp;</span>
                <span className="text-or">
                  {WORDS[i].slice(0, sub)}
                  <span
                    aria-hidden
                    className={`inline-block align-baseline ml-1 caret-enhanced ${isTyping ? "caret-typing" : ""}`}
                  />
                </span>
              </span>
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg lg:text-xl text-gray-700 mb-3 max-w-3xl mx-auto leading-relaxed"
          >
            Créez une <strong className="text-encre">page privée en ligne</strong> où vos invités
            envoient leurs photos et vidéos <strong className="text-encre">sans app ni inscription</strong>
          </motion.p>

          {/* Proposition de valeur */}
          <motion.div variants={item} className="mb-8 sm:mb-10">
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Fini les clés USB, groupes WhatsApp et Google Drive éparpillés.
              Tout arrive automatiquement dans votre espace sécurisé.
            </p>
          </motion.div>

          {/* 3 points clés */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8 sm:mb-10"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/85 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm"
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-or mx-auto mb-2" />
                  <p className="font-semibold text-[13px] sm:text-sm text-encre">{feature.title}</p>
                  <p className="text-[11px] sm:text-xs text-gray-600 mt-1">{feature.desc}</p>
                </div>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/demo" className="btn btn-primary group">
              Voir une démo
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/fonctionnalites" className="btn btn-outline">
              Comment ça marche ?
            </Link>
          </motion.div>

          {/* Réassurance */}
          <motion.div
            variants={item}
            className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 text-[12px] sm:text-sm text-gray-600"
          >
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              QR code inclus
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              100% privé et sécurisé
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Export HD disponible
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint – ovale doux + chevron flottant */}
{showChevron && (
  <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none flex justify-center">
    <div className="relative w-full max-w-[520px] h-20">
      {/* Halo ovoïdal très subtil */}
      <div
        className="absolute inset-0 rounded-t-[999px] blur-2xl"
        style={{
          background:
            'radial-gradient(120% 140% at 50% 95%, rgba(243,244,246,0.95) 0%, rgba(243,244,246,0.72) 40%, rgba(243,244,246,0.38) 70%, rgba(243,244,246,0) 100%)',
          boxShadow: '0 -8px 24px rgba(2,6,23,0.06)',
          WebkitMaskImage:
            'radial-gradient(110% 120% at 50% 100%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
          maskImage:
            'radial-gradient(110% 120% at 50% 100%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* Chevron centré */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
      <ChevronDown className="w-6 h-6 text-amber-600 animate-float" />
      </div>
    </div>
  </div>
)}


      {/* Mesures invisibles */}
      <span
        ref={measureWrapRef}
        className="absolute -z-50 pointer-events-none opacity-0 block whitespace-normal break-words font-title text-[28px] sm:text-4xl lg:text-6xl leading-tight font-medium max-w-full"
        style={{ left: -9999, top: 0 }}
        aria-hidden
      >
        {LONGEST_DYNAMIC}
      </span>
      <span
        ref={measureNowrapRef}
        className="absolute -z-50 pointer-events-none opacity-0 whitespace-nowrap font-title text-[28px] sm:text-4xl lg:text-6xl leading-tight font-medium max-w-full"
        style={{ left: -9999, top: 0 }}
        aria-hidden
      >
        {LONGEST_DYNAMIC}
      </span>

     {/* Styles caret + chevron */}
<style jsx>{`
  .caret-enhanced {
    width: 2px;
    height: 1.1em;
    background: linear-gradient(to bottom, #d4af37, #b8941f);
    animation: caretBlink 1.2s step-end infinite;
    border-radius: 1px;
    box-shadow: 0 0 4px rgba(212, 175, 55, 0.3);
  }
  .caret-typing {
    animation: caretTyping 0.8s ease-in-out infinite;
    box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
  }

  @keyframes caretBlink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  @keyframes caretTyping {
    0%, 100% { opacity: 1; transform: scaleY(1); }
    50%      { opacity: 0.7; transform: scaleY(0.9); }
  }

  /* Animation chevron flottant */
  .animate-float {
    animation: float 2.6s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); opacity: 1; }
    50%      { transform: translateY(4px); opacity: .92; }
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-float { animation: none !important; }
  }
`}</style>

    </section>
  );
}
