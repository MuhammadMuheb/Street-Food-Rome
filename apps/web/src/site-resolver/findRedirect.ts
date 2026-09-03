/**
 * apps/web/src/site-resolver/findRedirect.ts — looks up a `Redirects` doc
 * for the current site + path, e.g. a retired money page pointing at its
 * replacement. Checked before falling through to a 404 in [slug]/page.tsx.
 */
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import type { CurrentSite } from './resolveSite';

export interface FoundRedirect {
  toUrl: string;
  permanent: boolean;
}

export async function findRedirect(site: CurrentSite, fromPath: string): Promise<FoundRedirect | null> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'redirects',
    where: { and: [{ site: { equals: site.id } }, { fromPath: { equals: fromPath } }] },
    limit: 1,
    depth: 0,
  });

  const doc = result.docs[0];
  if (!doc) return null;

  return { toUrl: doc.toUrl, permanent: doc.code === '301' };
}
