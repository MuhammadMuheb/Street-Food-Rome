/**
 * packages/firebase/src/tours.ts — Firestore-backed bookable tours (M3).
 *
 * Top-level `tours` collection, NOT nested under a site — Payload's Tours
 * collection had no `site` relationship either (a Tour can be featured from
 * any Page on any Site), and Tours.slug must be globally unique since it's
 * the :slug in the public /go/:slug cloak route.
 */
import { getDb } from './client';
import type { AffiliatePartner } from '@italy-tours/config';

export interface TourDoc {
  title: string;
  slug: string;
  partner: AffiliatePartner;
  partnerProductId: string;
  affiliateUrl: string;
  priceBand: string | null;
  duration: string | null;
  city: string;
  niche: string[];
  imageUrl: string | null;
  firstHandNotes: string | null;
}

const TOURS_COLLECTION = 'tours';

export async function getTourBySlug(slug: string): Promise<TourDoc | null> {
  const snap = await getDb().collection(TOURS_COLLECTION).doc(slug).get();
  if (!snap.exists) return null;
  return snap.data() as TourDoc;
}

export async function getToursBySlugs(slugs: string[]): Promise<TourDoc[]> {
  if (slugs.length === 0) return [];
  const docs = await Promise.all(slugs.map((slug) => getDb().collection(TOURS_COLLECTION).doc(slug).get()));
  return docs.filter((doc) => doc.exists).map((doc) => doc.data() as TourDoc);
}
