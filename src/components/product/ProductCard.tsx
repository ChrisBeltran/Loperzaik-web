'use client';
import Link from 'next/link';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import type { Producto } from '@/types';

const fmt = (n: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

export default function ProductCard({ producto }: { producto: Producto }) {
  const addItem = useCartStore((s) => s.addItem);
  const isProximamente = producto.etiquetas.includes('Próximamente');

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all">
      <Link href={`/productos/${producto.slug}`}>
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {producto.etiquetas[0] && (
            <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
              isProximamente ? 'bg-gray-800 text-white' :
              producto.etiquetas[0] === 'Nuevo' ? 'bg-gray-900 text-white' :
              'bg-gray-700 text-white'
            }`}>
              {producto.etiquetas[0]}
            </span>
          )}
        </div>
      </Link>
      <div className="p-3">
        <p className="text-xs text-gray-400 mb-0.5 capitalize">{producto.subcategoria}</p>
        <Link href={`/productos/${producto.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors mb-1">{producto.nombre}</h3>
        </Link>
        {producto.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <FiStar size={11} className="fill-amber-400 text-amber-400"/>
            <span className="text-xs text-gray-500">{producto.rating} ({producto.reviews})</span>
          </div>
        )}
        <div className="flex items-center justify-between mt-2">
          <div>
            {isProximamente ? (
              <span className="text-sm text-gray-400">Próximamente</span>
            ) : (
              <>
                {producto.precioAnterior && <span className="text-xs text-gray-400 line-through mr-1">{fmt(producto.precioAnterior)}</span>}
                <span className="text-base font-bold text-gray-900">{fmt(producto.precio)}</span>
              </>
            )}
          </div>
          {!isProximamente && producto.stock > 0 && (
            <button
              onClick={() => { addItem(producto); }}
              className="p-2 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-colors"
              aria-label="Agregar al carrito"
            >
              <FiShoppingCart size={14}/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
