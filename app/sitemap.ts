import type { MetadataRoute } from 'next';

// Generate this metadata route at build time for GitHub Pages static export.
export const dynamic = 'force-static';
import { projects } from '@/content/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const root = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rmpranto.github.io').replace(/\/$/, '');
  return ['/', '/about/', '/projects/', ...projects.map(p => `/projects/${p.slug}/`)]
    .map(path => ({ url: `${root}${path}`, changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.6 }));
}
