/**
 * packages/affiliate/src/clickTracking.ts — writes a ClickEvents doc for
 * every `/go/:slug` hit. `overrideAccess: true` because this is a trusted
 * server-to-server write from the route handler itself, not a user-supplied
 * request — ClickEvents.access.create otherwise requires an authenticated
 * admin, which a visitor clicking a tour link never is.
 */
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import type { ClickEventInput } from './types';

export async function logClickEvent(input: ClickEventInput): Promise<void> {
  const payload = await getPayload({ config });

  // Relationship fields on Postgres integer-PK collections reject string ids
  // (siteId/tourId come through as strings — CurrentSite.id is read off a
  // request header, which is always a string) — coerce to number here.
  await payload.create({
    collection: 'click-events',
    data: {
      site: Number(input.siteId),
      slug: input.slug,
      ...(input.tourId ? { tour: Number(input.tourId) } : {}),
      ...(input.partner ? { partner: input.partner } : {}),
      ...(input.referrer ? { referrer: input.referrer } : {}),
      ...(input.userAgent ? { userAgent: input.userAgent } : {}),
    },
    overrideAccess: true,
  });
}
