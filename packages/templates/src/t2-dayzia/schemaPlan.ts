/**
 * packages/templates/src/t2-dayzia/schemaPlan.ts — declares which
 * packages/seo/schema JSON-LD builders apply to each T2 Day Trip page type.
 * Consumed by the page-rendering layer to decide which JSON-LD to attach.
 */
export const t2DayziaSchemaPlan = {
  home: ['touristTrip'],
  money: ['touristTrip', 'product', 'faqPage', 'breadcrumbList'],
  about: ['faqPage'],
  contact: [],
} as const;
