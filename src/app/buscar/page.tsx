import type { Metadata } from 'next';
import ProductCard from '@/components/product/ProductCard';
import { buscarProductos } from '@/data/productos';

interface Props { searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `"${q}" - Búsqueda | Loperzaik` : 'Buscar productos | Loperzaik' };
}

export default async function BuscarPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const resultados = q ? buscarProductos(q) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#4410b9] mb-1">
        {q ? `Resultados para "${q}"` : 'Buscar productos'}
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        {q ? `${resultados.length} resultado${resultados.length !== 1 ? 's' : ''} encontrado${resultados.length !== 1 ? 's' : ''}` : 'Escribe algo para buscar'}
      </p>
      {resultados.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resultados.map((p) => <ProductCard key={p.id} producto={p}/>)}
        </div>
      ) : q ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-4">No encontramos productos para &quot;{q}&quot;</p>
          <p className="text-gray-400 text-sm">Intenta con otro término como: audífonos, parlante, teclado, cargador</p>
        </div>
      ) : null}
    </div>
  );
}
