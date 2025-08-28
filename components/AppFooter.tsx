// components/AppFooter.tsx
import Link from 'next/link'
import LogoIcon from './LogoIcon'

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M19 3A2.94 2.94 0 0 1 22 6v12a2.94 2.94 0 0 1-3 3H5a2.94 2.94 0 0 1-3-3V6a2.94 2.94 0 0 1 3-3h14ZM8.34 9.75H6V18h2.34V9.75ZM7.17 6.75A1.42 1.42 0 1 0 7.18 9a1.42 1.42 0 0 0-.01-2.25ZM18 18v-4.53c0-2.43-1.3-3.57-3.03-3.57a2.62 2.62 0 0 0-2.37 1.3h-.03V9.75H10.4V18h2.34v-4.35c0-1.15.22-2.26 1.64-2.26s1.66 1.2 1.66 2.33V18H18Z"/>
    </svg>
  );
}

export default function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-white">
      <div className="h-px bg-gradient-to-r from-transparent via-or/40 to-transparent" />

      <div className="container-max py-12 grid grid-cols-1 sm:grid-cols-4 gap-10 text-sm">
        {/* Marque */}
        <div className="text-center sm:text-left">
          <div className="inline-flex sm:flex items-center gap-3 mb-4 group cursor-pointer hover:scale-[1.02] transition-transform">
            <LogoIcon size={32} />
            <span className="font-title text-lg group-hover:text-or transition-colors">
              MemoriaBox
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-xs mx-auto sm:mx-0">
            Préservez et partagez vos plus beaux souvenirs en famille.
          </p>

          {/* Réseaux */}
          <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
            <a
              href="https://www.linkedin.com/company/memoriabox-fr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MemoriaBox sur LinkedIn"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-gray-700 hover:text-or hover:border-or transition-colors"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Suivez-nous</span>
            </a>
          </div>
        </div>

        {/* Liens Produit */}
        <div className="text-center sm:text-left">
          <p className="font-medium mb-3 text-gray-800">Produit</p>
          <ul className="space-y-2">
            <li><Link className="f-link" href="/templates">Idées</Link></li>
            <li><Link className="f-link" href="/fonctionnalites">Ce que vous allez aimer</Link></li>
            <li><Link className="f-link" href="/tarifs">Tarifs</Link></li>
            <li><Link className="f-link" href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Liens Légal */}
        <div className="text-center sm:text-left">
          <p className="font-medium mb-3 text-gray-800">Légal</p>
          <ul className="space-y-2">
            <li><Link className="f-link" href="/legal">Mentions légales</Link></li>
            <li><Link className="f-link" href="/cgu">Conditions générales</Link></li>
            <li><Link className="f-link" href="/confidentialite">Confidentialité</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">
          <p className="font-medium mb-3 text-gray-800">Nous contacter</p>
          <ul className="space-y-2">
            <li><a className="f-link" href="mailto:contact@memoriabox.fr">contact@memoriabox.fr</a></li>
          </ul>
        </div>
      </div>

      {/* Barre de bas de page */}
      <div className="border-t bg-gray-50/80">
        <div className="container-max py-4 flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-center text-xs text-gray-500">
          <p>&copy; {currentYear} MemoriaBox. Tous droits réservés.</p>
          <p>Créé avec ❤️ pour préserver vos souvenirs</p>
        </div>
      </div>
    </footer>
  )
}
