// app/cgu/page.tsx
export default function CGUPage() {
    const currentDate = new Date().toLocaleDateString('fr-FR')
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
        <div className="container-max py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-title text-4xl mb-4 text-encre">Conditions générales</h1>
              <p className="text-lg text-gray-600">
                Conditions d'utilisation et de vente des services MemoriaBox
              </p>
              <p className="text-sm text-gray-500 mt-2">Version du {currentDate}</p>
            </div>
  
            <div className="card p-8 space-y-8">
              <article>
                <h2 className="font-title text-2xl mb-4 text-encre">
                  Article 1 - Objet et champ d'application
                </h2>
                <p className="text-gray-700 mb-4">
                  Les présentes Conditions Générales d'Utilisation et de Vente régissent 
                  l'utilisation des services proposés par MemoriaBox, société spécialisée dans la création 
                  de pages web personnalisées pour collecter et partager des souvenirs d'événements.
                </p>
              </article>
  
              <article>
                <h2 className="font-title text-2xl mb-4 text-encre">
                  Article 2 - Description des services
                </h2>
                <p className="text-gray-700 mb-4">
                  MemoriaBox propose la création de pages web personnalisées permettant :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>La collecte de photos, vidéos et messages</li>
                  <li>Le partage sécurisé avec les invités</li>
                  <li>La conservation des souvenirs dans un espace privé</li>
                  <li>L'export et le téléchargement des contenus</li>
                </ul>
              </article>
  
              <article>
                <h2 className="font-title text-2xl mb-4 text-encre">
                  Article 3 - Tarifs et paiement
                </h2>
                <p className="text-gray-700">
                  Les tarifs sont indiqués en euros TTC. Le paiement s'effectue en ligne 
                  par carte bancaire sécurisée. Les formules proposées sont :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>Essai Découverte : 79€ pour 7 jours</li>
                  <li>Célébration : 199€ pour 3 mois</li>
                  <li>Premium : 399€ pour 1 an</li>
                </ul>
              </article>
  
              <article>
                <h2 className="font-title text-2xl mb-4 text-encre">
                  Article 4 - Propriété intellectuelle
                </h2>
                <p className="text-gray-700">
                  Les utilisateurs conservent tous les droits sur leurs contenus. 
                  MemoriaBox s'engage à ne pas utiliser ces contenus à d'autres fins 
                  que la fourniture du service.
                </p>
              </article>
  
              <article>
                <h2 className="font-title text-2xl mb-4 text-encre">
                  Article 5 - Protection des données
                </h2>
                <p className="text-gray-700">
                  MemoriaBox s'engage à protéger les données personnelles conformément au RGPD. 
                  Pour plus d'informations, consultez notre politique de confidentialité.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    )
  }