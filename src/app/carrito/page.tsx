'use client';
import Link from 'next/link';
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';

const fmt = (n: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
const WA_NUMBER = '573000000000';

export default function CarritoPage() {
  const { items, removeItem, updateCantidad, total, clearCart } = useCartStore();
  const totalVal = total();

  const buildWAMsg = () => {
    const lista = items.map((i, idx) => `${idx+1}. ${i.producto.nombre} x${i.cantidad} — ${fmt(i.producto.precio * i.cantidad)}`).join('\n');
    return encodeURIComponent(`¡Hola! Quiero hacer el siguiente pedido:\n\n${lista}\n\n*Total: ${fmt(totalVal)}*\n\n¿Cómo procedo con el pago y envío?`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <FiShoppingCart size={48} className="text-gray-300 mx-auto mb-4"/>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-6">Agrega productos para comenzar tu pedido.</p>
        <Link href="/" className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors inline-block">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mi carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.producto.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4">
              <img src={item.producto.imagen} alt={item.producto.nombre} className="w-20 h-20 object-cover rounded-xl bg-gray-100 shrink-0"/>
              <div className="flex-1 min-w-0">
                <Link href={`/productos/${item.producto.slug}`} className="font-medium text-gray-900 hover:text-gray-600 text-sm line-clamp-2">{item.producto.nombre}</Link>
                <p className="text-gray-400 text-xs mt-0.5">{item.producto.subcategoria}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button onClick={() => updateCantidad(item.producto.id, item.cantidad - 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900"><FiMinus size={12}/></button>
                    <span className="w-8 text-center text-sm font-semibold">{item.cantidad}</span>
                    <button onClick={() => updateCantidad(item.producto.id, item.cantidad + 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900"><FiPlus size={12}/></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">{fmt(item.producto.precio * item.cantidad)}</span>
                    <button onClick={() => removeItem(item.producto.id)} className="text-gray-400 hover:text-red-500 transition-colors"><FiTrash2 size={16}/></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition-colors">Vaciar carrito</button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-32">
            <h2 className="font-bold text-gray-900 mb-4">Resumen del pedido</h2>
            <div className="space-y-2 mb-4">
              {items.map((i) => (
                <div key={i.producto.id} className="flex justify-between text-sm text-gray-600">
                  <span className="truncate mr-2">{i.producto.nombre} x{i.cantidad}</span>
                  <span className="shrink-0 font-medium">{fmt(i.producto.precio * i.cantidad)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 mb-5">
              <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span>{fmt(totalVal)}</span>
              </div>
            </div>
            <a href={`https://wa.me/${WA_NUMBER}?text=${buildWAMsg()}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors text-sm">
              💬 Finalizar pedido por WhatsApp
            </a>
            <p className="text-xs text-gray-400 text-center mt-2">Te contactaremos para coordinar el envío</p>
          </div>
        </div>
      </div>
    </div>
  );
}
