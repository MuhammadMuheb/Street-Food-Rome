/**
 * packages/seo/src/schema/course.ts — schema.org Course JSON-LD, for
 * cooking-niche (T4) tours structured as a class rather than a trip.
 */
import type { JsonLd, SchemaOrgBase } from './types';

export function buildCourseSchema(input: SchemaOrgBase & { providerName: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { '@type': 'Organization', name: input.providerName },
  };
}
