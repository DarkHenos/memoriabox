// app/templates/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Template {
  id: string
  title: string
  category: string
  description: string
  image: string
  features: string[]
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('tous')

  const templates: Template[] = [
    {
      id: 'mariage-champetre',
      title: 'Mariage Champêtre',
      category: 'mariage',
      description: 'Une ambiance bucolique et romantique pour votre grand jour',
      image: '/images/template-mariage-champetre.jpg',
      features: ['Photos illimitées', 'Messages vidéo', 'Livre d\'or digital']
    },
    {
      id: 'anniversaire-50',
      title: '50 ans d\'or',
      category: 'anniversaire',
      description: 'Célébrez un demi-siècle de souvenirs',
      image: '/images/template-anniversaire-50.jpg',
      features: ['Timeline personnalisée', 'Galerie photos', 'Messages d\'invités']
    },
    {
      id: 'bapteme-moderne',
      title: 'Baptême Moderne',
      category: 'bapteme',
      description: 'Un design épuré pour ce moment unique',
      image: '/images/template-bapteme.jpg',
      features: ['Album photo', 'Messages de parrain/marraine', 'Partage famille']
    },
    {
      id: 'retraite-memorable',
      title: 'Départ Mémorable',
      category: 'retraite',
      description: 'Honorez une carrière exceptionnelle',
      image: '/images/template-retraite.jpg',
      features: ['Messages collègues', 'Photos carrière', 'Vidéos souvenirs']
    }
  ]

  const categories = [
    { value: 'tous', label: 'Tous' },
    { value: 'mariage', label: 'Mariage' },
    { value: 'anniversaire', label: 'Anniversaire' },
    { value: 'bapteme', label: 'Baptême' },
    { value: 'retraite', label: 'Retraite' }
  ]

  const filteredTemplates = selectedCategory === 'tous'
    ? templates
    : templates.filter(t => t.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      <div className="container-max py-16">
        <div className="text-center mb-12">
          <h1 className="font-title text-4xl mb-4 text-encre">Nos réalisations</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Découvrez quelques exemples de pages créées pour nos clients.
            Chaque projet est unique et personnalisé.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === cat.value
                  ? 'bg-or text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTemplates.map(template => (
            <div key={template.id} className="card overflow-hidden group">
              <div className="aspect-video bg-gray-100 relative">
                {/* Placeholder visuel */}
                <div className="absolute inset-0 bg-gradient-to-br from-or/20 to-beige/40 flex items-center justify-center">
                  <span className="text-4xl">🎨</span>
                </div>
              </div>

              <div className="p-6">
                <span className="badge mb-3">{template.category}</span>
                <h3 className="font-title text-xl mb-2 text-encre">{template.title}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>

                <ul className="space-y-1 mb-4">
                  {template.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-or">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={`/contact?template=${template.id}`} className="btn btn-outline w-full">
                  Créer une page similaire
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Vous ne trouvez pas ce que vous cherchez ?</p>
          <Link href="/contact" className="btn btn-primary">
            Créons votre page sur mesure
          </Link>
        </div>
      </div>
    </div>
  )
}
