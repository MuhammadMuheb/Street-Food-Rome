/**
 * packages/affiliate/src/cloak.ts — resolves a `/go/:slug` request
 * (Tours.slug) to the real, campaign-tagged affiliate URL. Used only by
 * apps/web/src/app/go/[slug]/route.ts.
 */
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import { buildTourAffiliateUrl } from './linkBuilder';
import type { AffiliatePartnerKey } from './types';

export interface CloakResolution {
  tourId: string;
  destinationUrl: string;
  partner: AffiliatePartnerKey;
}

export async function resolveCloakedSlug(slug: string): Promise<CloakResolution | null> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });

  const tour = result.docs[0];
  if (!tour) return null;

  const partner = tour.partner as AffiliatePartnerKey;

  // Our own account id for this partner (Partners.affiliateId) — not
  // Tours.partnerProductId, which identifies the product, not us.
  const partnerAccount = await payload.find({
    collection: 'partners',
    where: { key: { equals: partner } },
    limit: 1,
    depth: 0,
  });

  const affiliateId = partnerAccount.docs[0]?.affiliateId;
  if (!affiliateId) return null;

  const destinationUrl = buildTourAffiliateUrl({
    affiliateUrl: tour.affiliateUrl,
    partner,
    affiliateId,
    campaign: slug,
  });

  return { tourId: String(tour.id), destinationUrl, partner };
}
