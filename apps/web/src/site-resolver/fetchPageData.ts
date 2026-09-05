/**
 * apps/web/src/site-resolver/fetchPageData.ts — loads a `Pages` doc for the
 * current site + slug and normalizes it into the shape both hero pages and
 * `packages/templates` layouts expect (`TemplateComponentProps['page']`).
 */
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import type { TemplatePageData } from '@italy-tours/templates';
import type { PageType } from '@italy-tours/config';
import { lexicalToPlainHtml } from './lexicalToHtml';
import type { CurrentSite } from './resolveSite';

export interface FetchedPage {
  pageType: PageType;
  page: TemplatePageData;
}

interface PageBodyBlock {
  blockType: string;
  content?: unknown;
}

interface FeaturedTour {
  title: string;
  slug: string;
  priceBand?: string | null;
  duration?: string | null;
  image?: unknown;
  firstHandNotes?: string | null;
}

interface PageFaq {
  question: string;
  answer: string;
}

function mediaUrl(value: unknown): string | undefined {
  if (typeof value === 'object' && value !== null && 'url' in value) {
    const url = (value as { url?: unknown }).url;
    return typeof url === 'string' ? url : undefined;
  }
  return undefined;
}

export async function fetchPageData(site: CurrentSite, slug: string): Promise<FetchedPage | null> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'pages',
    where: { and: [{ site: { equals: site.id } }, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
  });

  const doc = result.docs[0];
  if (!doc) return null;

  const body = (doc.body ?? []) as PageBodyBlock[];
  const richTextBlock = body.find((block) => block.blockType === 'richText');

  const rawTours = ((doc.featuredTours ?? []) as Array<FeaturedTour | string>).filter(
    (tour): tour is FeaturedTour => typeof tour === 'object',
  );

  const tours = rawTours.map((tour) => ({
    title: tour.title,
    href: `/go/${tour.slug}`,
    priceBand: tour.priceBand ?? undefined,
    duration: tour.duration ?? undefined,
    imageUrl: mediaUrl(tour.image),
    imageAlt: tour.title,
  }));

  // "Is it worth it" verdict (doc 05 §6, money pages) — the primary featured
  // tour's own first-hand notes double as this without inventing new copy
  // or a new CMS field; null when the page has no featured tour yet.
  const verdict = rawTours[0]?.firstHandNotes ?? null;

  const author = typeof doc.author === 'object' && doc.author !== null ? doc.author : null;

  return {
    pageType: doc.type,
    page: {
      title: doc.title,
      heroImageUrl: mediaUrl(doc.heroImage),
      bodyHtml: richTextBlock ? lexicalToPlainHtml(richTextBlock.content) : null,
      verdict,
      faqs: ((doc.faqs ?? []) as PageFaq[]).map((faq) => ({ question: faq.question, answer: faq.answer })),
      tours,
      author: author ? { name: author.name, bio: author.bio, avatarUrl: mediaUrl(author.avatar) } : null,
    },
  };
}
