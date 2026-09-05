/**
 * packages/templates/src/t4-cooking/schemaPlan.ts — declares which
 * packages/seo/schema JSON-LD builders apply to each T4 Cooking page type
 * (a cooking class is a Course; money pages also carry the Product/Offer for
 * booking). Consumed by the page-rendering layer to decide which JSON-LD to
 * attach.
 */
export const t4CookingSchemaPlan = {
  home: ['course'],
  money: ['course', 'product', 'faqPage', 'breadcrumbList'],
  about: ['faqPage'],
  contact: [],
} as const;
