// components/AddOnsMatrix.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type PlanKey = "decouverte" | "classique" | "premium";
type Availability = "none" | "option" | "included";

type AddOn = {
  id: string;
  label: string;
  info?: string;
  availability: Record<PlanKey, Availability>;
};

/* Petit "i" info avec placement auto (gauche/droite) + pas de clipping */
function InfoTip({ text }: { text: string }) {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
    const anchorRef = useRef<HTMLSpanElement>(null);
  
    // ferme à ESC
    useEffect(() => {
      const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onEsc);
      return () => window.removeEventListener("keydown", onEsc);
    }, []);
  
    // recalcule la position quand on ouvre / resize / scroll
    useEffect(() => {
      const recalc = () => {
        const r = anchorRef.current?.getBoundingClientRect();
        if (!r) return;
        const TW = 256; // ~ w-64
        const GAP = 8;
  
        // placement horizontal auto (priorité à droite)
        let left = r.right - TW;               // collé à droite du bouton
        if (left < 12) left = 12;              // marge fenêtre
        if (left + TW > window.innerWidth - 12)
          left = window.innerWidth - 12 - TW;  // pas de débordement
  
        const top = r.bottom + GAP;            // sous le bouton
        setPos({ top, left });
      };
  
      if (open) {
        recalc();
        window.addEventListener("resize", recalc);
        window.addEventListener("scroll", recalc, { passive: true });
        return () => {
          window.removeEventListener("resize", recalc);
          window.removeEventListener("scroll", recalc);
        };
      }
    }, [open]);
  
    return (
      <span ref={anchorRef} className="relative inline-block align-middle">
        <button
          type="button"
          className="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-or/40"
          aria-label="Informations"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          i
        </button>
  
        {open && pos && (
          <div
            className="fixed z-50 w-64 rounded-md border bg-white p-2 text-xs text-gray-800 shadow"
            style={{ top: pos.top, left: pos.left }}
            role="tooltip"
          >
            {text}
          </div>
        )}
      </span>
    );
  }

/* Add-ons retenus */
const ADDONS: AddOn[] = [
  {
    id: "photobooth",
    label: "Web Photobooth",
    info:
      "Appareil photo dans le navigateur. Les invités posent avec leur smartphone et envoient directement dans la galerie privée.",
    availability: { decouverte: "none", classique: "option", premium: "option" },
  },
  {
    id: "videobooth",
    label: "Video Guestbook",
    info:
      "Courts témoignages vidéo capturés sur smartphone. Envoi automatique vers la page privée.",
    availability: { decouverte: "none", classique: "option", premium: "option" },
  },
  {
    id: "moderation",
    label: "Modération et tri",
    info:
      "Dédoublonnage, rotation, suppression des flous. Galerie finale propre et agréable à regarder.",
    availability: { decouverte: "none", classique: "option", premium: "included" },
  },
  {
    id: "hosting",
    label: "Hébergement prolongé",
    info:
      "Conserver la page active plus longtemps après l’événement pour partager sereinement.",
    availability: { decouverte: "none", classique: "option", premium: "option" },
  },
];

function Cell({ value }: { value: Availability }) {
  if (value === "included") {
    return (
      <div className="flex items-center justify-center gap-1 text-green-700">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <span className="text-xs font-medium">Inclus</span>
      </div>
    );
  }
  if (value === "option") {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center justify-center rounded-full border border-gray-400 px-2.5 py-0.5 text-xs text-gray-800 bg-white">
          Option
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <XCircle className="h-4 w-4 text-gray-400" aria-hidden />
    </div>
  );
}

export default function AddOnsMatrix() {
  return (
    <section aria-label="Options complémentaires" className="not-prose max-w-5xl mx-auto">
      {/* Desktop / tablette large */}
      {/* >>> overflow-visible pour éviter que le tooltip soit coupé <<< */}
      <div className="hidden md:block rounded-3xl border-2 border-gray-300 bg-white overflow-hidden shadow-sm mx-auto">
      <div className="grid [grid-template-columns:minmax(220px,1.35fr)_1fr_1fr_1fr] bg-gray-100 text-xs text-gray-800">
          <div className="px-6 py-4 font-semibold text-left">Option</div>
          <div className="px-4 py-4 text-center">
            <div className="font-semibold">Essai Découverte</div>
            <div className="text-[11px] text-gray-600">Pour tester</div>
          </div>
          <div className="px-4 py-4 text-center bg-emerald-50">
            <div className="font-semibold text-emerald-900">Pack Classique</div>
            <div className="text-[11px] text-emerald-700">Recommandé</div>
          </div>
          <div className="px-4 py-4 text-center">
            <div className="font-semibold">Pack Premium</div>
            <div className="text-[11px] text-gray-600">Sérénité maximale</div>
          </div>
        </div>

        <ul className="divide-y divide-gray-200">
          {ADDONS.map((a, idx) => (
            <li
              key={a.id}
              className={[
                "grid [grid-template-columns:minmax(220px,1.35fr)_1fr_1fr_1fr] items-center",
                idx % 2 === 0 ? "bg-white" : "bg-gray-50",
                "hover:bg-or/[0.05] transition-colors",
              ].join(" ")}
            >
              <div className="px-6 py-3 text-sm text-encre">
                <span className="font-medium">{a.label}</span>
                {a.info && <InfoTip text={a.info} />}
              </div>
              <div className="px-4 py-3">
                <Cell value={a.availability.decouverte} />
              </div>
              <div className="px-4 py-3 bg-emerald-50">
                <Cell value={a.availability.classique} />
              </div>
              <div className="px-4 py-3">
                <Cell value={a.availability.premium} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile : cartes centrées */}
      <div className="md:hidden space-y-4 max-w-md mx-auto">
        {ADDONS.map((a) => (
          <div key={a.id} className="rounded-2xl border-2 border-gray-300 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm text-encre font-semibold">
                {a.label}
                {a.info && <InfoTip text={a.info} />}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-gray-100 p-2">
                <div className="font-medium text-gray-800">Découverte</div>
                <div className="mt-1">
                  <Cell value={a.availability.decouverte} />
                </div>
              </div>
              <div className="rounded-lg bg-emerald-50 p-2">
                <div className="font-medium text-emerald-900">Classique</div>
                <div className="mt-1">
                  <Cell value={a.availability.classique} />
                </div>
              </div>
              <div className="rounded-lg bg-gray-100 p-2">
                <div className="font-medium text-gray-800">Premium</div>
                <div className="mt-1">
                  <Cell value={a.availability.premium} />
                </div>
              </div>
            </div>
          </div>
        ))}

        <p className="text-[11px] text-gray-700 text-center">
          Aucune application requise pour les invités. Le QR code sert à ouvrir
          rapidement la page privée sur smartphone.
        </p>
      </div>
    </section>
  );
}
