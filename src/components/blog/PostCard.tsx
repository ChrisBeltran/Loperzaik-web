import Link from 'next/link';
import type { Post } from '@/types';

export default function PostCard({ post }: { post: Post }) {
  const fecha = new Date(post.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden aspect-video bg-gray-100">
          <img src={post.imagen} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
          <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs font-medium px-2 py-1 rounded-full">{post.categoria}</span>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-2">{fecha} · {post.tiempoLectura} min de lectura</p>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-semibold text-[#4410b9] text-base leading-snug mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">{post.titulo}</h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.resumen}</p>
        <div className="flex flex-wrap gap-1">
          {post.etiquetas.slice(0, 3).map((e) => (
            <span key={e} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{e}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
