// app/robots.ts — Section 9.5: noindex all internal routes
import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/dashboard/', '/studio/'] },
    ],
    sitemap: 'https://zetacode.tech/sitemap.xml',
  };
}
