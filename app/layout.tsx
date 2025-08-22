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
  title: 'MemoriaBox - Créez des pages de souvenirs uniques',
  description: 'Collectez et partagez les plus beaux souvenirs de vos événements avec vos proches',
  keywords: 'souvenirs, événements, mariage, anniversaire, photos, vidéos, messages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
