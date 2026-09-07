/**
 * apps/web/src/site-resolver/findRedirect.ts — looks up a redirect doc for
 * the current site + path, e.g. a retired money page pointing at its
 * replacement. Checked before falling through to a 404 in [slug]/page.tsx.
 */
import { findRedirectDoc } from '@italy-tours/firebase';
import type { CurrentSite } from './resolveSite';

export interface FoundRedirect {
  toUrl: string;
  permanent: boolean;
}

export async function findRedirect(site: CurrentSite, fromPath: string): Promise<FoundRedirect | null> {
  const doc = await findRedirectDoc(site.domain, fromPath);
  if (!doc) return null;

  return { toUrl: doc.toUrl, permanent: doc.code === '301' };
}
