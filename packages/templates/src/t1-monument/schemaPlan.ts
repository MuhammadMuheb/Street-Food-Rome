/**
 * packages/templates/src/t1-monument/schemaPlan.ts — declares which
 * packages/seo/schema JSON-LD builders apply to each T1 Monument page type
 * (single-landmark ticket sites: the attraction entity plus the ticket
 * product on money pages). Consumed by the page-rendering layer to decide
 * which JSON-LD to attach.
 */
export const t1MonumentSchemaPlan = {
  home: ['touristAttraction'],
  money: ['touristAttraction', 'product', 'faqPage', 'breadcrumbList'],
  about: ['faqPage'],
  contact: [],
} as const;
