/**
 * apps/web/src/site-resolver/fetchPageMeta.ts — minimal page-doc fetch for
 * Next's `generateMetadata` (title/canonical/OG, M4 SEO Engine).
 *
 * Deliberately separate from fetchPageData.ts: metadata only needs a few
 * fields (not tours/author/FAQs) and Next calls `generateMetadata` on every
 * request independently of the page component, so this stays a cheap,
 * narrow read rather than reusing the fuller render-props fetch.
 *
 * Also cached (on-demand ISR) with the same `site:`/`page:` tags as
 * fetchPageData.ts — see that file's comment for the full reasoning.
 */
import { unstable_cache } from 'next/cache';
import { getPageDoc } from '@italy-tours/firebase';
import type { SeoPage } from '@italy-tours/seo';
import type { CurrentSite } from './resolveSite';

export async function fetchPageMeta(site: CurrentSite, slug: string): Promise<SeoPage | null> {
  return unstable_cache(() => fetchPageMetaUncached(site, slug), ['page-meta', site.domain, slug], {
    tags: [`site:${site.domain}`, `page:${site.domain}:${slug}`],
    revalidate: 3600,
  })();
}

async function fetchPageMetaUncached(site: CurrentSite, slug: string): Promise<SeoPage | null> {
  const doc = await getPageDoc(site.domain, slug);
  if (!doc) return null;

  return {
    slug: doc.slug,
    title: doc.title,
    metaTitle: doc.metaTitle,
    metaDesc: doc.metaDesc,
    schemaType: doc.schemaType ?? undefined,
    heroImageUrl: doc.heroImageUrl ?? null,
    updatedAt: doc.updatedAt ?? null,
  };
}
