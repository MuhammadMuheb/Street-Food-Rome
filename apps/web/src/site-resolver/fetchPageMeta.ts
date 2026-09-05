/**
 * apps/web/src/site-resolver/fetchPageMeta.ts — minimal `Pages` doc fetch for
 * Next's `generateMetadata` (title/canonical/OG, M4 SEO Engine).
 *
 * Deliberately separate from fetchPageData.ts: metadata only needs a few
 * fields (not tours/author/FAQs) and Next calls `generateMetadata` on every
 * request independently of the page component, so this stays a cheap,
 * narrow query rather than reusing the fuller render-props fetch.
 *
 * Also cached (on-demand ISR) with the same `site:`/`page:` tags as
 * fetchPageData.ts — see that file's comment for the full reasoning.
 */
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import type { SeoPage } from '@italy-tours/seo';
import type { CurrentSite } from './resolveSite';

function mediaUrl(value: unknown): string | null {
  if (typeof value === 'object' && value !== null && 'url' in value) {
    const url = (value as { url?: unknown }).url;
    return typeof url === 'string' ? url : null;
  }
  return null;
}

export async function fetchPageMeta(site: CurrentSite, slug: string): Promise<SeoPage | null> {
  return unstable_cache(() => fetchPageMetaUncached(site, slug), ['page-meta', site.id, slug], {
    tags: [`site:${site.domain}`, `page:${site.id}:${slug}`],
    revalidate: 3600,
  })();
}

async function fetchPageMetaUncached(site: CurrentSite, slug: string): Promise<SeoPage | null> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'pages',
    where: { and: [{ site: { equals: site.id } }, { slug: { equals: slug } }] },
    limit: 1,
    depth: 1,
  });

  const doc = result.docs[0];
  if (!doc) return null;

  return {
    slug: doc.slug,
    title: doc.title,
    metaTitle: doc.metaTitle,
    metaDesc: doc.metaDesc,
    schemaType: doc.schemaType ?? undefined,
    heroImageUrl: mediaUrl(doc.heroImage),
    updatedAt: doc.updatedAt,
  };
}
