/**
 * packages/seo/src/schema/touristTrip.ts — schema.org TouristTrip JSON-LD for
 * a bookable Tour featured on a money page.
 */
import type { JsonLd } from './types';

export interface TouristTripInput {
  name: string;
  description: string;
  url: string;
  imageUrl?: string | null;
  priceCurrency?: string;
  price?: string;
  durationIso8601?: string;
}

export function buildTouristTripSchema(input: TouristTripInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: input.name,
    description: input.description,
    url: input.url,
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
    ...(input.durationIso8601 ? { itinerary: { '@type': 'ItemList' }, duration: input.durationIso8601 } : {}),
    ...(input.price
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: input.priceCurrency ?? 'EUR',
            price: input.price,
            url: input.url,
          },
        }
      : {}),
  };
}
