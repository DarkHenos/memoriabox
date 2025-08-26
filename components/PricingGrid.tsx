// components/PricingGrid.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";

/* ---------- Item de feature ---------- */
function Feature({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-gray-700 leading-6">
      {ok ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 text-or shrink-0" aria-label="Inclus" />
      ) : (
        <XCircle className="mt-0.5 h-4 w-4 text-gray-300 shrink-0" aria-label="Non inclus" />
      )}
      <span>{children}</span>
    </li>
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
  badgeNote?: string;
};

/* ---------- Plans (tarifs) ---------- */
const PLANS: Plan[] = [
  {
    key: "decouverte",
    title: "Essai Découverte",
    price: "99€ TTC",
    pitch: "Testez la collecte avant votre événement.",
    badgeNote: "",
  },
  {
    key: "classique",
    title: "Pack Classique",
    price: "119€ TTC",
    strike: "199€",
    highlight: "recommended",
    pitch: "Tout l'essentiel, simple et efficace.",
    badgeNote: "Recommandé",
  },
  {
    key: "premium",
    title: "Pack Premium",
    price: "179€ TTC",
    strike: "299€",
    highlight: "complete",
    pitch: "Tout compris + assistance le jour J.",
    badgeNote: "Sérénité maximale",
  },
];

/* ---------- Matrice des features ---------- */
const ALL_FEATURES: {
  id: string;
  label: string;
  info?: string;
  showIn: PlanKey[];
}[] = [
  {
    id: "static",
    label: "Mode statique (écran/tablette) avec QR visible",
    showIn: ["decouverte", "classique", "premium"],
  },
  {
    id: "portable",
    label: "Mode portable (lien privé sur smartphone invité)",
    showIn: ["decouverte", "classique", "premium"],
  },
  {
    id: "private",
    label: "Collecte de photos et de vidéos en privé",
    showIn: ["decouverte", "classique", "premium"],
  },
  {
    id: "qrcode",
    label: "QR code inclus",
    info: "Le QR code ouvre la page privée en 2 secondes, sans compte ni application.",
    showIn: ["decouverte", "classique", "premium"],
  },
  {
    id: "guided",
    label: "Mise en route guidée (visio 30 min) + check-list + test",
    showIn: ["classique", "premium"],
  },
  {
    id: "branding",
    label: "Personnalisation visuelle (couleurs / style)",
    showIn: ["classique", "premium"],
  },
  {
    id: "customUrl",
    label: "Adresse web personnalisée",
    showIn: ["premium"],
  },
  {
    id: "support",
    label: "Support prioritaire le jour J (email + chat)",
    showIn: ["premium"],
  },
  {
    id: "moderation",
    label: "Modération & tri des médias après l'événement",
    showIn: ["premium"],
  },
  {
    id: "hosting",
    label: "Hébergement prolongé de la page (1 mois)",
    showIn: ["premium"],
  },
  {
    id: "privacy",
    label: "Confidentialité activée par défaut",
    showIn: ["decouverte", "classique", "premium"],
  },
];

function useFeatures(plan: PlanKey) {
  return useMemo(
    () =>
      ALL_FEATURES.map((f) => {
        const ok = f.showIn.indexOf(plan) !== -1;
        return { ...f, ok };
      }),
    [plan]
  );
}

/* ---------- Badges ---------- */
function Badge({ type }: { type?: "recommended" | "complete" }) {
  if (type === "recommended")
    return (
      <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold tracking-wide bg-white/90 text-encre">
        Recommandé
      </span>
    );
  if (type === "complete")
    return (
      <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold tracking-wide bg-white/90 text-encre">
        Le plus complet
      </span>
    );
  return null;
}

