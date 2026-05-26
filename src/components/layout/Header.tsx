'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronDown, FiHome, FiGrid, FiBookOpen } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import { categorias } from '@/data/productos';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const totalItems = useCartStore((s) => s.totalItems());
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) { router.push(`/buscar?q=${encodeURIComponent(search)}`); setSearch(''); }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">

        {/* Barra top — solo desktop */}
        <div className="hidden md:block bg-gray-900 text-white text-xs py-2">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <span>📞 Línea: 01 8000 123 456 · Envío a domicilio en Colombia</span>
            <div className="flex gap-5 text-gray-400">
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/carrito" className="hover:text-white transition-colors">Rastrea tu pedido</Link>
            </div>
          </div>
        </div>

        {/* Header principal */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">

          {/* Logo — igual posición que Masglo: izquierda */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-2">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-gray-900 text-lg leading-tight tracking-tight">Loperzaik</p>
              <p className="text-gray-400 text-xs leading-tight">Tecnología de Vanguardia</p>
            </div>
          </Link>

          {/* Buscador — centro, igual que Masglo */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 transition-colors">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Estoy buscando..."
                className="flex-1 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-white"
              />
              <button type="submit" className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-1.5 shrink-0">
                <FiSearch size={14}/> <span className="hidden sm:inline">Buscar</span>
              </button>
            </div>
          </form>

          {/* Acciones derecha — igual que Masglo */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/carrito" className="relative flex flex-col items-center p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <FiShoppingCart size={22}/>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden md:block text-xs mt-0.5">Carrito</span>
            </Link>
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(true)}>
              <FiMenu size={22}/>
            </button>
          </div>
        </div>

        {/* Nav categorías — solo desktop, igual que Masglo */}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex items-center gap-0 py-0">
              <li>
                <Link href="/" className="px-4 py-3 text-sm text-gray-700 hover:text-gray-900 flex items-center font-medium border-b-2 border-transparent hover:border-gray-900 transition-all">
                  INICIO
                </Link>
              </li>
              {categorias.map((cat) => (
                <li key={cat.id} className="group relative">
                  <Link href={`/categoria/${cat.id}`} className="px-4 py-3 text-sm text-gray-700 hover:text-gray-900 flex items-center gap-1 font-medium border-b-2 border-transparent hover:border-gray-900 transition-all uppercase">
                    {cat.nombre} <FiChevronDown size={12} className="group-hover:rotate-180 transition-transform"/>
                  </Link>
                  <div className="absolute top-full left-0 w-52 bg-white border border-gray-200 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-b-xl">
                    <Link href={`/categoria/${cat.id}`} className="block px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                      Ver todo
                    </Link>
                    <hr className="my-1 border-gray-100"/>
                    {cat.subcategorias.map((sub) => (
                      <span key={sub} className="block px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 cursor-default">{sub}</span>
                    ))}
                  </div>
                </li>
              ))}
              <li>
                <Link href="/blog" className="px-4 py-3 text-sm text-gray-700 hover:text-gray-900 flex items-center font-medium border-b-2 border-transparent hover:border-gray-900 transition-all uppercase">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Menú lateral móvil */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)}/>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <p className="font-bold text-gray-900">Loperzaik</p>
              </div>
              <button onClick={() => setMenuOpen(false)} className="p-1 text-gray-500"><FiX size={20}/></button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3">
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 text-sm font-medium">
                <FiHome size={16}/> Inicio
              </Link>
              <p className="px-5 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Categorías</p>
              {categorias.map((cat) => (
                <Link key={cat.id} href={`/categoria/${cat.id}`} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 text-sm">
                  <FiGrid size={15}/> {cat.nombre}
                </Link>
              ))}
              <hr className="my-2 border-gray-100"/>
              <Link href="/blog" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 text-sm">
                <FiBookOpen size={15}/> Blog
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom nav móvil */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200" style={{paddingBottom:'env(safe-area-inset-bottom)'}}>
        <div className="flex justify-around py-1.5">
          <Link href="/" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-gray-900 text-xs"><FiHome size={20}/>Inicio</Link>
          <Link href="/categoria/audio" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-gray-900 text-xs"><FiGrid size={20}/>Categorías</Link>
          <Link href="/carrito" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-gray-900 text-xs relative">
            <FiShoppingCart size={20}/>
            {totalItems > 0 && <span className="absolute top-0 right-2 w-4 h-4 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">{totalItems}</span>}
            Carrito
          </Link>
          <Link href="/blog" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-gray-900 text-xs"><FiBookOpen size={20}/>Blog</Link>
        </div>
      </nav>
    </>
  );
}
