// components/PricingGrid.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

/* ---------- Petit composant "tick/cross" ---------- */
function Feature({
  ok,
  children,
}: {
  ok: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2 text-sm text-gray-800">
      {ok ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600 shrink-0" />
      ) : (
        <XCircle className="mt-0.5 h-4 w-4 text-gray-300 shrink-0" />
      )}
      <span className="leading-6">{children}</span>
    </li>
  );
}

/* ---------- InfoTip : petit "i" au clic/hover ---------- */
function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 select-none"
        aria-label="Informations"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        i
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-64 rounded-md border bg-white p-2 text-xs text-gray-700 shadow">
          {text}
        </div>
      )}
    </span>
  );
}

/* ---------- Types ---------- */
type PlanKey = "decouverte" | "classique" | "premium";

type Plan = {
  key: PlanKey;
  title: string;
  pitch: string;
  price: string;
  strike?: string;
  highlight?: "recommended" | "complete";
};

/* ---------- Données marketing des plans ---------- */
const PLANS: Plan[] = [
  {
    key: "decouverte",
    title: "Essai Découverte",
    price: "99€ TTC",
    pitch: "Testez sans risque et voyez si vos invités accrochent.",
  },
  {
    key: "classique",
    title: "Pack Classique",
    price: "119€ TTC",
    strike: "199€",
    highlight: "recommended",
    pitch: "Tout l’essentiel pour une collecte simple et sans friction.",
  },
  {
    key: "premium",
    title: "Pack Premium",
    price: "179€ TTC",
    strike: "299€",
    highlight: "complete",
    pitch: "Expérience fluide, élégante et sans compromis. Vous profitez, on s’occupe du reste.",
  },
];

/* ---------- Matrice des fonctionnalités ---------- */
const ALL_FEATURES: {
  id: string;
  label: string;
  info?: string;
  showIn: PlanKey[];
}[] = [
  {
    id: "static",
    label: "Mode statique sur écran ou tablette avec QR visible",
    showIn: ["decouverte", "classique", "premium"],
  },
  {
    id: "portable",
    label: "Mode portable avec lien privé sur les smartphones invités",
    showIn: ["decouverte", "classique", "premium"],
  },
  {
    id: "private",
    label: "Lien privé avec collecte de photos et de vidéos",
    showIn: ["decouverte", "classique", "premium"],
  },
  {
    id: "qrcode",
    label: "QR code inclus",
    info:
      "Le QR code permet aux invités d’ouvrir la page privée en quelques secondes et d’envoyer leurs photos et vidéos depuis leur téléphone. Aucun compte n’est requis.",
    showIn: ["decouverte", "classique", "premium"],
  },
  {
    id: "guided",
    label:
      "Mise en route guidée en visio 30 min plus check-list et test en direct",
    showIn: ["classique", "premium"],
  },
  {
    id: "branding",
    label: "Personnalisation visuelle avec vos couleurs et votre style",
    showIn: ["classique", "premium"],
  },
  {
    id: "customUrl",
    label: "Adresse web personnalisée",
    showIn: ["premium"],
  },
  {
    id: "support",
    label: "Support prioritaire le jour J par email et chat",
    showIn: ["premium"],
  },
  {
    id: "privacy",
    label: "Confidentialité activée par défaut",
    showIn: ["decouverte", "classique", "premium"],
  },
];

/* ---------- Génération des features par plan ---------- */
function useFeatures(plan: PlanKey) {
  return useMemo(
    () =>
      ALL_FEATURES.map((f) => {
        const ok = f.showIn.indexOf(plan) !== -1; // no .includes for older TS libs
        return { ...f, ok };
      }),
    [plan]
  );
}

/* ---------- Carte d'un plan ---------- */
function PlanCard({ plan }: { plan: Plan }) {
  const features = useFeatures(plan.key);

  return (
    <div
      className={[
        // contraste renforcé
        "rounded-2xl border-2 shadow bg-white border-gray-300",
        plan.key === "classique" ? "border-emerald-300" : "",
        plan.key === "premium" ? "border-amber-300" : "",
      ].join(" ")}
    >
      {/* header */}
      <div className="p-6 border-b-2 border-gray-300 bg-white/70 rounded-t-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-title text-2xl text-encre">{plan.title}</h3>
            <p className="text-sm text-gray-600 mt-1 max-w-md">
              {plan.pitch}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {plan.highlight === "recommended" && (
              <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-medium">
                Recommandé
              </span>
            )}
            {plan.highlight === "complete" && (
              <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-2.5 py-1 text-xs font-medium">
                Le plus complet
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <div className="text-3xl font-semibold text-encre">{plan.price}</div>
          {plan.strike && (
            <div className="text-sm text-gray-400 line-through">
              {plan.strike}
            </div>
          )}
        </div>
      </div>

      {/* body */}
      <div className="p-6">
        <ul className="space-y-2">
          {features.map((f) => (
            <Feature key={f.id} ok={f.ok}>
              <span>
                {f.label}
                {f.id === "qrcode" && f.info && <InfoTip text={f.info} />}
              </span>
            </Feature>
          ))}
        </ul>

        <Link
          href={`/contact?plan=${plan.key}`}
          className={[
            "mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 font-medium transition",
            plan.key === "premium"
              ? "btn btn-primary"
              : "border-2 border-gray-400 hover:border-or hover:text-or bg-white",
          ].join(" ")}
        >
          Choisir ce plan
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Aucune application n’est requise pour les invités.
        </p>
      </div>
    </div>
  );
}

/* ---------- Grille complète ---------- */
export default function PricingGrid() {
  return (
    <section aria-label="Tarifs MemoriaBox">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLANS.map((p) => (
          <PlanCard key={p.key} plan={p} />
        ))}
      </div>

      {/* Bloc d’explication simple et sans icônes */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-700">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold text-encre">Mode statique</p>
            <p className="mt-1">
              La page s’affiche sur un support fixe comme un écran ou une
              tablette posée. Un QR code visible invite les invités à scanner et
              à contribuer depuis leur téléphone.
            </p>
          </div>
          <div>
            <p className="font-semibold text-encre">Mode portable</p>
            <p className="mt-1">
              Le lien privé est partagé aux invités. Ils ouvrent la page sur
              leur smartphone et envoient leurs photos et vidéos avant, pendant
              et après l’événement.
            </p>
          </div>
          <div>
            <p className="font-semibold text-encre">Mise en route guidée</p>
            <p className="mt-1">
              Session en visio de 30 minutes avec check-list et test en direct
              afin de valider le parcours. Pas d’envoi de matériel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
