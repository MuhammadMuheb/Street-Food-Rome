import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UnderConstructionNotice } from '@/components/UnderConstructionNotice';
import { ACTIVE_NETWORK_SLUG, getNetworkSite } from '@/lib/tours';

/**
 * Catches every sub-path under one of the 12 not-yet-built network
 * properties (e.g. /rome-vespa/about, /rome-vespa/tours/...). The active
 * property's sub-paths never reach this route — middleware rewrites those to
 * the real page before Next.js routing runs — so if this route somehow gets
 * hit for ACTIVE_NETWORK_SLUG, that's a middleware bug, not a case to render.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site || site.slug === ACTIVE_NETWORK_SLUG) return {};
  return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
}

export default async function NetworkSiteSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site || site.slug === ACTIVE_NETWORK_SLUG) notFound();

  return <UnderConstructionNotice siteName={site.name} />;
}
