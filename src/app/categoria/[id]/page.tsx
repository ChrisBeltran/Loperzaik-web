import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { categorias, getProductosByCategoria } from '@/data/productos';
import Link from 'next/link';

interface Props { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return categorias.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cat = categorias.find((c) => c.id === id);
  if (!cat) return {};
  return {
    title: `${cat.nombre} - Loperzaik`,
    description: `Compra ${cat.nombre} en Loperzaik. ${cat.descripcion}. Envío a domicilio en Colombia.`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { id } = await params;
  const categoria = categorias.find((c) => c.id === id);
  if (!categoria) notFound();
  const prods = getProductosByCategoria(id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700">Inicio</Link>
        <span>/</span>
        <span className="text-gray-700">{categoria.nombre}</span>
      </nav>
      <div className="relative bg-[#4410b9] rounded-2xl overflow-hidden mb-8 p-8 md:p-12">
        <img src={categoria.imagen} alt={categoria.nombre} className="absolute inset-0 w-full h-full object-cover opacity-20"/>
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{categoria.nombre}</h1>
          <p className="text-gray-300">{categoria.descripcion}</p>
        </div>
      </div>
      {prods.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {prods.map((p) => <ProductCard key={p.id} producto={p}/>)}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No hay productos disponibles aún.</p>
        </div>
      )}
    </div>
  );
}
