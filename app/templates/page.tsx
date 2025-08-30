// app/templates/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Cake,
  Baby,
  Briefcase,
  Camera,
  Palette,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Eye,
} from "lucide-react";

interface Template {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  icon: any;
  gradient: string;
  features: string[];
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("tous");

  const templates: Template[] = [
    {
      id: "mariage-champetre",
      title: "Mariage Champêtre",
      subtitle: "Marie & Thomas - Juin 2024",
      category: "mariage",
      description:
        "Ambiance bucolique avec palette de couleurs douces et naturelles.",
      icon: Heart,
      gradient: "from-pink-400 to-rose-600",
      features: [
        "Palette rose poudré et vert sauge",
        "Section cérémonie et soirée",
        "Messages vidéo des invités",
      ],
    },
    {
      id: "mariage-elegant",
      title: "Mariage Élégant",
      subtitle: "Sophie & Alexandre - Septembre 2024",
      category: "mariage",
      description: "Design moderne et épuré avec touches dorées.",
      icon: Heart,
      gradient: "from-amber-400 to-orange-600",
      features: [
        "Thème or et blanc",
        "Timeline de la journée",
        "Livre d’or interactif",
      ],
    },
    {
      id: "anniversaire-50",
      title: "50 ans en Or",
      subtitle: "Jean-Pierre - Avril 2024",
      category: "anniversaire",
      description: "Célébration d’un demi-siècle avec style et nostalgie.",
      icon: Cake,
      gradient: "from-yellow-400 to-amber-600",
      features: [
        "Frise chronologique",
        "Photos d’époque",
        "Messages surprises",
      ],
    },
    {
      id: "anniversaire-30",
      title: "30 ans Festif",
      subtitle: "Emma - Juillet 2024",
      category: "anniversaire",
      description: "Soirée moderne et colorée pour marquer les 30 ans.",
      icon: Cake,
      gradient: "from-purple-400 to-pink-600",
      features: ["Design néon", "Section soirée dansante", "Défis photo"],
    },
    {
      id: "bapteme-moderne",
      title: "Baptême Doux",
      subtitle: "Petit Louis - Mai 2024",
      category: "bapteme",
      description: "Célébration familiale avec design pastel et moderne.",
      icon: Baby,
      gradient: "from-blue-400 to-cyan-600",
      features: [
        "Couleurs pastel",
        "Album famille",
        "Messages parrain et marraine",
      ],
    },
    {
      id: "retraite-memorable",
      title: "Départ Mémorable",
      subtitle: "Michel - 35 ans de carrière",
      category: "entreprise",
      description: "Hommage professionnel pour une carrière exceptionnelle.",
      icon: Briefcase,
      gradient: "from-slate-600 to-slate-800",
      features: ["Messages collègues", "Timeline carrière", "Vidéos souvenirs"],
    },
  ];

  const categories = [
    { value: "tous", label: "Tous", icon: Sparkles, count: templates.length },
    {
      value: "mariage",
      label: "Mariages",
      icon: Heart,
      count: templates.filter((t) => t.category === "mariage").length,
    },
    {
      value: "anniversaire",
      label: "Anniversaires",
      icon: Cake,
      count: templates.filter((t) => t.category === "anniversaire").length,
    },
    {
      value: "bapteme",
      label: "Baptêmes",
      icon: Baby,
      count: templates.filter((t) => t.category === "bapteme").length,
    },
    {
      value: "entreprise",
      label: "Entreprise",
      icon: Briefcase,
      count: templates.filter((t) => t.category === "entreprise").length,
    },
  ];

  const filteredTemplates =
    selectedCategory === "tous"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-or/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-beige/20 rounded-full blur-3xl" />

        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-or/10 text-or px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Camera className="w-4 h-4" />
              Inspirations & Réalisations
            </div>
            <h1 className="font-title text-4xl md:text-5xl text-encre mb-6">
              Des pages uniques pour vos{" "}
              <span className="text-or">moments précieux</span>
            </h1>
            <p className="text-lg text-gray-700">
              Découvrez nos créations personnalisées. Chaque événement mérite
              une page qui lui ressemble.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtres */}
      <section className="container-max pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon as any;
            const isActive = selectedCategory === cat.value;
            return (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.value)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-all
                  ${
                    isActive
                      ? "bg-or text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-or/50"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{cat.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-gray-100"
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Grille */}
      <section className="container-max pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => {
            const Icon = template.icon;
            return (
              <motion.article
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* VISUEL 100% CLIQUABLE */}
                <Link
                  href={`/templates/${template.id}`}
                  className="relative block h-48 overflow-hidden focus:outline-none"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-90`}
                  />

                  {/* Mockup de page */}
                  <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-white/50 rounded-full" />
                      <div className="w-2 h-2 bg-white/50 rounded-full" />
                      <div className="w-2 h-2 bg-white/50 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/30 rounded w-3/4" />
                      <div className="h-2 bg-white/20 rounded w-1/2" />
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="h-12 bg-white/20 rounded" />
                        <div className="h-12 bg-white/20 rounded" />
                        <div className="h-12 bg-white/20 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Overlay de feedback au survol/focus (ne bloque pas le clic) */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                    <span className="rounded-xl bg-black/45 px-3 py-2 text-white text-sm font-medium inline-flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Voir un aperçu de cette page
                    </span>
                  </div>

                  {/* Icône en haut à droite */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </Link>

                {/* Contenu - hauteurs uniformisées */}
                <div className="p-5 flex flex-col gap-3 grow">
                  <div>
                    <h3 className="font-title text-xl text-encre">
                      {template.title}
                    </h3>
                    <p className="text-sm text-gray-500">{template.subtitle}</p>
                  </div>

                  <p className="text-sm text-gray-600 min-h-[3.25rem]">
                    {template.description}
                  </p>

                  <div className="space-y-1 min-h-[4.25rem] overflow-hidden">
                    {template.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-600"
                      >
                        <ChevronRight className="w-3 h-3 text-or mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/contact?template=${template.id}`}
                      className="btn btn-outline w-full group/btn"
                    >
                      Créer ma page similaire
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA final */}
      <section className="container-max pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-or/5 to-beige/10 rounded-3xl p-8 md:p-12 text-center border border-or/10"
        >
          <Palette className="w-12 h-12 text-or mx-auto mb-4" />
          <h2 className="font-title text-2xl md:text-3xl text-encre mb-4">
            Votre événement est unique
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Ces exemples sont des inspirations. Nous créons chaque page
            sur-mesure selon vos goûts, vos couleurs et l’ambiance de votre
            événement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fonctionnalites" className="btn btn-outline">
              Voir toutes les options
            </Link>
            <Link href="/contact" className="btn btn-primary group">
              Créer ma page personnalisée
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
