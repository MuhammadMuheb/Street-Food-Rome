/**
 * apps/web/src/site-resolver/fetchPageData.ts — loads a Firestore page doc
 * for the current site + slug and normalizes it into the shape both hero
 * pages and `packages/templates` layouts expect (`TemplateComponentProps['page']`).
 *
 * Wrapped in `unstable_cache` (on-demand ISR): the tenant itself still
 * resolves per-request via middleware headers (see renderDispatch.tsx's
 * comment on why that stays fully dynamic), but the Firestore reads are
 * cached per site+slug. Since content is now edited directly in the
 * Firebase Console (no admin-panel publish hook to POST a revalidate call
 * the way Payload's afterChangePublishRevalidate did), `revalidate: 3600`
 * is the *only* invalidation path today — a Console edit takes up to an
 * hour to show live. Call POST /api/internal/revalidate by hand
 * (tags `site:<domain>` / `page:<domain>:<slug>`) after an edit if you need
 * it sooner.
 */
import { unstable_cache } from 'next/cache';
import { getPageDoc, getToursBySlugs, getAuthor } from '@italy-tours/firebase';
import type { TemplatePageData } from '@italy-tours/templates';
import type { PageType } from '@italy-tours/config';
import type { CurrentSite } from './resolveSite';

export interface FetchedPage {
  pageType: PageType;
  page: TemplatePageData;
}

export async function fetchPageData(site: CurrentSite, slug: string): Promise<FetchedPage | null> {
  return unstable_cache(() => fetchPageDataUncached(site, slug), ['page-data', site.domain, slug], {
    tags: [`site:${site.domain}`, `page:${site.domain}:${slug}`],
    revalidate: 3600,
  })();
}

async function fetchPageDataUncached(site: CurrentSite, slug: string): Promise<FetchedPage | null> {
  const doc = await getPageDoc(site.domain, slug);
  if (!doc) return null;

  const tourDocs = await getToursBySlugs(doc.featuredTourSlugs ?? []);
  const tours = tourDocs.map((tour) => ({
    title: tour.title,
    href: `/go/${tour.slug}`,
    priceBand: tour.priceBand ?? undefined,
    duration: tour.duration ?? undefined,
    imageUrl: tour.imageUrl ?? undefined,
    imageAlt: tour.title,
  }));

  // "Is it worth it" verdict (doc 05 §6, money pages) — the primary featured
  // tour's own first-hand notes double as this without inventing new copy
  // or a new field; null when the page has no featured tour yet.
  const verdict = tourDocs[0]?.firstHandNotes ?? null;

  const author = doc.authorId ? await getAuthor(doc.authorId) : null;

  return {
    pageType: doc.type,
    page: {
      title: doc.title,
      heroImageUrl: doc.heroImageUrl ?? undefined,
      bodyHtml: doc.bodyHtml ?? null,
      verdict,
      faqs: doc.faqs ?? [],
      tours,
      author: author ? { name: author.name, bio: author.bio, avatarUrl: author.avatarUrl } : null,
    },
  };
}
