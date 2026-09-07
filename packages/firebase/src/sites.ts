/**
 * packages/firebase/src/sites.ts — Firestore-backed Site Registry (M1).
 *
 * Document ID is the domain itself (e.g. "streetfoodrome.com") — no
 * separate id field, no relational join needed for heroTargetDomain/
 * templateKey (both stored directly on the doc, denormalized) the way
 * Payload's `sites` collection needed `depth: 1` to populate.
 */
import type { ResolvedSite, SiteLanguage, SiteNiche, SiteStatus, SiteType, ThemeTokens } from '@italy-tours/config';
import { getDb } from './client';

export interface SiteDoc {
  slug: string;
  type: SiteType;
  niche: SiteNiche;
  themeTokens: ThemeTokens;
  templateKey: string | null;
  heroTargetDomain: string | null;
  status: SiteStatus;
  language: SiteLanguage;
  gaId: string | null;
}

const SITES_COLLECTION = 'sites';

export async function findSiteByDomain(domain: string): Promise<ResolvedSite | null> {
  const snap = await getDb().collection(SITES_COLLECTION).doc(domain).get();
  if (!snap.exists) return null;

  const data = snap.data() as SiteDoc;

  return {
    id: domain,
    domain,
    type: data.type,
    slug: data.slug,
    niche: data.niche,
    templateKey: data.templateKey ?? null,
    heroTargetSiteId: data.heroTargetDomain ?? null,
    heroTargetDomain: data.heroTargetDomain ?? null,
    status: data.status,
    language: data.language,
    themeTokens: data.themeTokens,
    gaId: data.gaId ?? null,
  };
}
