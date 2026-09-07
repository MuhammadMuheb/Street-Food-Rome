/**
 * packages/firebase/src/clickEvents.ts — M3 affiliate click log.
 *
 * Top-level `clickEvents` collection, append-only — written only from
 * packages/affiliate/src/clickTracking.ts on every /go/:slug hit. No access
 * control layer here (that was Payload's `access.create` config); this
 * write path is only ever reached from that trusted server route, never
 * from a client, so there's nothing to gate.
 */
import { getDb } from './client';
import type { AffiliatePartner } from '@italy-tours/config';

export interface ClickEventInput {
  siteDomain: string;
  slug: string;
  tourSlug?: string | null;
  partner?: AffiliatePartner | null;
  referrer?: string | null;
  userAgent?: string | null;
}

export async function writeClickEvent(input: ClickEventInput): Promise<void> {
  await getDb()
    .collection('clickEvents')
    .add({
      siteDomain: input.siteDomain,
      slug: input.slug,
      tourSlug: input.tourSlug ?? null,
      partner: input.partner ?? null,
      referrer: input.referrer ?? null,
      userAgent: input.userAgent ?? null,
      createdAt: new Date().toISOString(),
    });
}
