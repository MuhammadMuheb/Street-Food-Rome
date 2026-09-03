/**
 * packages/seo/src/schema/service.ts — schema.org Service JSON-LD, for
 * vehicle-niche (T5) tours structured as a chartered service rather than a
 * ticketed trip.
 */
import type { JsonLd, SchemaOrgBase } from './types';

export function buildServiceSchema(input: SchemaOrgBase & { providerName: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { '@type': 'Organization', name: input.providerName },
  };
}
