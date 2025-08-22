// app/fonctionnalites/page.tsx
import Link from "next/link";
import {
  QrCode,
  Smartphone,
  MessageSquare,
  ShieldCheck,
  Download,
  Palette,
  Lock,
  CheckCircle2,
  Share2,
  Wand2,
  Sparkles,
  FolderDown,
  Eye,
  FileImage,
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      {/* HERO court et orienté bénéfices */}
      <section className="container-max pt-14 pb-10 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-title text-4xl md:text-5xl mt-4 mb-3 text-encre">
            Ce qui fait que <span className="text-or">ça marche</span>
            <br />
            <span className="text-encre/90">
              (même si vos invités ne sont pas “tech”)
            </span>
          </h1>
          <p className="text-gray-700">
            Notre objectif n’est pas d’ajouter des options. C’est d’obtenir des{" "}
            <strong>souvenirs</strong>, facilement, sans friction, dans un
            espace <strong>beau et privé</strong>.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/templates" className="btn btn-outline">
              Voir une page exemple
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Demander un accès anticipé
            </Link>
          </div>
        </div>
      </section>

      {/* Ce que vos invités vivent */}
      <section className="container-max pb-12">
        <div className="text-center mb-8">
          <h2 className="font-title text-2xl md:text-3xl text-encre">
            Pour vos invités : zéro blocage
          </h2>
          <p className="text-gray-700">
            Ils participent en 20 secondes, sans créer de compte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<QrCode className="w-6 h-6 text-or" />}
            title="Accès immédiat"
            desc="QR à scanner ou lien à toucher. Pas d’app, pas d’inscription."
          />
          <FeatureCard
            icon={<Smartphone className="w-6 h-6 text-or" />}
            title="Pensé mobile"
            desc="Interface claire et rapide, même en 4G moyenne."
          />
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6 text-or" />}
            title="Photos, vidéos, messages"
            desc="Partage en quelques secondes. On guide les moins à l’aise."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-or" />}
            title="Respect des invités"
            desc="Page privée. Vous décidez qui peut voir et contribuer."
          />
        </div>
      </section>

      {/* Ce que vous obtenez (organisateur) */}
      <section className="container-max pb-12">
        <div className="text-center mb-8">
          <h2 className="font-title text-2xl md:text-3xl text-encre">
            Pour vous : un espace privé et soigné. Vous récupérez tout
            facilement.
          </h2>

          <p className="text-gray-700">
            Vous gardez tout, facilement, sans tri interminable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Palette className="w-6 h-6 text-or" />}
            title="Design à votre image"
            desc="Couleurs, typographies et micro-textes alignés à votre ambiance."
          />
          <FeatureCard
            icon={<Lock className="w-6 h-6 text-or" />}
            title="Contrôle d’accès"
            desc="Lien privé, QR, code invité… vous choisissez l’ouverture."
          />
          <FeatureCard
            icon={<FolderDown className="w-6 h-6 text-or" />}
            title="Galerie propre"
            desc="On peut supprimer doublons/flous & orienter la mise en page."
            details="Option ‘modération & tri’ : utile après gros événements."
          />
          <FeatureCard
            icon={<Download className="w-6 h-6 text-or" />}
            title="Export final"
            desc="Zip haute qualité prêt à partager / sauvegarder."
          />
        </div>

        {/* Rassurances courtes */}
        <ul className="mt-8 grid md:grid-cols-3 gap-3 text-sm">
          {[
            {
              icon: <Eye className="w-5 h-5 text-or mt-0.5" />,
              txt: "Confidentialité d’abord : pas d’indexation publique",
            },
            {
              icon: <FileImage className="w-5 h-5 text-or mt-0.5" />,
              txt: "Qualité conservée, pas de compression agressive",
            },
            {
              icon: <CheckCircle2 className="w-5 h-5 text-or mt-0.5" />,
              txt: "Vous restez propriétaire des contenus",
            },
          ].map((it, i) => (
            <li key={i} className="flex items-start gap-2">
              {it.icon}
              <span className="text-gray-700">{it.txt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Narratif : avant / pendant / après */}
      <section className="container-max pb-12">
        <div className="text-center mb-8">
          <h2 className="font-title text-2xl md:text-3xl text-encre">
            Comment ça se passe — simplement
          </h2>
          <p className="text-gray-700">
            Le cerveau retient mieux un déroulé clair : on suit votre rythme.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <StepCard
            kicker="Avant"
            icon={<Wand2 className="w-5 h-5 text-or" />}
            title="On prépare, vous validez"
            desc="Vous nous donnez date & style. On configure et vous envoyons le QR + lien à diffuser."
          />
          <StepCard
            kicker="Pendant"
            icon={<Share2 className="w-5 h-5 text-or" />}
            title="Tout le monde participe"
            desc="Participation simple via QR ou lien, selon votre contexte. Partage en quelques secondes."
          />

          <StepCard
            kicker="Après"
            icon={<Download className="w-5 h-5 text-or" />}
            title="Vous récupérez tout"
            desc="Galerie propre et export final. Possibilité d’album photo, récap vidéo, etc."
          />
        </div>

        {/* Mini-FAQ de contexte (progressive disclosure) */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <QA
            q="Et si certains invités ne scannent pas le QR ?"
            a="On fournit aussi un lien court à copier-coller dans WhatsApp/SMS. Ça marche aussi bien."
          />
          <QA
            q="Peut-on garder la page ouverte plus longtemps ?"
            a="Oui. On propose une extension ‘Hébergement prolongé’ selon votre besoin."
          />
          <QA
            q="Qui peut voir les souvenirs ?"
            a="Par défaut, l’espace est privé. Vous choisissez les règles de visibilité et de contribution."
          />
        </div>
      </section>

      {/* CTA final — choix guidé, pas d’inflation de choix */}
      <section className="container-max pb-16">
        <div className="card p-8 text-center">
          <h3 className="font-title text-2xl text-encre mb-2">
            On regarde ensemble ?
          </h3>
          <p className="text-gray-700 mb-6">
            Dites-nous votre date et le style souhaité&nbsp;: on vous propose la
            configuration la plus simple pour obtenir de vrais souvenirs, sans
            surcharge.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/templates" className="btn btn-outline">
              Voir une page exemple
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Demander un accès anticipé
            </Link>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Aucun compte invité, vous conservez tous les contenus. Réponse
            rapide selon votre date.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Composants locaux, micro-interactions sobres ---------------- */

function FeatureCard({
  icon,
  title,
  desc,
  details,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  details?: string;
}) {
  return (
    <div className="card p-6 hover:shadow-md hover:scale-[1.01] transition">
      <div className="w-10 h-10 rounded-xl bg-or/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-encre mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>

      {details && (
        <details className="mt-3 text-sm">
          <summary className="text-encre/70 cursor-pointer select-none inline-flex items-center gap-1">
            <Sparkles className="w-4 h-4" /> En savoir plus
          </summary>
          <p className="mt-2 text-gray-600">{details}</p>
        </details>
      )}
    </div>
  );
}

function StepCard({
  kicker,
  icon,
  title,
  desc,
}: {
  kicker: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-6 text-center flex flex-col h-full">
      {/* Badge centré */}
      <span className="mx-auto mb-3 inline-flex items-center gap-1 rounded-full bg-white/80 border border-gray-200 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-encre/70">
        {kicker}
      </span>

      {/* Icône + titre */}
      <div className="mb-1 inline-flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full bg-or/10 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-encre">{title}</h3>
      </div>

      {/* Texte */}
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <details className="card p-4">
      <summary className="cursor-pointer text-sm font-medium text-encre">
        {q}
      </summary>
      <p className="text-sm text-gray-600 mt-2">{a}</p>
    </details>
  );
}
