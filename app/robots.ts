import type { MetadataRoute } from 'next';

// Generate this metadata route at build time for GitHub Pages static export.
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  const root = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rmpranto.github.io').replace(/\/$/, '');
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${root}/sitemap.xml`,
  };
}
