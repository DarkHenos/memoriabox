// app/cgu/page.tsx
import { FileText, Coins, Image as ImgIcon, Shield, UserCheck, Clock, AlertTriangle } from "lucide-react";

export default function CGUPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      <div className="container-max py-16">
        {/* Titre principal */}
        <h1 className="font-title text-4xl text-center text-encre mb-6">
          Conditions générales d’utilisation
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Les présentes conditions régissent l’utilisation du service MemoriaBox.
          En accédant au site, vous acceptez ces conditions.
        </p>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {/* Objet */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Article 1 - Objet</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              MemoriaBox est une solution permettant la collecte et le partage de souvenirs
              numériques (photos, vidéos, messages) lors d’événements privés ou professionnels.
            </p>
          </section>

          {/* Services et tarifs */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Article 2 - Services et tarifs</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Trois formules sont proposées :<br />
              - <strong>Essai Découverte</strong> : 99€ TTC<br />
              - <strong>Classique</strong> : 199€ TTC (hors offre de lancement)<br />
              - <strong>Premium</strong> : 299€ TTC (hors offre de lancement)<br />
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Les prix sont indiqués en euros toutes taxes comprises. Le paiement s’effectue
              en ligne de manière sécurisée.
            </p>
          </section>

          {/* Contenu utilisateur */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <ImgIcon className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Article 3 - Contenu des utilisateurs</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Les utilisateurs sont seuls responsables du contenu déposé (photos, vidéos, messages).
              Tout contenu illégal, diffamatoire, discriminatoire ou portant atteinte aux droits
              de tiers est strictement interdit et pourra être supprimé.
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Article 4 - Propriété intellectuelle</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Les marques, logos, graphismes et codes utilisés par MemoriaBox restent la propriété
              exclusive de leur auteur. Les utilisateurs conservent l’intégralité des droits sur
              leurs contenus déposés.
            </p>
          </section>

          {/* Durée et résiliation */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Article 5 - Durée et résiliation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              L’accès à la galerie privée est limité à la durée prévue par la formule choisie.
              À l’issue de cette période, les données sont supprimées de nos serveurs.
            </p>
          </section>

          {/* Responsabilités */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Article 6 - Responsabilités</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              MemoriaBox met en œuvre tous les moyens nécessaires pour assurer un service fiable.
              Toutefois, la responsabilité de MemoriaBox ne saurait être engagée en cas d’interruption
              temporaire, de force majeure ou de perte de données indépendante de sa volonté.
            </p>
          </section>

          {/* Données personnelles */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Article 7 - Données personnelles</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Le traitement des données personnelles est détaillé dans la{" "}
              <a href="/confidentialite" className="text-or underline">
                Politique de confidentialité
              </a>
              . Conformément au RGPD, chaque utilisateur dispose d’un droit d’accès, de rectification
              et de suppression de ses données :{" "}
              <a href="mailto:contact@memoriabox.fr" className="text-or underline">
                contact@memoriabox.fr
              </a>
              .
            </p>
          </section>

          {/* Dernière mise à jour */}
          <section className="card p-6 text-center">
            <p className="text-sm text-gray-500">Dernière mise à jour : août 2025</p>
          </section>
        </div>
      </div>
    </main>
  );
}
