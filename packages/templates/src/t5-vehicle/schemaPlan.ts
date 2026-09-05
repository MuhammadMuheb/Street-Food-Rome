/**
 * packages/templates/src/t5-vehicle/schemaPlan.ts — declares which
 * packages/seo/schema JSON-LD builders apply to each T5 Vehicle page type
 * (vespa/car/boat tours: a bookable trip plus the service/product on money
 * pages). Consumed by the page-rendering layer to decide which JSON-LD to
 * attach.
 */
export const t5VehicleSchemaPlan = {
  home: ['touristTrip'],
  money: ['touristTrip', 'service', 'product', 'faqPage', 'breadcrumbList'],
  about: ['faqPage'],
  contact: [],
} as const;
