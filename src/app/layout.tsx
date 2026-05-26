import type { Metadata } from 'next';

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';



export const metadata: Metadata = {
  title: { default: 'Loperzaik | Tecnología de Vanguardia', template: '%s | Loperzaik' },
  description: 'Tienda de electrónica y accesorios en Colombia. Audífonos Bluetooth, parlantes, teclados, mouse, cargadores y cables. Envío a domicilio.',
  keywords: ['audífonos colombia', 'parlante bluetooth colombia', 'accesorios pc colombia', 'cargador celular colombia', 'loperzaik'],
  openGraph: {
    siteName: 'Loperzaik',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`bg-gray-50`}>
        <Header />
        <main className="pt-[120px] md:pt-[140px] min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
