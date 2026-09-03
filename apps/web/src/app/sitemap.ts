/**
 * apps/web/src/app/sitemap.ts — per-domain XML sitemap (M4). Not covered by
 * the tenant middleware's site headers (Next generates this via a plain GET
 * to /sitemap.xml with no rewrite), so it resolves the site directly from
 * the request Host header instead of `getCurrentSite()`.
 */
import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import { buildSitemapEntries } from '@italy-tours/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  if (!site || site.status !== 'live') return [];

  const pagesResult = await payload.find({
    collection: 'pages',
    where: { site: { equals: site.id } },
    limit: 200,
    depth: 0,
  });

  const entries = buildSitemapEntries(
    { domain: site.domain, language: site.language },
    pagesResult.docs.map((page) => ({
      slug: page.slug,
      title: page.title,
      metaTitle: page.metaTitle,
      metaDesc: page.metaDesc,
      updatedAt: page.updatedAt,
    })),
  );

  return entries;
}
