/**
 * packages/seo/src/schema/touristAttraction.ts — schema.org TouristAttraction
 * JSON-LD, used on monument/dayzia-niche support and about pages.
 */
import type { JsonLd, SchemaOrgBase } from './types';

export function buildTouristAttractionSchema(input: SchemaOrgBase): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: input.name,
    description: input.description,
    url: input.url,
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
  };
}
