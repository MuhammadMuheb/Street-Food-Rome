/**
 * packages/seo/src/metadata.ts — M4 SEO Engine: title/desc/canonical/OG.
 *
 * Returns a plain object matching Next.js's `Metadata` shape (this package
 * doesn't import `next` to stay framework-light; the caller — an
 * `export const metadata` or `generateMetadata` in apps/web — assigns it
 * directly, since the shapes are structurally compatible).
 */
import type { SeoPage, SeoSite } from './types';

export interface BuiltMetadata {
  title: string;
  description: string;
  alternates: { canonical: string };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: string[];
    locale: string;
  };
}

function canonicalUrl(site: SeoSite, path: string): string {
  const normalizedPath = path === '/' ? '' : path;
  return `https://${site.domain}${normalizedPath}`;
}

export function buildPageMetadata(site: SeoSite, page: SeoPage, path: string): BuiltMetadata {
  const url = canonicalUrl(site, path);

  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDesc,
      url,
      siteName: site.domain,
      images: page.heroImageUrl ? [page.heroImageUrl] : [],
      locale: site.language === 'it' ? 'it_IT' : 'en_US',
    },
  };
}
