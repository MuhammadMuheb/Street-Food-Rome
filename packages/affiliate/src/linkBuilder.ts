/**
 * packages/affiliate/src/linkBuilder.ts — appends affiliate/campaign params
 * onto a Tour's raw `affiliateUrl` for the given partner config.
 */
import { getyourguideConfig } from './partners/getyourguide';
import { viatorConfig } from './partners/viator';
import { tiqetsConfig } from './partners/tiqets';
import { civitatisConfig } from './partners/civitatis';
import type { AffiliatePartnerKey, PartnerConfig } from './types';

const PARTNER_CONFIGS: Record<AffiliatePartnerKey, PartnerConfig> = {
  getyourguide: getyourguideConfig,
  viator: viatorConfig,
  tiqets: tiqetsConfig,
  civitatis: civitatisConfig,
};

export function getPartnerConfig(partner: AffiliatePartnerKey): PartnerConfig {
  return PARTNER_CONFIGS[partner];
}

export interface BuildTourAffiliateUrlInput {
  affiliateUrl: string;
  partner: AffiliatePartnerKey;
  affiliateId: string;
  campaign?: string;
}

export function buildTourAffiliateUrl({ affiliateUrl, partner, affiliateId, campaign }: BuildTourAffiliateUrlInput): string {
  const config = getPartnerConfig(partner);
  const url = new URL(affiliateUrl);
  url.searchParams.set(config.affiliateIdParam, affiliateId);
  if (campaign) {
    url.searchParams.set(config.campaignParam, campaign);
  }
  return url.toString();
}
