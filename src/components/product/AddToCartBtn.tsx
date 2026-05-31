'use client';
import { useState } from 'react';
import { FiShoppingCart, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import type { Producto } from '@/types';

export default function AddToCartBtn({ producto }: { producto: Producto }) {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <div className="flex gap-2">
      <div className="flex items-center bg-gray-100 rounded-xl">
        <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="w-10 h-11 flex items-center justify-center text-gray-600 hover:text-[#4410b9]">
          <FiMinus size={14}/>
        </button>
        <span className="w-10 text-center font-semibold text-[#4410b9]">{cantidad}</span>
        <button onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))} className="w-10 h-11 flex items-center justify-center text-gray-600 hover:text-[#4410b9]">
          <FiPlus size={14}/>
        </button>
      </div>
      <button onClick={handleAdd} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all text-sm ${agregado ? 'bg-green-500 text-white' : 'bg-[#4410b9] text-white hover:bg-[#3509a0]'}`}>
        {agregado ? <><FiCheck size={16}/> Agregado</> : <><FiShoppingCart size={16}/> Agregar al carrito</>}
      </button>
    </div>
  );
}
