// app/contact/page.tsx
"use client";

import { useEffect, useMemo, useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Clock,
  Shield,
} from "lucide-react";

type SubmitStatus = { type: "success" | "error" | null; message: string };

// Configuration - à modifier selon vos besoins
const CONFIG = {
  showPhone: false, // Mettre à true pour afficher le téléphone
  phoneNumber: "06 12 34 56 78", // Numéro à afficher quand showPhone = true
};

// Composant pour le formulaire avec les search params
function ContactForm() {
  const qs = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
    plan: "",
    // honeypot anti-spam (toujours vide côté humain)
    website: "",
  });

  // Pré-remplir la formule depuis ?plan=…
  useEffect(() => {
    const plan = qs.get("plan");
    if (plan) setFormData((d) => ({ ...d, plan }));
  }, [qs]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  // Date min = aujourd'hui
  const minDate = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const remaining = 800 - (formData.message?.length || 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Stop spam bots (si honeypot rempli)
    if (formData.website.trim() !== "") {
      setSubmitStatus({
        type: "error",
        message:
          "Une erreur est survenue. Merci de réessayer ou de nous écrire directement par e-mail.",
      });
      setIsSubmitting(false);
      // Scroll vers le message d'erreur
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (res.ok && json?.success) {
        setSubmitStatus({
          type: "success",
          message:
            json.message ||
            "Merci ! Nous revenons vers vous rapidement avec une proposition personnalisée.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          eventDate: "",
          message: "",
          plan: "",
          website: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            json?.message ||
            "Impossible d'envoyer votre demande. Essayez de nouveau ou écrivez-nous à contact@memoriabox.fr.",
        });
      }
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message:
          "Connexion indisponible pour le moment. Vérifiez votre réseau et réessayez.",
      });
    } finally {
      setIsSubmitting(false);
      // Scroll vers le haut pour voir le message de statut
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Sidebar contact direct */}
      <aside className="lg:col-span-1 space-y-4">
        <div className="card p-6">
          <Mail className="w-6 h-6 text-or mb-2" />
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-sm text-gray-700">contact@memoriabox.fr</p>
        </div>

        {CONFIG.showPhone && (
          <div className="card p-6">
            <Phone className="w-6 h-6 text-or mb-2" />
            <h3 className="font-semibold mb-1">Téléphone</h3>
            <p className="text-sm text-gray-700">{CONFIG.phoneNumber}</p>
            <p className="text-xs text-gray-500 mt-1">
              Disponibles du lundi au vendredi, 9h — 18h
            </p>
          </div>
        )}

        <div className="card p-6">
          <MapPin className="w-6 h-6 text-or mb-2" />
          <h3 className="font-semibold mb-1">Zone d'intervention</h3>
          <p className="text-sm text-gray-700">France métropolitaine</p>
        </div>

        <div className="rounded-2xl border border-or/30 bg-or/10 p-5">
          <p className="text-sm text-gray-800">
            <strong>Conseil rapide :</strong> Envoyez-nous vos infos essentielles (date, type
            d'événement, nombre d'invités) et on vous guide vers la meilleure solution.
          </p>
        </div>
      </aside>

      {/* Formulaire */}
      <section className="lg:col-span-2">
        {/* Statut d'envoi */}
        {submitStatus.type && (
          <div
            role="status"
            className={`mb-5 flex items-center gap-3 rounded-xl p-4 ${
              submitStatus.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {submitStatus.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{submitStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-8">
          {/* Honeypot pour bots */}
          <input
            type="text"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />

          {/* Étape 1 : identité */}
          <fieldset>
            <legend className="font-semibold text-encre mb-4">
              1 — Vos coordonnées
            </legend>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Votre nom *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-2 focus:border-or focus:ring-2 focus:ring-or"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-2 focus:border-or focus:ring-2 focus:ring-or"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="phone">
                  Téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Optionnel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-2 focus:border-or focus:ring-2 focus:ring-or"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </fieldset>

          {/* Étape 2 : événement */}
          <fieldset className="mt-8">
            <legend className="font-semibold text-encre mb-4">
              2 — Votre événement
            </legend>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="eventType">
                  Type d'événement *
                </label>
                <select
                  id="eventType"
                  required
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData({ ...formData, eventType: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-2 focus:border-or focus:ring-2 focus:ring-or"
                  disabled={isSubmitting}
                >
                  <option value="">Sélectionnez</option>
                  <option value="mariage">Mariage</option>
                  <option value="anniversaire">Anniversaire</option>
                  <option value="bapteme">Baptême</option>
                  <option value="retraite">Départ en retraite</option>
                  <option value="entreprise">Événement d'entreprise</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="eventDate">
                  Date souhaitée
                </label>
                <input
                  id="eventDate"
                  type="date"
                  min={minDate}
                  value={formData.eventDate}
                  onChange={(e) =>
                    setFormData({ ...formData, eventDate: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-2 focus:border-or focus:ring-2 focus:ring-or"
                  disabled={isSubmitting}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" htmlFor="plan">
                  Formule envisagée
                </label>
                <select
                  id="plan"
                  value={formData.plan}
                  onChange={(e) =>
                    setFormData({ ...formData, plan: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-2 focus:border-or focus:ring-2 focus:ring-or"
                  disabled={isSubmitting}
                >
                  <option value="">Pas encore décidé</option>
                  <option value="essentiel">Essentiel</option>
                  <option value="premium">Premium</option>
                  <option value="signature">Signature</option>
                </select>
                {qs.get("plan") && (
                  <p className="mt-1 text-xs text-gray-500">
                    Pré-rempli depuis votre sélection ({qs.get("plan")}).
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Étape 3 : message */}
          <fieldset className="mt-8">
            <legend className="font-semibold text-encre mb-4">
              3 — Dites-nous l'essentiel
            </legend>
            <label className="block text-sm font-medium mb-2" htmlFor="message">
              Votre message
            </label>
            <textarea
              id="message"
              rows={6}
              maxLength={800}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Nombre d'invités, ambiance souhaitée, contraintes particulières, idées spécifiques..."
              aria-describedby="message-help"
              className="w-full rounded-lg border px-4 py-3 focus:border-or focus:ring-2 focus:ring-or
         resize-y overflow-auto min-h-[160px] max-h-[280px] sm:max-h-[320px]"
              disabled={isSubmitting}
            />
            <div
              id="message-help"
              className="mt-1 text-xs text-gray-500 text-right"
            >
              {remaining} caractères restants
            </div>
          </fieldset>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 rounded-full bg-or px-6 py-3 font-medium text-white shadow-sm transition hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer ma demande
                </>
              )}
            </button>
            <p className="mt-3 text-xs text-gray-600">
              Nous répondons rapidement. Aucune relance commerciale
              automatique.
            </p>
          </div>

          <hr className="my-6 border-gray-200" />

          <p className="text-[11px] leading-relaxed text-gray-500">
            En envoyant ce formulaire, vous acceptez que nous utilisions ces
            informations pour répondre à votre demande. Vos données ne sont
            ni revendues ni partagées à des tiers.{" "}
            <a href="/confidentialite" className="underline hover:text-gray-700">
              Politique de confidentialité
            </a>
          </p>
        </form>
      </section>
    </div>
  );
}

// Fallback pendant le chargement des search params
function ContactFormFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      <div className="container-max py-14">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant principal avec Suspense
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      <div className="container-max py-14">
        {/* En-tête */}
        <header className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-title text-4xl text-encre mb-3">
            Créons votre page de souvenirs
          </h1>
          <p className="text-gray-700">
            Racontez-nous votre événement. On prépare une proposition claire,
            sur-mesure et sans engagement.
          </p>

          {/* Petits gages de confiance - SANS DATES PRÉCISES */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-gray-700">
              <Clock className="w-3.5 h-3.5" />
              Réponse rapide garantie
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-gray-700">
              <CalendarDays className="w-3.5 h-3.5" />
              Mise en place express
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-gray-700">
              <Shield className="w-3.5 h-3.5" />
              Données privées par défaut
            </span>
          </div>
        </header>

        <Suspense fallback={<ContactFormFallback />}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}