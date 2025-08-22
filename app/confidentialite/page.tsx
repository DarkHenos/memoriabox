// app/confidentialite/page.tsx
export default function PrivacyPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
        <div className="container-max py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-title text-4xl mb-4 text-encre">Politique de confidentialité</h1>
              <p className="text-lg text-gray-600">
                Comment nous protégeons vos données et souvenirs
              </p>
            </div>
  
            <div className="card p-8 space-y-8">
              <section>
                <h2 className="font-title text-2xl mb-4 text-encre flex items-center gap-3">
                  <span className="text-3xl">🔒</span>
                  Collecte des données
                </h2>
                <p className="text-gray-700 mb-4">
                  Nous collectons uniquement les données nécessaires au fonctionnement du service :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Informations de compte (nom, email)</li>
                  <li>Contenus partagés (photos, vidéos, messages)</li>
                  <li>Données de navigation (cookies techniques)</li>
                </ul>
              </section>
  
              <section>
                <h2 className="font-title text-2xl mb-4 text-encre flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Utilisation des données
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-or pl-4">
                    <h4 className="font-semibold text-encre">Fournir notre service</h4>
                    <p className="text-gray-700 text-sm">
                      Créer et héberger vos pages de souvenirs, traiter vos contenus, 
                      assurer le bon fonctionnement technique.
                    </p>
                  </div>
                  <div className="border-l-4 border-beige pl-4">
                    <h4 className="font-semibold text-encre">Communication</h4>
                    <p className="text-gray-700 text-sm">
                      Répondre à vos demandes, vous tenir informé de l'évolution de votre projet, 
                      support client.
                    </p>
                  </div>
                </div>
              </section>
  
              <section>
                <h2 className="font-title text-2xl mb-4 text-encre flex items-center gap-3">
                  <span className="text-3xl">🛡️</span>
                  Protection des données
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-or rounded-full"></span>
                    <strong>Chiffrement SSL</strong> pour toutes les connexions
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-or rounded-full"></span>
                    <strong>Serveurs sécurisés</strong> en Europe
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-or rounded-full"></span>
                    <strong>Accès restreint</strong> aux données personnelles
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-or rounded-full"></span>
                    <strong>Suppression automatique</strong> après expiration
                  </li>
                </ul>
              </section>
  
              <section>
                <h2 className="font-title text-2xl mb-4 text-encre flex items-center gap-3">
                  <span className="text-3xl">✅</span>
                  Vos droits
                </h2>
                <p className="text-gray-700 mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Pour exercer ces droits : rgpd@memoriabox.fr
                </p>
              </section>
  
              <section>
                <h2 className="font-title text-2xl mb-4 text-encre">Contact</h2>
                <p className="text-gray-700">
                  Pour toute question concernant vos données :<br />
                  Email : rgpd@memoriabox.fr<br />
                  Adresse : MemoriaBox, 123 rue de la Mémoire, 75001 Paris
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }