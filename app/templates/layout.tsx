// app/templates/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exemples de pages MemoriaBox - Mariages, anniversaires, baptêmes',
  description:
    "Inspirez-vous de nos modèles de pages personnalisées : mariages champêtres, anniversaires, baptêmes ou retraites. Chaque page est unique et rassemble tous vos souvenirs numériques.",
  alternates: { canonical: '/templates' },
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
