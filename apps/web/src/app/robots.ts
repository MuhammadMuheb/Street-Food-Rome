/**
 * apps/web/src/app/robots.ts — per-domain robots.txt (M4). Resolves the site
 * from the Host header directly, same reasoning as sitemap.ts — including
 * the bare-localhost dev fallback (@italy-tours/config's localDevTenant.ts),
 * without which `http://localhost:3000/robots.txt` would resolve no Site row
 * and ship a blocking `Disallow: /` for the exact URL every other route
 * treats as the live site.
 */
import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import { buildRobotsRules } from '@italy-tours/seo';
import { resolveLocalDevHostname } from '@italy-tours/config';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headerList = await headers();
  const host = resolveLocalDevHostname(headerList.get('host')?.split(':')[0] ?? '');

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
