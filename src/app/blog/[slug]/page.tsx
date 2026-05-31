import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/blog/PostCard';
import { getPostBySlug, posts, getPostsRecientes } from '@/data/posts';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.titulo} - Loperzaik Blog`,
    description: post.resumen,
    openGraph: {
      title: post.titulo,
      description: post.resumen,
      images: [{ url: post.imagen }],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const recientes = getPostsRecientes(3).filter((p) => p.slug !== slug);
  const fecha = new Date(post.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titulo,
    description: post.resumen,
    image: post.imagen,
    datePublished: post.fecha,
    author: { '@type': 'Organization', name: post.autor },
    publisher: { '@type': 'Organization', name: 'Loperzaik' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-700">Inicio</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          <span>/</span>
          <span className="text-gray-700 truncate">{post.titulo}</span>
        </nav>

        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 mb-8">
          <img src={post.imagen} alt={post.titulo} className="w-full aspect-video object-cover"/>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{post.categoria}</span>
              <span className="text-gray-400 text-sm">{fecha}</span>
              <span className="text-gray-400 text-sm">{post.tiempoLectura} min de lectura</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4410b9] mb-4 leading-snug">{post.titulo}</h1>
            <p className="text-gray-500 text-lg mb-6 leading-relaxed border-l-4 border-gray-200 pl-4">{post.resumen}</p>
            <div
              className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-[#4410b9] prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-[#4410b9]"
              dangerouslySetInnerHTML={{ __html: post.contenido }}
            />
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
              {post.etiquetas.map((e) => (
                <span key={e} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{e}</span>
              ))}
            </div>
          </div>
        </div>

        {recientes.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#4410b9] mb-4">Artículos relacionados</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {recientes.slice(0, 2).map((p) => <PostCard key={p.slug} post={p}/>)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
