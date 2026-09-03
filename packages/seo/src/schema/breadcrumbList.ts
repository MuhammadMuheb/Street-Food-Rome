/**
 * packages/seo/src/schema/breadcrumbList.ts — schema.org BreadcrumbList
 * JSON-LD, paired with packages/ui's BreadcrumbNav visible trail.
 */
import type { JsonLd } from './types';

export interface BreadcrumbListItem {
  name: string;
  url: string;
}

export function buildBreadcrumbListSchema(items: BreadcrumbListItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
