import type { Metadata } from 'next';
import PostCard from '@/components/blog/PostCard';
import { posts } from '@/data/posts';

export const metadata: Metadata = {
  title: 'Blog de Tecnología - Loperzaik',
  description: 'Guías, consejos y comparativas para elegir los mejores audífonos, parlantes y accesorios. Aprende antes de comprar.',
};

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Blog de Tecnología</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Guías y consejos para elegir los mejores productos. Aprende antes de comprar.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => <PostCard key={post.slug} post={post}/>)}
      </div>
    </div>
  );
}
