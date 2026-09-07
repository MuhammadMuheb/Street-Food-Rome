/**
 * packages/affiliate/src/cloak.ts — resolves a `/go/:slug` request
 * (Tours.slug) to the real, campaign-tagged affiliate URL. Used only by
 * apps/web/src/app/go/[slug]/route.ts.
 */
import { getTourBySlug, getPartner } from '@italy-tours/firebase';
import { buildTourAffiliateUrl } from './linkBuilder';
import type { AffiliatePartnerKey } from './types';

export interface CloakResolution {
  tourSlug: string;
  destinationUrl: string;
  partner: AffiliatePartnerKey;
}

export async function resolveCloakedSlug(slug: string): Promise<CloakResolution | null> {
  const tour = await getTourBySlug(slug);
  if (!tour) return null;

  const partner = tour.partner as AffiliatePartnerKey;

  // Our own account id for this partner (Partners.affiliateId) — not
  // Tours.partnerProductId, which identifies the product, not us.
  const partnerAccount = await getPartner(partner);
  if (!partnerAccount) return null;

  const destinationUrl = buildTourAffiliateUrl({
    affiliateUrl: tour.affiliateUrl,
    partner,
    affiliateId: partnerAccount.affiliateId,
    campaign: slug,
  });

  return { tourSlug: tour.slug, destinationUrl, partner };
}
