/**
 * packages/seo/src/geo/quotableFaq.ts — M9 GEO/AI layer: validates that each
 * FAQ answer is actually one quotable sentence (the whole point of the field
 * per Pages.faqs' admin description) and pairs the FAQPage JSON-LD with a
 * plain quotable-text list an AI answer engine can lift directly.
 */
import { buildFaqPageSchema } from '../schema/faqPage';
import type { JsonLd } from '../schema/types';
import type { SeoFaq } from '../types';

export interface QuotableFaqResult {
  schema: JsonLd | null;
  quotableAnswers: string[];
  warnings: string[];
}

const MAX_QUOTABLE_SENTENCES = 1;

function countSentences(text: string): number {
  const matches = text.trim().match(/[.!?]+(\s|$)/g);
  return matches ? matches.length : text.trim().length > 0 ? 1 : 0;
}

export function buildQuotableFaq(faqs: SeoFaq[]): QuotableFaqResult {
  const warnings: string[] = [];

  for (const faq of faqs) {
    if (countSentences(faq.answer) > MAX_QUOTABLE_SENTENCES) {
      warnings.push(`FAQ answer for "${faq.question}" spans more than one sentence — not reliably quotable.`);
    }
  }

  return {
    schema: buildFaqPageSchema(faqs),
    quotableAnswers: faqs.map((faq) => faq.answer),
    warnings,
  };
}
