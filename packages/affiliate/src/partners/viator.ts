/**
 * packages/affiliate/src/partners/viator.ts — Viator partner config.
 * See getyourguide.ts's header note — param names are an unverified generic
 * placeholder, not confirmed against a live Viator affiliate account.
 */
import type { PartnerConfig } from '../types';

export const viatorConfig: PartnerConfig = {
  key: 'viator',
  displayName: 'Viator',
  affiliateIdParam: 'pid',
  campaignParam: 'mcid',
};