/* ---------- Carte d'un plan ---------- */
function PlanCard({ plan }: { plan: Plan }) {
  const features = useFeatures(plan.key);

  // Style cohérent avec plus de contraste
  const tone =
    plan.key === "classique"
      ? {
          card: "card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-2 ring-or border-2 border-or/30",
          headerBg: "bg-gradient-to-br from-or to-amber-500 text-white",
          cta: "btn bg-or hover:bg-amber-600 text-white font-bold",
          chip: "bg-white/90 text-encre font-bold",
          badge: "absolute top-3 right-3",
        }
      : plan.key === "premium"
      ? {
          card: "card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-2 ring-gray-800 border-2 border-gray-700",
          headerBg: "bg-gradient-to-br from-gray-800 to-gray-900 text-white",
          cta: "btn bg-gray-800 hover:bg-gray-900 text-white font-bold",
          chip: "bg-white/90 text-encre font-bold",
          badge: "absolute top-3 right-3",
        }
      : {
          card: "card hover:shadow-lg transition-all duration-300 border-2 border-gray-300",
          headerBg: "bg-white text-encre border-b-2 border-gray-200",
          cta: "btn btn-outline border-2 hover:bg-gray-800 hover:text-white font-bold",
          chip: "bg-gray-100 text-gray-700 font-bold",
          badge: "",
        };

  const saving =
    plan.strike &&
    (() => {
      const s = parseInt(plan.strike.replace(/\D/g, "") || "0", 10);
      const p = parseInt(plan.price.replace(/\D/g, "") || "0", 10);
      return s > p ? `${s - p}€ d'économie` : null;
    })();

  return (
    <article 
      className={`${tone.card} overflow-hidden flex flex-col h-full`}
      itemScope 
      itemType="https://schema.org/Offer"
    >
      {/* Header avec hauteur fixe */}
      <header className={`${tone.headerBg} px-6 py-5 relative min-h-[140px]`}>
        {plan.highlight && (
          <div className={tone.badge}>
            <Badge type={plan.highlight} />
          </div>
        )}
        
        <div>
          <h3 className="font-title text-2xl leading-7" itemProp="name">{plan.title}</h3>
          <p className="mt-1 text-sm/5 opacity-95" itemProp="description">{plan.pitch}</p>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <div className="text-3xl font-bold">{plan.price}</div>
          {plan.strike && (
            <div className="text-sm/5 opacity-70 line-through">{plan.strike}</div>
          )}
          {saving && (
            <span className={`text-xs px-2 py-0.5 rounded ${tone.chip}`}>
              {saving}
            </span>
          )}
        </div>
        <meta itemProp="priceCurrency" content="EUR" />
      </header>

      {/* Body avec flex-grow pour égaliser les hauteurs */}
      <div className="p-6 flex-grow flex flex-col">
        <ul className="space-y-2 flex-grow">
          {features.map((f) => (
            <Feature key={f.id} ok={f.ok}>
              <span className="inline-flex items-center gap-1">
                {f.label}
                {f.info && (
                  <abbr title={f.info} className="cursor-help no-underline">
                    <Info className="h-3.5 w-3.5 text-gray-500" aria-label="Information" />
                  </abbr>
                )}
              </span>
            </Feature>
          ))}
        </ul>

        <Link
          href={`/contact?plan=${plan.key}`}
          className={`mt-6 inline-flex w-full items-center justify-center ${tone.cta} py-3 rounded-full`}
          aria-label={`Choisir le plan ${plan.title}`}
        >
          Choisir ce plan
        </Link>

        <p className="mt-3 text-xs text-gray-600 text-center">
          Aucune application n'est requise pour les invités.
        </p>
      </div>
    </article>
  );
}

/* ---------- Grille ---------- */
export default function PricingGrid() {
  return (
    <section aria-label="Tarifs MemoriaBox">
      <p className="text-center text-gray-700 mb-4">
        Classique est recommandé, <span className="font-semibold">Premium inclut tout</span> + assistance le jour J.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {PLANS.map((p) => (
          <PlanCard key={p.key} plan={p} />
        ))}
      </div>

      {/* Bloc explicatif */}
      <div className="mt-10 card p-6 text-[15px] text-gray-700">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-encre">Mode statique</p>
            <p className="mt-1">
              La page s'affiche sur un écran ou une tablette posée. Un QR code
              invite à contribuer depuis le smartphone.
            </p>
          </div>
          <div>
            <p className="font-semibold text-encre">Mode portable</p>
            <p className="mt-1">
              Le lien privé est partagé aux invités. Ils envoient photos & vidéos
              avant, pendant et après l'événement.
            </p>
          </div>
          <div>
            <p className="font-semibold text-encre">Assistance</p>
            <p className="mt-1">
              Du test au jour J. L'option Premium inclut la priorité jour J +
              modération et hébergement prolongé.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}