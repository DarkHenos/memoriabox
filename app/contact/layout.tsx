// app/contact/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact MemoriaBox - Créez votre page de souvenirs',
  description:
    "Parlez-nous de votre événement et recevez une proposition sur mesure. Mariages, anniversaires, baptêmes, événements d’entreprise : centralisez vos souvenirs avec MemoriaBox.",
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
