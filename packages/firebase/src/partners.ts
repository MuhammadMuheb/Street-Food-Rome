/**
 * packages/firebase/src/partners.ts — affiliate partner accounts.
 *
 * Top-level `partners` collection, doc ID is the partner key itself (e.g.
 * "getyourguide") — matches Payload's `Partners.key` unique-select field
 * exactly, so it doubles as a natural, human-readable document ID.
 */
import { getDb } from './client';
import type { AffiliatePartner } from '@italy-tours/config';

export interface PartnerDoc {
  name: string;
  affiliateId: string;
}

export async function getPartner(key: AffiliatePartner): Promise<PartnerDoc | null> {
  const snap = await getDb().collection('partners').doc(key).get();
  if (!snap.exists) return null;
  return snap.data() as PartnerDoc;
}
