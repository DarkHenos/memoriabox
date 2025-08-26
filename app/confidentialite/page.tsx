// app/confidentialite/page.tsx
import { Lock, Database, Globe2, UserCheck, ShieldCheck, Clock, Cookie } from "lucide-react";

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      <div className="container-max py-16">
        <h1 className="font-title text-4xl text-center text-encre mb-6">
          Politique de confidentialité
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Votre confiance est essentielle. Cette politique explique comment nous collectons,
          utilisons et protégeons vos données lorsque vous utilisez MemoriaBox.
        </p>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Données collectées */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Quelles données collectons-nous ?</h2>
            </div>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Données de contact : email lors d’une prise de contact.</li>
              <li>Médias envoyés : photos, vidéos, messages déposés par les invités.</li>
              <li>Données techniques : cookies de session, adresse IP anonymisée.</li>
            </ul>
          </section>

          {/* Finalité */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Pourquoi collectons-nous ces données ?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Les données sont utilisées uniquement pour :
            </p>
            <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-2">
              <li>Permettre le fonctionnement de MemoriaBox (galerie, QR code, partage).</li>
              <li>Assurer la sécurité et la confidentialité des souvenirs déposés.</li>
              <li>Communiquer avec vous (support, assistance, suivi).</li>
            </ul>
          </section>

          {/* Stockage & hébergement */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Où et combien de temps sont stockées vos données ?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Les données sont hébergées par <strong>Vercel Inc.</strong> (États-Unis) sur des serveurs sécurisés. 
              Nous appliquons des standards modernes de chiffrement et de sécurité.
            </p>
            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <Clock className="h-5 w-5 text-or" />
              <span>Vos souvenirs restent accessibles le temps de votre formule, puis sont supprimés.</span>
            </div>
          </section>

          {/* Transfert international */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Globe2 className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Vos données sont-elles partagées ?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Vos données ne sont <strong>jamais revendues</strong>. Elles ne sont transmises qu’aux services strictement nécessaires au fonctionnement (hébergeur Vercel). 
              Aucun transfert n’est réalisé à d’autres tiers.
            </p>
          </section>

          {/* Cookies */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Utilisation des cookies</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              MemoriaBox utilise uniquement des cookies techniques et de mesure d’audience anonymisés. 
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>
          </section>

          {/* Droits utilisateurs */}
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-6 w-6 text-or" />
              <h2 className="font-title text-2xl text-encre">Quels sont vos droits ?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-2">
              <li>Droit d’accès, rectification et suppression de vos données.</li>
              <li>Droit de limiter ou vous opposer à leur traitement.</li>
              <li>Droit à la portabilité (export de vos données sur demande).</li>
            </ul>
            <p className="mt-3 text-gray-700">
              Pour exercer vos droits :{" "}
              <a href="mailto:contact@memoriabox.fr" className="text-or underline">contact@memoriabox.fr</a>
            </p>
          </section>

          {/* Conclusion rassurante */}
          <section className="card p-8 text-center">
            <h2 className="font-title text-2xl text-encre mb-3">En résumé</h2>
            <p className="text-gray-700 leading-relaxed">
              Vos souvenirs vous appartiennent. Nous ne les utilisons que pour vous offrir une expérience simple,
              sécurisée et privée. À tout moment, vous gardez le contrôle.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
