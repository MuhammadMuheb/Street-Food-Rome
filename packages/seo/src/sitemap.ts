/**
 * packages/seo/src/sitemap.ts — per-domain XML sitemap entries (M4).
 * Consumed by apps/web/src/app/sitemap.ts, which is the only place that
 * actually imports `next`'s `MetadataRoute.Sitemap` type — this stays
 * framework-light and structurally compatible with it.
 */
import type { SeoPage, SeoSite } from './types';

export interface SitemapEntry {
  url: string;
  lastModified?: string;
}

export function buildSitemapEntries(site: SeoSite, pages: SeoPage[]): SitemapEntry[] {
  return pages.map((page) => ({
    url: `https://${site.domain}/${page.slug === 'home' ? '' : page.slug}`,
    ...(page.updatedAt ? { lastModified: page.updatedAt } : {}),
  }));
}
