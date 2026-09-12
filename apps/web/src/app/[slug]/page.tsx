import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { HomePageBody } from '@/components/HomePageBody';
import { UnderConstructionNotice } from '@/components/UnderConstructionNotice';
import { ACTIVE_NETWORK_SLUG, NETWORK_SITES, getNetworkSite } from '@/lib/tours';

export const revalidate = 3600;

export async function generateStaticParams() {
  return NETWORK_SITES.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};

  if (site.slug !== ACTIVE_NETWORK_SLUG) {
    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  const page = await getPageDoc('home');
  const title = page?.metaTitle ? page.metaTitle.replace('Street Food Rome', site.name) : site.name;
  const description = page?.metaDesc ?? "A first-hand guide to Rome's street food — honest recommendations, no tourist traps.";

  return {
    title,
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
    openGraph: page?.heroImageUrl
      ? {
          title,
          description,
          url: `https://${SITE_DOMAIN}/${site.slug}`,
          images: [{ url: page.heroImageUrl, alt: title }],
        }
      : undefined,
    twitter: page?.heroImageUrl ? { card: 'summary_large_image', images: [page.heroImageUrl] } : undefined,
  };
}

export default async function NetworkSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) notFound();

  // Only the one active property renders the real site — the other 12 are
  // separate, not-yet-built projects and show a plain placeholder instead.
  if (site.slug !== ACTIVE_NETWORK_SLUG) {
    return <UnderConstructionNotice siteName={site.name} />;
  }

  const [page, tours, allBlogPosts] = await Promise.all([getPageDoc('home'), getAllTours(), getAllBlogPosts()]);

  return (
    <HomePageBody
      siteName={site.name}
      canonicalUrl={`https://${SITE_DOMAIN}/${site.slug}`}
      heroImageUrl={page?.heroImageUrl ?? null}
      tours={tours}
      allBlogPosts={allBlogPosts}
    />
  );
}
