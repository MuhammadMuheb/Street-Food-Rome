import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { HomePageBody } from '@/components/HomePageBody';
import { UndergroundColosseumHome } from '@/components/UndergroundColosseumHome';
import { UnderConstructionNotice } from '@/components/UnderConstructionNotice';
import { ACTIVE_NETWORK_SLUG, NETWORK_SITES, getNetworkSite } from '@/lib/tours';
import { HERO_IMAGE } from '@/lib/underground-colosseum';

/**
 * Underground Colosseum gets its own bespoke homepage (built from the site's
 * dedicated blueprint + wireframe) even though it isn't the platform's
 * ACTIVE_NETWORK_SLUG test property — everywhere else in this app that check
 * still gates the shared T1 template, but this one hero has real, indexable
 * content of its own instead of the "under construction" placeholder.
 */
const BESPOKE_HERO_SLUG = 'underground-colosseum';

export const revalidate = 3600;

export async function generateStaticParams() {
  return NETWORK_SITES.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};

  if (site.slug === BESPOKE_HERO_SLUG) {
    const title = 'Underground & Arena Floor Colosseum Tours | Underground Colosseum';
    const description =
      "A first-hand guide to Colosseum underground and arena-floor access tours — honest comparisons across GetYourGuide, Viator, and Tiqets, from a Rome-based guide who has walked every circuit in person.";
    const ogImage = `${HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

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

  if (site.slug === BESPOKE_HERO_SLUG) {
    return <UndergroundColosseumHome />;
  }

  // Only the one active property renders the shared-template site — the
  // remaining not-yet-built projects show a plain placeholder instead.
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
