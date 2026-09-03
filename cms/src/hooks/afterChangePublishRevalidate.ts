/**
 * cms/src/hooks/afterChangePublishRevalidate.ts — ISR invalidation.
 *
 * Wired as an `afterChange` hook on `Sites` and `Pages`. On publish (or any
 * status change into "live"/published), it POSTs the affected Next.js cache
 * tags to `/api/internal/revalidate`, so the edge middleware's cached
 * `resolve-site` lookup (tagged `site:<domain>`) and any page-level ISR
 * (tagged `page:<site>:<slug>`) pick up the change immediately instead of
 * waiting out `SITE_CACHE_TTL_SECONDS`.
 */
import type { CollectionAfterChangeHook } from 'payload';

function resolveTags(collectionSlug: string, doc: Record<string, unknown>): string[] {
  if (collectionSlug === 'sites' && typeof doc.domain === 'string') {
    return [`site:${doc.domain}`];
  }

  if (collectionSlug === 'pages' && typeof doc.slug === 'string') {
    const siteId = typeof doc.site === 'object' && doc.site !== null ? (doc.site as { id: string }).id : doc.site;
    return typeof siteId === 'string' ? [`page:${siteId}:${doc.slug}`] : [];
  }

  return [];
}

export const afterChangePublishRevalidate: CollectionAfterChangeHook = async ({ doc, req, collection }) => {
  const tags = resolveTags(collection.slug, doc as Record<string, unknown>);

  if (tags.length === 0) return doc;

  const revalidateUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/internal/revalidate`;

  try {
    await fetch(revalidateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: process.env.REVALIDATE_SECRET, tags }),
    });
  } catch (err) {
    req.payload.logger.error(`[afterChangePublishRevalidate] failed to revalidate tags ${tags.join(', ')}: ${err}`);
  }

  return doc;
};
