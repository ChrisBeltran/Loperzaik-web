import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import AddToCartBtn from '@/components/product/AddToCartBtn';
import Galeria from '@/components/product/Galeria';
import { getProductoBySlug, getProductosRelacionados, productos } from '@/data/productos';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductoBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.nombre} - Loperzaik`,
    description: p.descripcion,
    openGraph: { title: p.nombre, description: p.descripcion, images: [{ url: p.imagen }] },
  };
}

const fmt = (n: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
const WA_NUMBER = '573000000000';

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);
  if (!producto) notFound();

  const relacionados = getProductosRelacionados(producto.categoria, producto.slug);
  const isProximamente = producto.etiquetas.includes('Próximamente');
  const waMsj = encodeURIComponent(`¡Hola! Me interesa: ${producto.nombre} — ${fmt(producto.precio)}. ¿Está disponible?`);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: producto.nombre, description: producto.descripcion,
    image: producto.imagenes,
    brand: { '@type': 'Brand', name: producto.marca || 'Loperzaik' },
    offers: {
      '@type': 'Offer', priceCurrency: 'COP', price: producto.precio,
      availability: producto.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    ...(producto.rating > 0 && {
      aggregateRating: { '@type': 'AggregateRating', ratingValue: producto.rating, reviewCount: producto.reviews },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-gray-700">Inicio</Link>
          <span>/</span>
          <Link href={`/categoria/${producto.categoria}`} className="hover:text-gray-700 capitalize">{producto.categoria}</Link>
          <span>/</span>
          <span className="text-gray-700 truncate">{producto.nombre}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-14">

          {/* ── GALERÍA DESLIZABLE ── */}
          <Galeria imagenes={producto.imagenes} nombre={producto.nombre}/>

          {/* ── INFO PRODUCTO ── */}
          <div>
            {producto.marca && <p className="text-sm text-gray-400 mb-1 uppercase tracking-wide">{producto.marca}</p>}
            <h1 className="text-2xl md:text-3xl font-bold text-[#4410b9] mb-3 leading-snug">{producto.nombre}</h1>

            {producto.rating > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(producto.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">{producto.rating} ({producto.reviews} reseñas)</span>
              </div>
            )}

            <p className="text-gray-600 mb-5 leading-relaxed text-sm md:text-base">{producto.descripcionLarga || producto.descripcion}</p>

            {!isProximamente && (
              <div className="flex items-end gap-3 mb-4">
                <span className="text-3xl font-bold text-[#4410b9]">{fmt(producto.precio)}</span>
                {producto.precioAnterior && <span className="text-lg text-gray-400 line-through mb-1">{fmt(producto.precioAnterior)}</span>}
              </div>
            )}

            <div className="flex items-center gap-2 mb-5">
              <div className={`w-2 h-2 rounded-full ${producto.stock > 0 ? 'bg-green-500' : 'bg-red-400'}`}/>
              <span className={`text-sm ${producto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {isProximamente ? 'Próximamente disponible' : producto.stock > 0 ? `En stock · ${producto.stock} unidades` : 'Agotado'}
              </span>
            </div>

            {!isProximamente && producto.stock > 0 && (
              <div className="space-y-3 mb-6">
                <AddToCartBtn producto={producto}/>
                <a href={`https://wa.me/${WA_NUMBER}?text=${waMsj}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">
                  💬 Pedir por WhatsApp
                </a>
              </div>
            )}

            {/* Especificaciones */}
            {Object.keys(producto.especificaciones).length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <h2 className="font-semibold text-[#4410b9] mb-3 text-sm uppercase tracking-wide">Especificaciones</h2>
                <div className="space-y-0">
                  {Object.entries(producto.especificaciones).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm py-2 border-b border-gray-200 last:border-0">
                      <span className="text-gray-500">{k}</span>
                      <span className="text-[#4410b9] font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Productos relacionados */}
        {relacionados.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#4410b9] mb-4">Productos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {relacionados.map((p) => <ProductCard key={p.id} producto={p}/>)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
