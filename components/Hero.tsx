"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Hero() {
  const WORDS = ["mariage", "anniversaire", "baptême", "soirée", "événement d'entreprise"];
  const DYNAMIC_PREFIX = "votre\u00A0";

  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const PAUSE_FULL_MS = 3500;
  const PAUSE_EMPTY_MS = 400;
  const DELETE_SPEED = 60;
  const TYPE_SPEED_BASE = 80;

  const getTypeSpeed = (char: string) => {
    if ([" ", "'", "d", "e"].indexOf(char) !== -1) return TYPE_SPEED_BASE + 40;
    return TYPE_SPEED_BASE + Math.random() * 30;
  };

  useEffect(() => {
    const full = DYNAMIC_PREFIX + WORDS[i];
    let t: number | undefined;

    if (!del) {
      setIsTyping(true);
      if (sub < full.length) {
        const nextChar = full[sub];
        const speed = getTypeSpeed(nextChar);
        t = window.setTimeout(() => setSub((s) => s + 1), speed);
      } else {
        setIsTyping(false);
        t = window.setTimeout(() => setDel(true), PAUSE_FULL_MS);
      }
    } else {
      setIsTyping(true);
      if (sub > 0) {
        t = window.setTimeout(() => setSub((s) => s - 1), DELETE_SPEED);
      } else {
        setIsTyping(false);
        t = window.setTimeout(() => {
          setDel(false);
          setI((n) => (n + 1) % WORDS.length);
        }, PAUSE_EMPTY_MS);
      }
    }

    return () => { if (t !== undefined) clearTimeout(t); };
  }, [sub, del, i]);

  // Mesures
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

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } } };

  return (
    <section className="relative isolate flex items-center py-12 lg:py-20"
             style={{ minHeight: "calc(99vh - 140px)" }}
             aria-label="Présentation de MemoriaBox">
      <div className="container-max">
        <motion.div variants={container} initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
          <motion.h1
            ref={h1Ref}
            variants={item}
            className="font-title text-4xl lg:text-6xl mb-5 text-encre leading-tight mx-auto max-w-[22ch] sm:max-w-[28ch] lg:max-w-[34ch] text-center"
          >
            Réunissez tous les souvenirs de{" "}
            <span
              className="relative block mx-auto text-center whitespace-normal break-words sm:inline-flex sm:justify-center sm:whitespace-nowrap sm:break-normal sm:text-center align-baseline"
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
                  <span aria-hidden className={`inline-block align-baseline ml-1 caret-enhanced ${isTyping ? "caret-typing" : ""}`} />
                </span>
              </span>
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-lg lg:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Photos, vidéos et messages rassemblés dans un <strong className="text-encre">lien privé</strong>. Accès par <strong className="text-encre">QR ou lien</strong>, aucune application, aucun compte invité.
          </motion.p>
        </motion.div>
      </div>

      {/* Indicateur scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
  <ChevronDown className="w-8 h-8 text-or animate-bounce" />
</div>

      {/* Mesures invisibles */}
      <span ref={measureWrapRef} className="absolute -z-50 pointer-events-none opacity-0 block whitespace-normal break-words font-title text-4xl lg:text-6xl leading-tight font-medium" aria-hidden>{LONGEST_DYNAMIC}</span>
      <span ref={measureNowrapRef} className="absolute -z-50 pointer-events-none opacity-0 whitespace-nowrap font-title text-4xl lg:text-6xl leading-tight font-medium" aria-hidden>{LONGEST_DYNAMIC}</span>

      <style jsx>{`
        .caret-enhanced { width: 2px; height: 1.1em; background: linear-gradient(to bottom, #d4af37, #b8941f); animation: caretBlink 1.2s step-end infinite; border-radius: 1px; box-shadow: 0 0 4px rgba(212, 175, 55, 0.3); }
        .caret-typing { animation: caretTyping 0.8s ease-in-out infinite; box-shadow: 0 0 8px rgba(212, 175, 55, 0.5); }
        @keyframes caretBlink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        @keyframes caretTyping { 0%, 100% { opacity: 1; transform: scaleY(1); } 50% { opacity: 0.7; transform: scaleY(0.9); } }
      `}</style>
    </section>
  );
}
