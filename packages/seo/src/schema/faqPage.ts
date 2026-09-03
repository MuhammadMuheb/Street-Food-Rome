/**
 * packages/seo/src/schema/faqPage.ts — schema.org FAQPage JSON-LD, built from
 * Pages.faqs. See packages/seo/src/geo/quotableFaq.ts for the GEO/AI-layer
 * variant of the same data.
 */
import type { JsonLd } from './types';
import type { SeoFaq } from '../types';

export function buildFaqPageSchema(faqs: SeoFaq[]): JsonLd | null {
  if (faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
