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

/* Tooltip simple & accessible */
function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    const recalc = () => {
      const r = anchorRef.current?.getBoundingClientRect();
      if (!r) return;
      const TW = 256;
      const GAP = 8;

      let left = r.right - TW;
      if (left < 12) left = 12;
      if (left + TW > window.innerWidth - 12)
        left = window.innerWidth - 12 - TW;

      const top = r.bottom + GAP;
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
        className="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full border border-gray-400 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-or/40"
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
          className="fixed z-50 w-64 rounded-md border bg-white p-2 text-xs text-gray-900 shadow"
          style={{ top: pos.top, left: pos.left }}
          role="tooltip"
        >
          {text}
        </div>
      )}
    </span>
  );
}

/* Add-ons alignés avec le design system */
const ADDONS: AddOn[] = [
  {
    id: "photobooth",
    label: "Web Photobooth",
    info: "Appareil photo dans le navigateur. Les invités posent avec leur smartphone et envoient directement dans la galerie privée.",
    availability: { decouverte: "none", classique: "option", premium: "option" },
  },
  {
    id: "videobooth",
    label: "Video Guestbook",
    info: "Courts témoignages vidéo capturés sur smartphone. Envoi automatique vers la page privée.",
    availability: { decouverte: "none", classique: "option", premium: "option" },
  },
  {
    id: "moderation",
    label: "Modération et tri",
    info: "Dédoublonnage, rotation, suppression des flous. Galerie finale propre et agréable à regarder.",
    availability: { decouverte: "none", classique: "option", premium: "included" },
  },
  {
    id: "hosting",
    label: "Hébergement prolongé (1 mois)",
    info: "Garder la page active après l'événement pour partager sereinement.",
    availability: { decouverte: "none", classique: "option", premium: "included" },
  },
  {
    id: "customUrl",
    label: "Adresse web personnalisée",
    info: "Ex : memoriabox.fr/votre-evenement",
    availability: { decouverte: "none", classique: "option", premium: "included" },
  },
  {
    id: "supportJ",
    label: "Support prioritaire le jour J",
    info: "Canal prioritaire email + chat, réponse accélérée.",
    availability: { decouverte: "none", classique: "option", premium: "included" },
  },
];

function Cell({ value }: { value: Availability }) {
  if (value === "included") {
    return (
      <div className="flex items-center justify-center gap-1 text-or">
        <CheckCircle2 className="h-4 w-4" />
        <span className="text-xs font-semibold">Inclus</span>
      </div>
    );
  }
  if (value === "option") {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center justify-center rounded-full border border-gray-400 px-2.5 py-0.5 text-xs font-medium text-gray-700 bg-white">
          Option
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <XCircle className="h-4 w-4 text-gray-300" aria-hidden />
    </div>
  );
}

export default function AddOnsMatrix() {
  return (
    <section aria-label="Options complémentaires" className="not-prose max-w-5xl mx-auto">
      {/* Desktop */}
      <div className="hidden md:block card overflow-hidden mx-auto">
        <div className="grid [grid-template-columns:minmax(220px,1.35fr)_1fr_1fr_1fr] bg-gradient-to-r from-encre to-gray-800 text-xs text-white">
          <div className="px-6 py-4 font-semibold text-left">Option</div>
          <div className="px-4 py-4 text-center">
            <div className="font-semibold">Essai Découverte</div>
            <div className="text-[11px] opacity-80">Pour tester</div>
          </div>
          <div className="px-4 py-4 text-center bg-or/20">
            <div className="font-semibold">Pack Classique</div>
            <div className="text-[11px] opacity-90">Recommandé</div>
          </div>
          <div className="px-4 py-4 text-center bg-white/10">
            <div className="font-semibold">Pack Premium</div>
            <div className="text-[11px] opacity-90">Sérénité maximale</div>
          </div>
        </div>

        <ul className="divide-y divide-gray-200">
          {ADDONS.map((a, idx) => (
            <li
              key={a.id}
              className={[
                "grid [grid-template-columns:minmax(220px,1.35fr)_1fr_1fr_1fr] items-center",
                idx % 2 === 0 ? "bg-white" : "bg-gray-50",
                "hover:bg-beige/20 transition-colors",
              ].join(" ")}
            >
              <div className="px-6 py-3 text-[15px] text-encre">
                <span className="font-semibold">{a.label}</span>
                {a.info && <InfoTip text={a.info} />}
              </div>
              <div className="px-4 py-3">
                <Cell value={a.availability.decouverte} />
              </div>
              <div className="px-4 py-3">
                <Cell value={a.availability.classique} />
              </div>
              <div className="px-4 py-3">
                <Cell value={a.availability.premium} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4 max-w-md mx-auto">
        {ADDONS.map((a) => (
          <div key={a.id} className="card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm text-encre font-semibold">
                {a.label}
                {a.info && <InfoTip text={a.info} />}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-gray-50 p-2">
                <div className="font-medium text-gray-700">Découverte</div>
                <div className="mt-1">
                  <Cell value={a.availability.decouverte} />
                </div>
              </div>
              <div className="rounded-lg bg-rosepale/30 p-2">
                <div className="font-medium text-encre">Classique</div>
                <div className="mt-1">
                  <Cell value={a.availability.classique} />
                </div>
              </div>
              <div className="rounded-lg bg-beige/30 p-2">
                <div className="font-medium text-encre">Premium</div>
                <div className="mt-1">
                  <Cell value={a.availability.premium} />
                </div>
              </div>
            </div>
          </div>
        ))}

        <p className="text-[11px] text-gray-600 text-center">
          Aucune application requise. Le QR code ouvre la page privée sur smartphone.
        </p>
      </div>
    </section>
  );
}