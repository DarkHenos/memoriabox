// app/tarifs/TarifsServices.tsx
"use client";

import { useState } from "react";

type BadgeTone = "amber" | "green" | "blue" | "gray";

const badgeClasses: Record<BadgeTone, string> = {
  amber:
    "bg-amber-100 text-amber-800 border border-amber-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]",
  green:
    "bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]",
  blue:
    "bg-sky-100 text-sky-800 border border-sky-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]",
  gray:
    "bg-gray-100 text-gray-700 border border-gray-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]",
};

type Card = {
  icon: string;
  title: string;
  subtitle: string;
  price?: string;
  rightNote?: string;
  badge?: { label: string; tone: BadgeTone };
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
    info:
      "Prolonge la disponibilité de la page (consultation & contributions selon votre formule).",
  },
  {
    icon: "🧑‍💼",
    title: "Accompagnement jour J",
    subtitle:
      "Présence (ou assistance à distance) pour fluidifier la participation des invités.",
    price: "Sur devis",
    badge: { label: "Service", tone: "green" },
    info:
      "Brief rapide la veille, check matériel, aide au démarrage et réponses aux questions.",
  },
  {
    icon: "⚡",
    title: "Installation express (à distance)",
    subtitle:
      "Visio 30 min : configuration, test de collecte, QR prêt à diffuser.",
    price: "+29€",
    badge: { label: "Express", tone: "blue" },
    info:
      "On paramètre le lien/QR, on teste depuis 1–2 smartphones et on fournit la checklist J-1.",
  },
  {
    icon: "🧹",
    title: "Modération & tri des médias",
    subtitle:
      "Nettoyage des doublons, flous, rotation, regroupement par moments clés.",
    price: "+39€",
    badge: { label: "Populaire", tone: "amber" },
    info:
      "Accès temporaire à la page ; on livre une galerie propre + un zip final.",
  },
  {
    icon: "🗂️",
    title: "Espace supplémentaire",
    subtitle:
      "Ajoutez du stockage pour accueillir davantage de contributions.",
    price: "Sur demande",
    badge: { label: "Souvent choisi", tone: "amber" },
    info:
      "Propose un palier selon la taille d’événement (ex. +50 Go, +100 Go).",
  },
];

export default function TarifsServices() {
  const [showAll, setShowAll] = useState(false);
  const visibleCards = showAll ? cards : cards.slice(0, 4);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {visibleCards.map((c, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            {/* Ligne haute */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{c.icon}</span>
                <div>
                  <h3 className="font-semibold text-encre">{c.title}</h3>
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
                <span className="text-xs text-gray-500">{c.rightNote}</span>
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
}
