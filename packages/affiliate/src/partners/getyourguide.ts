/**
 * packages/affiliate/src/partners/getyourguide.ts — GetYourGuide partner
 * config.
 *
 * Param names are a reasonable generic placeholder (GetYourGuide's actual
 * partner program uses a `partner_id` query param in practice), not verified
 * against a live GetYourGuide affiliate account — there's no partner
 * credentials or API doc available here. Confirm against the real program
 * terms before going live.
 */
import type { PartnerConfig } from '../types';

export const getyourguideConfig: PartnerConfig = {
  key: 'getyourguide',
  displayName: 'GetYourGuide',
  affiliateIdParam: 'partner_id',
  campaignParam: 'cmp',
};
