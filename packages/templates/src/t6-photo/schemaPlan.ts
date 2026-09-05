/**
 * packages/templates/src/t6-photo/schemaPlan.ts — declares which
 * packages/seo/schema JSON-LD builders apply to each T6 Photo page type
 * (a booked photo session is a Service; money pages also carry the
 * Product/Offer for booking). Consumed by the page-rendering layer to decide
 * which JSON-LD to attach.
 */
export const t6PhotoSchemaPlan = {
  home: ['service'],
  money: ['service', 'product', 'faqPage', 'breadcrumbList'],
  about: ['faqPage'],
  contact: [],
} as const;
