/**
 * packages/affiliate/src/clickTracking.ts — writes a click-event doc for
 * every `/go/:slug` hit. Trusted server-to-server write from the route
 * handler itself, not a user-supplied request.
 */
import { writeClickEvent } from '@italy-tours/firebase';
import type { ClickEventInput } from './types';

export async function logClickEvent(input: ClickEventInput): Promise<void> {
  await writeClickEvent({
    siteDomain: input.siteDomain,
    slug: input.slug,
    tourSlug: input.tourSlug ?? null,
    partner: input.partner ?? null,
    referrer: input.referrer ?? null,
    userAgent: input.userAgent ?? null,
  });
}
