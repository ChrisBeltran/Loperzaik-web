'use client';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Props {
  imagenes: string[];
  nombre: string;
}

export default function Galeria({ imagenes, nombre }: Props) {
  const [actual, setActual] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const anterior = () => setActual((p) => (p === 0 ? imagenes.length - 1 : p - 1));
  const siguiente = () => setActual((p) => (p === imagenes.length - 1 ? 0 : p + 1));

  // Swipe táctil
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? siguiente() : anterior();
    setTouchStart(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Imagen principal — deslizable con swipe */}
      <div
        className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square border border-gray-100 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={imagenes[actual]}
          alt={`${nombre} - imagen ${actual + 1}`}
          className="w-full h-full object-cover transition-opacity duration-200"
        />

        {/* Flechas — solo si hay más de 1 */}
        {imagenes.length > 1 && (
          <>
            <button onClick={anterior}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white shadow-md rounded-full flex items-center justify-center text-gray-700 transition-all">
              <FiChevronLeft size={18}/>
            </button>
            <button onClick={siguiente}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white shadow-md rounded-full flex items-center justify-center text-gray-700 transition-all">
              <FiChevronRight size={18}/>
            </button>
            {/* Contador */}
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
              {actual + 1} / {imagenes.length}
            </div>
          </>
        )}

        {/* Puntos indicadores */}
        {imagenes.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {imagenes.map((_, i) => (
              <button key={i} onClick={() => setActual(i)}
                className={`h-1.5 rounded-full transition-all ${i === actual ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`}/>
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails clicables — al estilo Mercado Libre */}
      {imagenes.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imagenes.map((img, i) => (
            <button
              key={i}
              onClick={() => setActual(i)}
              className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                i === actual ? 'border-[#4410b9]' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img src={img} alt={`${nombre} ${i + 1}`} className="w-full h-full object-cover"/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
