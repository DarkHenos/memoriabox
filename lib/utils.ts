// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction pour formater les dates
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Fonction pour générer un ID unique
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// ==========================================
// INSTRUCTIONS COMPLÈTES DE LANCEMENT
// ==========================================

/*
 * 🚀 GUIDE DE DÉMARRAGE RAPIDE
 * 
 * 1. CRÉER LE PROJET
 * ------------------
 * mkdir memoriabox-nextjs
 * cd memoriabox-nextjs
 * 
 * 2. INITIALISER PACKAGE.JSON
 * ----------------------------
 * npm init -y
 * 
 * 3. INSTALLER TOUTES LES DÉPENDANCES
 * ------------------------------------
 * npm install next@latest react@latest react-dom@latest lucide-react framer-motion clsx tailwind-merge
 * npm install -D typescript @types/react @types/node @types/react-dom tailwindcss postcss autoprefixer
 * 
 * 4. CRÉER LA STRUCTURE DES DOSSIERS
 * -----------------------------------
 * mkdir -p app/{fonctionnalites,templates,tarifs,contact,faq,legal,cgu,confidentialite,api/contact}
 * mkdir -p components lib public/images
 * 
 * 5. INITIALISER TAILWIND
 * ------------------------
 * npx tailwindcss init -p
 * 
 * 6. CRÉER TOUS LES FICHIERS
 * ---------------------------
 * - Copier tous les fichiers de code fournis dans les bons dossiers
 * - S'assurer que chaque fichier est dans le bon répertoire
 * 
 * 7. STRUCTURE FINALE À VÉRIFIER
 * -------------------------------
 * memoriabox-nextjs/
 * ├── app/
 * │   ├── layout.tsx ✓
 * │   ├── page.tsx ✓
 * │   ├── globals.css ✓
 * │   ├── fonctionnalites/page.tsx ✓
 * │   ├── templates/page.tsx ✓
 * │   ├── tarifs/page.tsx ✓
 * │   ├── contact/page.tsx ✓
 * │   ├── faq/page.tsx ✓
 * │   ├── legal/page.tsx ✓
 * │   ├── cgu/page.tsx ✓
 * │   ├── confidentialite/page.tsx ✓
 * │   └── api/contact/route.ts ✓
 * ├── components/
 * │   ├── AppHeader.tsx ✓
 * │   ├── AppFooter.tsx ✓
 * │   ├── Hero.tsx ✓
 * │   ├── LogoIcon.tsx ✓
 * │   ├── PricingGrid.tsx ✓
 * │   ├── FAQSection.tsx ✓
 * │   └── ExperienceOrganizer.tsx ✓
 * ├── lib/
 * │   └── utils.ts ✓
 * ├── public/
 * │   └── images/
 * ├── package.json ✓
 * ├── next.config.js ✓
 * ├── tailwind.config.js ✓
 * ├── tsconfig.json ✓
 * └── postcss.config.js ✓
 * 
 * 8. LANCER LE PROJET
 * -------------------
 * npm run dev
 * 
 * Le site sera accessible sur : http://localhost:3000
 * 
 * 9. COMMANDES UTILES
 * -------------------
 * npm run dev     # Mode développement
 * npm run build   # Construire pour production
 * npm run start   # Lancer en production
 * 
 * 10. DÉPLOIEMENT SUR VERCEL
 * ---------------------------
 * - Créer un compte sur vercel.com
 * - Installer Vercel CLI : npm i -g vercel
 * - Dans le dossier du projet : vercel
 * - Suivre les instructions
 * 
 * 11. VARIABLES D'ENVIRONNEMENT (optionnel)
 * ------------------------------------------
 * Créer un fichier .env.local :
 * 
 * NEXT_PUBLIC_SITE_URL=http://localhost:3000
 * NEXT_PUBLIC_API_URL=http://localhost:3000/api
 * 
 * 12. BASE DE DONNÉES (pour plus tard)
 * -------------------------------------
 * Options recommandées :
 * - PostgreSQL avec Prisma
 * - MongoDB avec Mongoose
 * - Supabase (PostgreSQL hébergé)
 * 
 * 13. AUTHENTIFICATION (pour plus tard)
 * --------------------------------------
 * npm install next-auth
 * 
 * 14. PAIEMENT (pour plus tard)
 * ------------------------------
 * npm install stripe @stripe/stripe-js
 * 
 * 15. EMAILS (pour plus tard)
 * ----------------------------
 * npm install @sendgrid/mail
 * ou
 * npm install nodemailer
 * 
 * 🎯 CHECKLIST FINALE
 * -------------------
 * ✅ Tous les fichiers sont créés
 * ✅ Les dépendances sont installées
 * ✅ Le projet se lance sans erreur
 * ✅ La navigation fonctionne
 * ✅ Les styles s'affichent correctement
 * ✅ Le formulaire de contact fonctionne
 * ✅ Les pages sont responsives
 * 
 * 📝 NOTES IMPORTANTES
 * --------------------
 * - Les images dans /public/images/ sont des placeholders
 * - L'API de contact enregistre seulement en console pour l'instant
 * - Ajouter une vraie base de données pour la production
 * - Configurer un service d'email pour les notifications
 * - Implémenter Stripe pour les paiements réels
 * 
 * 🐛 RÉSOLUTION DE PROBLÈMES
 * --------------------------
 * Si erreur "Module not found" :
 * - Vérifier que tous les fichiers sont créés
 * - Relancer npm install
 * - Vérifier les chemins d'import
 * 
 * Si styles non appliqués :
 * - Vérifier tailwind.config.js
 * - Vérifier que globals.css est importé dans layout.tsx
 * - Redémarrer le serveur de développement
 * 
 * Si erreur TypeScript :
 * - Vérifier tsconfig.json
 * - S'assurer que tous les types sont installés
 * - Utiliser 'any' temporairement si besoin
 * 
 * 🚀 PRÊT À CODER !
 * -----------------
 * Votre projet MemoriaBox en Next.js est maintenant prêt.
 * Bon développement !
 */