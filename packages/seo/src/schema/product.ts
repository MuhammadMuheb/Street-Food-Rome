/**
 * packages/seo/src/schema/product.ts — schema.org Product/Offer JSON-LD,
 * paired with TouristTrip on money pages per the T3 Food schema plan.
 */
import type { JsonLd } from './types';

export interface ProductInput {
  name: string;
  description: string;
  url: string;
  imageUrl?: string | null;
  priceCurrency?: string;
  price: string;
}

export function buildProductSchema(input: ProductInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
    offers: {
      '@type': 'Offer',
      url: input.url,
      priceCurrency: input.priceCurrency ?? 'EUR',
      price: input.price,
      availability: 'https://schema.org/InStock',
    },
  };
}
