// app/tarifs/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import LogoIcon from "@/components/LogoIcon";
import PricingGrid from "@/components/PricingGrid";

// SEO
export const metadata = {
  alternates: { canonical: "/tarifs" },
  title: "Tarifs — MemoriaBox",
  description: "Des formules claires pour collecter facilement photos et vidéos de vos invités.",
};


export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      {/* Hero compact & clair */}
      <section className="container-max pt-16 pb-10 text-center">
        <div className="flex flex-col items-center">
          <h1 className="font-title text-4xl md:text-5xl mt-4 text-encre">
            Tarifs MemoriaBox
          </h1>
          <p className="text-gray-700 mt-3 max-w-2xl">
            Collectez toutes les <strong>photos</strong>,{" "}
            <strong>vidéos</strong> et
            <strong> messages</strong> de vos invités, via une page privée à
            votre image. QR code, modération simple, export final — tout est
            compris.
          </p>

          {/* Bandeau Offre de lancement */}
          <div className="mt-8 w-full">
            <div className="mx-auto max-w-4xl rounded-2xl border border-or/30 bg-gradient-to-r from-or/10 via-beige/10 to-beige/20 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-or/10 text-encre px-3 py-1 text-sm font-medium">
                  <span className="text-base">🎉</span>
                  Offre de lancement
                </span>
              </div>
              <p className="text-encre/90 text-center mt-3">
                <span className="font-semibold">
                  -40% sur votre premier pack
                </span>{" "}
                <span className="text-encre/100">
                  (réduction plafonnée à 120€ • hors options et matériel)
                </span>
              </p>
              <p className="text-xs text-center text-gray-500 mt-1">
                Non cumulable • Valable uniquement sur la première commande
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des formules */}
      <section className="container-max pb-6">
        <PricingGrid />
      </section>

      {/* Services et options complémentaires – badges centrés & colorés */}
      <section className="container-max py-14">
        <h2 className="font-title text-3xl md:text-4xl text-encre text-center mb-10">
          Services et options complémentaires
        </h2>

        {(() => {
          const badgeClasses: Record<string, string> = {
            amber:
              "bg-amber-100 text-amber-800 border border-amber-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]",
            green:
              "bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]",
            blue: "bg-sky-100 text-sky-800 border border-sky-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]",
            gray: "bg-gray-100 text-gray-700 border border-gray-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]",
          };

          type Card = {
            icon: string;
            title: string;
            subtitle: string;
            price?: string;
            rightNote?: string;
            badge?: { label: string; tone: keyof typeof badgeClasses };
            info?: string;
          };

          const cards: Card[] = [
            {
              icon: "🗄️",
              title: "Hébergement prolongé",
              subtitle:
                "Gardez la page active plus longtemps pour partager tranquillement après l’événement.",
              price: "+29€ / an",
              badge: { label: "Extension", tone: "blue" },
              info: "Prolonge la disponibilité de la page (consultation & contributions selon votre formule).",
            },
            {
              icon: "🧑‍💼",
              title: "Accompagnement jour J",
              subtitle:
                "Présence (ou assistance à distance) pour fluidifier la participation des invités.",
              price: "Sur devis",
              badge: { label: "Service", tone: "green" },
              info: "Brief rapide la veille, check matériel, aide au démarrage et réponses aux questions.",
            },
            {
              icon: "⚡",
              title: "Installation express (à distance)",
              subtitle:
                "Visio 30 min : configuration, test de collecte, QR prêt à diffuser.",
              price: "+29€",
              badge: { label: "Express", tone: "blue" },
              info: "On paramètre le lien/QR, on teste depuis 1–2 smartphones et on fournit la checklist J-1.",
            },
            {
              icon: "🧹",
              title: "Modération & tri des médias",
              subtitle:
                "Nettoyage des doublons, flous, rotation, regroupement par moments clés.",
              price: "+39€",
              badge: { label: "Populaire", tone: "amber" },
              info: "Accès temporaire à la page ; on livre une galerie propre + un zip final.",
            },

            {
              icon: "🗂️",
              title: "Espace supplémentaire",
              subtitle:
                "Ajoutez du stockage pour accueillir davantage de contributions.",
              price: "Sur demande",
              badge: { label: "Souvent choisi", tone: "amber" },
              info: "Propose un palier selon la taille d’événement (ex. +50 Go, +100 Go).",
            },
          ];

          const [showAll, setShowAll] = useState(false);
          const visibleCards = showAll ? cards : cards.slice(0, 4);

          return (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                {visibleCards.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
                  >
                    {/* Ligne haute */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-0.5">{c.icon}</span>
                        <div>
                          <h3 className="font-semibold text-encre">
                            {c.title}
                          </h3>
                          <p className="text-sm text-gray-600">{c.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {c.badge && (
                          <span
                            className={[
                              "inline-flex items-center justify-center h-6 px-2.5 rounded-full",
                              "text-[11px] font-medium leading-none whitespace-nowrap min-w-[104px] text-center",
                              badgeClasses[c.badge.tone],
                            ].join(" ")}
                          >
                            {c.badge.label}
                          </span>
                        )}
                        <details className="relative">
                          <summary className="cursor-pointer w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-xs text-gray-600 hover:bg-gray-50 select-none">
                            i
                          </summary>
                          {c.info && (
                            <div className="absolute right-0 mt-2 w-64 rounded-xl border bg-white p-3 text-xs text-gray-700 shadow-lg z-10">
                              {c.info}
                            </div>
                          )}
                        </details>
                      </div>
                    </div>

                    {/* Bas */}
                    <div className="mt-4 flex items-center justify-between">
                      {c.price ? (
                        <p className="text-or font-semibold">{c.price}</p>
                      ) : (
                        <span />
                      )}
                      {c.rightNote && (
                        <span className="text-xs text-gray-500">
                          {c.rightNote}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bouton Voir plus / Voir moins */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="btn btn-outline border-or text-or hover:bg-or hover:text-white"
                >
                  {showAll ? "Voir moins" : "Voir plus"}
                </button>
              </div>
            </>
          );
        })()}
      </section>

      {/* CTA final */}
      <section className="container-max pt-2 pb-16">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <h3 className="font-title text-2xl md:text-3xl text-encre mb-3">
            Besoin d’un devis personnalisé ou d’un conseil pour choisir&nbsp;?
          </h3>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Expliquez votre événement (date, style, contraintes)&nbsp;: nous
            vous guidons vers la configuration idéale, sans surplus et
            parfaitement adaptée à vos besoins.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition font-medium text-encre"
          >
            💬 Discuter avec notre équipe
          </Link>
        </div>
      </section>
    </main>
  );
}
