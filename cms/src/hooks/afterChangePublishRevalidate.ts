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
import { resolveServerUrl } from '../lib/resolveServerUrl';

function resolveTags(collectionSlug: string, doc: Record<string, unknown>): string[] {
  if (collectionSlug === 'sites' && typeof doc.domain === 'string') {
    return [`site:${doc.domain}`];
  }

  if (collectionSlug === 'pages' && typeof doc.slug === 'string') {
    const siteRef = doc.site;
    // Postgres-backed Payload IDs are numbers, not strings — `doc.site` here
    // is either a raw numeric id (afterChange hooks get the shallow, unpopulated
    // relation by default) or a populated { id } object; a `typeof === 'string'`
    // check on the former always failed, so this tag silently never fired for
    // any page — the bug this replaces.
    const siteId = typeof siteRef === 'object' && siteRef !== null ? (siteRef as { id: unknown }).id : siteRef;
    return siteId !== undefined && siteId !== null ? [`page:${siteId}:${doc.slug}`] : [];
  }

  return [];
}

export const afterChangePublishRevalidate: CollectionAfterChangeHook = async ({ doc, req, collection }) => {
  const tags = resolveTags(collection.slug, doc as Record<string, unknown>);

  if (tags.length === 0) return doc;

  const revalidateUrl = `${resolveServerUrl()}/api/internal/revalidate`;

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
