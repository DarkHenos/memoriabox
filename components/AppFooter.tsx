// components/AppFooter.tsx
import Link from 'next/link'
import LogoIcon from './LogoIcon'

export default function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-white">
      <div className="h-px bg-gradient-to-r from-transparent via-or/40 to-transparent" />
      
      <div className="container-max py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
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
