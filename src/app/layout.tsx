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
  const WA_NUMBER = '573000000000';
  const WA_MSG = encodeURIComponent('¡Hola! Quiero información sobre sus productos.');

  return (
    <html lang="es">
      <body className="bg-gray-50">
        <Header />
        <main className="pt-[120px] md:pt-[140px] min-h-screen">
          {children}
        </main>

        {/* BOTÓN FLOTANTE WHATSAPP */}
        
          href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Contactar por WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.057 23.5l5.79-1.519A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.886 9.886 0 01-5.034-1.378l-.36-.214-3.742.981.998-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
          </svg>
        </a>

        <Footer />
      </body>
    </html>
  );
}