/** packages/affiliate/src/types.ts — shared types for the affiliate engine. */
export type AffiliatePartnerKey = 'getyourguide' | 'viator' | 'tiqets' | 'civitatis';

export interface PartnerConfig {
  key: AffiliatePartnerKey;
  displayName: string;
  /** Query param the partner's affiliate program uses for the partner/affiliate id. */
  affiliateIdParam: string;
  /** Query param used to tag click-through campaigns for attribution. */
  campaignParam: string;
}

export interface ClickEventInput {
  siteDomain: string;
  slug: string;
  tourSlug?: string;
  partner?: AffiliatePartnerKey;
  referrer?: string | null;
  userAgent?: string | null;
}
