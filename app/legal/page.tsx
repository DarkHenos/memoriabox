// app/legal/page.tsx
import { Building2, Server, ShieldCheck, Scale, Mail, User } from "lucide-react";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      <div className="container-max py-16">
        {/* Titre principal */}
        <h1 className="font-title text-4xl text-center text-encre mb-6">
          Mentions légales
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Conformément à la législation française (loi n°2004-575 du 21 juin 2004
          pour la confiance dans l’économie numérique), voici les informations
          légales du site MemoriaBox.
        </p>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Éditeur */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Éditeur du site</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <User className="inline-block w-4 h-4 mr-1 text-gray-500" />
              <strong>Alexis Ossart</strong> - Entrepreneur individuel (micro-entrepreneur).<br />
              <Mail className="inline-block w-4 h-4 mr-1 text-gray-500" />
              Email :{" "}
              <a href="mailto:contact@memoriabox.fr" className="text-or underline">
                contact@memoriabox.fr
              </a>
              <br />
              Adresse : pas de local commercial ouvert au public.<br />
              <span className="text-sm text-gray-500">
                L’immatriculation SIRET sera publiée dès son attribution.
              </span>
            </p>
          </section>

          {/* Hébergement */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Server className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Hébergement</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789 - États-Unis<br />
              Site :{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-or underline"
              >
                vercel.com
              </a>
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">
                Propriété intellectuelle
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              L’ensemble des éléments présents sur ce site (textes, images,
              vidéos, logos, code) est protégé par le droit d’auteur et la
              législation française. Toute reproduction totale ou partielle sans
              autorisation est interdite.
            </p>
          </section>

          {/* Données personnelles */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">
                Données personnelles
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Le traitement des données personnelles est régi par notre{" "}
              <a
                href="/confidentialite"
                className="text-or underline"
              >
                Politique de confidentialité
              </a>
              . Vous disposez d’un droit d’accès, de rectification et de suppression
              de vos données, conformément au RGPD. Contact :{" "}
              <a href="mailto:contact@memoriabox.fr" className="text-or underline">
              contact@memoriabox.fr
              </a>
              .
            </p>
          </section>

          {/* Dernière mise à jour */}
          <section className="card p-6 text-center">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : août 2025
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
