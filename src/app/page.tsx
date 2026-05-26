'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import PostCard from '@/components/blog/PostCard';
import { getProductosDestacados, categorias } from '@/data/productos';
import { getPostsRecientes } from '@/data/posts';

const WA_NUMBER = '573000000000';
const WA_MSG = encodeURIComponent('¡Hola! Quiero información sobre sus productos.');

// Slides del carrusel
const slides = [
  {
    id: 1,
    titulo: 'Audífonos Bluetooth',
    sub: 'Hasta 20 horas de batería · Bluetooth 5.0',
    cta: 'Ver ahora',
    link: '/categoria/audio',
    bg: 'from-gray-900 via-gray-800 to-gray-900',
    imagen: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800',
  },
  {
    id: 2,
    titulo: 'Parlantes Portátiles',
    sub: 'Lleva tu música a donde quieras',
    cta: 'Ver parlantes',
    link: '/categoria/audio',
    bg: 'from-slate-900 via-slate-800 to-slate-900',
    imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
  },
  {
    id: 3,
    titulo: 'Accesorios para PC',
    sub: 'Teclados, mouse, USB y más',
    cta: 'Ver accesorios',
    link: '/categoria/accesorios-pc',
    bg: 'from-zinc-900 via-zinc-800 to-zinc-900',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
  },
];

// Iconos SVG para categorías
const iconosCategorias: Record<string, React.ReactElement> = {
  'audio': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/></svg>,
  'accesorios-pc': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  'cargadores': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  'smartwatch': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><rect x="5" y="7" width="14" height="14" rx="2"/><path d="M9 7V5a2 2 0 014 0v2M9 17v2a2 2 0 004 0v-2M12 11v2l1 1"/></svg>,
};

export default function Home() {
  const [slide, setSlide] = useState(0);
  const destacados = getProductosDestacados();
  const posts = getPostsRecientes(3);
  const s = slides[slide];

  return (
    <div>

      {/* ── CARRUSEL — compacto como Masglo ── */}
      <section className="relative overflow-hidden" style={{height: '320px'}}>
        <div className={`absolute inset-0 bg-gradient-to-r ${s.bg}`}/>
        <img src={s.imagen} alt={s.titulo} className="absolute inset-0 w-full h-full object-cover opacity-30"/>
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{s.titulo}</h1>
            <p className="text-gray-300 mb-5 text-sm md:text-base">{s.sub}</p>
            <div className="flex gap-3">
              <Link href={s.link} className="bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                {s.cta}
              </Link>
              <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
                className="bg-green-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-green-600 transition-colors">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
        {/* Puntos del carrusel */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${i === slide ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/70'}`}/>
          ))}
        </div>
        {/* Flechas */}
        <button onClick={() => setSlide((slide - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
          ‹
        </button>
        <button onClick={() => setSlide((slide + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
          ›
        </button>
      </section>

      {/* ── CATEGORÍAS — iconos pequeños como Masglo ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex justify-around md:justify-center md:gap-12">
            {categorias.map((cat) => (
              <Link key={cat.id} href={`/categoria/${cat.id}`}
                className="flex flex-col items-center gap-2 group py-2 px-3">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-all">
                  {iconosCategorias[cat.id]}
                </div>
                <span className="text-xs text-gray-600 group-hover:text-gray-900 font-medium text-center leading-tight">{cat.nombre}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS — visibles inmediatamente ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Productos destacados</h2>
            <p className="text-gray-500 text-sm">Lo más popular del momento</p>
          </div>
          <Link href="/categoria/audio" className="text-sm text-gray-500 hover:text-gray-900 font-medium border border-gray-300 px-3 py-1.5 rounded-lg hover:border-gray-500 transition-colors">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {destacados.map((p) => <ProductCard key={p.id} producto={p}/>)}
        </div>
      </section>

      {/* ── BANNER WHATSAPP ── */}
      <section className="bg-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">¿Tienes alguna duda?</h2>
            <p className="text-gray-400 text-sm">Te asesoramos en tiempo real, dinos qué buscas.</p>
          </div>
          <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors">
            💬 Escribir por WhatsApp
          </a>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Blog de tecnología</h2>
            <p className="text-gray-500 text-sm">Guías para elegir mejor</p>
          </div>
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 font-medium border border-gray-300 px-3 py-1.5 rounded-lg hover:border-gray-500 transition-colors">
            Ver todos →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post) => <PostCard key={post.slug} post={post}/>)}
        </div>
      </section>

    </div>
  );
}
