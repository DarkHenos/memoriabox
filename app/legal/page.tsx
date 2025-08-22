// app/legal/page.tsx
export default function LegalPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
        <div className="container-max py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-title text-4xl mb-8 text-encre">Mentions légales</h1>
            
            <div className="card p-8 space-y-6">
              <section>
                <h2 className="font-title text-2xl mb-4">Éditeur du site</h2>
                <p className="text-gray-700">
                  MemoriaBox SAS<br />
                  Siège social : 123 rue de la Mémoire, 75001 Paris<br />
                  SIRET : 123 456 789 00012<br />
                  Capital social : 10 000€<br />
                  Email : contact@memoriabox.fr<br />
                  Téléphone : 06 12 34 56 78
                </p>
              </section>
  
              <section>
                <h2 className="font-title text-2xl mb-4">Directeur de publication</h2>
                <p className="text-gray-700">
                  Jean Dupont, Président de MemoriaBox SAS
                </p>
              </section>
  
              <section>
                <h2 className="font-title text-2xl mb-4">Hébergement</h2>
                <p className="text-gray-700">
                  Vercel Inc.<br />
                  340 S Lemon Ave #4133<br />
                  Walnut, CA 91789<br />
                  États-Unis
                </p>
              </section>
  
              <section>
                <h2 className="font-title text-2xl mb-4">Propriété intellectuelle</h2>
                <p className="text-gray-700">
                  L'ensemble du contenu de ce site (textes, images, vidéos) est protégé par le droit d'auteur. 
                  Toute reproduction sans autorisation est interdite.
                </p>
              </section>
  
              <section>
                <h2 className="font-title text-2xl mb-4">Protection des données</h2>
                <p className="text-gray-700">
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression 
                  de vos données personnelles. Pour exercer ces droits, contactez-nous à : rgpd@memoriabox.fr
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }