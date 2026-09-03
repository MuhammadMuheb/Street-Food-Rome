/**
 * packages/templates/src/t3-food/schemaPlan.ts — declares which
 * packages/seo/schema JSON-LD builders apply to each T3 Food page type
 * (blueprint §5.1: "FoodEstablishment-adjacent + Product/Offer + FAQPage").
 * Consumed by the page-rendering layer to decide which JSON-LD to attach.
 */
export const t3FoodSchemaPlan = {
  home: ['touristAttraction'],
  money: ['touristTrip', 'product', 'faqPage', 'breadcrumbList'],
  about: ['faqPage'],
  contact: [],
} as const;
