/**
 * apps/web/src/app/robots.ts — per-domain robots.txt (M4). Resolves the site
 * from the Host header directly, same reasoning as sitemap.ts.
 */
import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import { buildRobotsRules } from '@italy-tours/seo';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headerList = await headers();
  const host = headerList.get('host')?.split(':')[0] ?? '';

  const payload = await getPayload({ config });

  const siteResult = await payload.find({
    collection: 'sites',
    where: { domain: { equals: host } },
    limit: 1,
    depth: 0,
  });

  const site = siteResult.docs[0];
  const { rules, sitemapUrl } = buildRobotsRules(host, site?.status === 'live');

  return { rules, sitemap: sitemapUrl };
}
