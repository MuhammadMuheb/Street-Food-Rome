/**
 * packages/affiliate/src/partners/civitatis.ts — Civitatis partner config.
 * See getyourguide.ts's header note — param names are an unverified generic
 * placeholder, not confirmed against a live Civitatis affiliate account.
 */
import type { PartnerConfig } from '../types';

export const civitatisConfig: PartnerConfig = {
  key: 'civitatis',
  displayName: 'Civitatis',
  affiliateIdParam: 'aid',
  campaignParam: 'campaign',
};
