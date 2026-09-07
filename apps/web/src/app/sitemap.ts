import type { MetadataRoute } from 'next';
import { listPageDocs, SITE_DOMAIN } from '@/lib/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await listPageDocs();

  return pages.map((page) => ({
    url: `https://${SITE_DOMAIN}/${page.slug === 'home' ? '' : page.slug}`,
    lastModified: page.updatedAt ?? new Date().toISOString(),
  }));
}
