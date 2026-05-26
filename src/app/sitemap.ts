import type { MetadataRoute } from 'next';
import { productos } from '@/data/productos';
import { categorias } from '@/data/productos';
import { posts } from '@/data/posts';

const BASE = 'https://loperzaik.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const productoUrls = productos.map((p) => ({
    url: `${BASE}/productos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoriaUrls = categorias.map((c) => ({
    url: `${BASE}/categoria/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogUrls = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.fecha),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...categoriaUrls,
    ...productoUrls,
    ...blogUrls,
  ];
}
