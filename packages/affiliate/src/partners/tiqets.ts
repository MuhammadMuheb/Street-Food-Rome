/**
 * packages/affiliate/src/partners/tiqets.ts — Tiqets partner config.
 * See getyourguide.ts's header note — param names are an unverified generic
 * placeholder, not confirmed against a live Tiqets affiliate account.
 */
import type { PartnerConfig } from '../types';

export const tiqetsConfig: PartnerConfig = {
  key: 'tiqets',
  displayName: 'Tiqets',
  affiliateIdParam: 'partner',
  campaignParam: 'campaign',
};
