/**
 * apps/web/src/site-resolver/buildPageJsonLd.ts — assembles the JSON-LD
 * schema.org objects for a `[slug]` page (doc 05 §1: "Primary schema types:
 * Product/Offer, FAQPage, BreadcrumbList"). Every page gets a two-level
 * BreadcrumbList (Home -> this page); any page with FAQs gets FAQPage; money
 * pages additionally get one Product/Offer per featured tour (doc 05 §6).
 */
import { buildProductSchema, buildFaqPageSchema, buildBreadcrumbListSchema, type JsonLd } from '@italy-tours/seo';
import type { TemplatePageData } from '@italy-tours/templates';
import type { PageType } from '@italy-tours/config';
import type { CurrentSite } from './resolveSite';

function parsePriceFloor(priceBand?: string): string | null {
  const match = priceBand?.match(/\d+/);
  return match ? match[0] : null;
}

export function buildPageJsonLd(site: CurrentSite, slug: string, pageType: PageType, page: TemplatePageData): JsonLd[] {
  const pageUrl = `https://${site.domain}/${slug}`;
  const schemas: JsonLd[] = [];

  schemas.push(
    buildBreadcrumbListSchema([
      { name: 'Home', url: `https://${site.domain}/` },
      { name: page.title, url: pageUrl },
    ]),
  );

  const faqSchema = buildFaqPageSchema(page.faqs);
  if (faqSchema) schemas.push(faqSchema);

  if (pageType === 'money') {
    for (const tour of page.tours) {
      // Skip a tour whose priceBand doesn't carry a parseable number rather
      // than emit an Offer with a fabricated price.
      const price = parsePriceFloor(tour.priceBand);
      if (!price) continue;

      schemas.push(
        buildProductSchema({
          name: tour.title,
          // The page's own title, not the /go/:slug redirect — schema.org
          // readers (and bots) should land on our page, never the cloaked
          // affiliate redirect, which also logs a click as a side effect.
          description: page.title,
          url: pageUrl,
          imageUrl: tour.imageUrl,
          price,
        }),
      );
    }
  }

  return schemas;
}
