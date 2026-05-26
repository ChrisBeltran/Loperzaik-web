'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Producto } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (producto: Producto, cantidad?: number) => void;
  removeItem: (id: string) => void;
  updateCantidad: (id: string, cantidad: number) => void;
  clearCart: () => void;
  total: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (producto, cantidad = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.producto.id === producto.id);
        if (existing) {
          set({ items: items.map((i) => i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i) });
        } else {
          set({ items: [...items, { producto, cantidad }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.producto.id !== id) }),
      updateCantidad: (id, cantidad) => {
        if (cantidad < 1) return;
        set({ items: get().items.map((i) => i.producto.id === id ? { ...i, cantidad } : i) });
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0),
      totalItems: () => get().items.reduce((sum, i) => sum + i.cantidad, 0),
    }),
    { name: 'loperzaik-cart' }
  )
);
