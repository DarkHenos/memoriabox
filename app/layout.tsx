// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'MemoriaBox - Souvenirs numériques pour mariages, anniversaires et événements',
  description:
    'Créez une galerie privée pour rassembler photos, vidéos et messages de vos invités. Mariages, anniversaires, baptêmes, événements d’entreprise : une solution simple, sécurisée et inoubliable.',
  keywords: [
    'souvenirs numériques',
    'mariage digital',
    'photobooth smartphone',
    'videobooth',
    'livre d’or en ligne',
    'galerie photo mariage',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <AppHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <AppFooter />
      </body>
    </html>
  )
}
