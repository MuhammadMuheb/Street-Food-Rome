import type { Metadata } from 'next';
import { getAllBlogPosts, getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { TrustPointsSection } from '@/components/TrustPointsSection';
import { MediaBar } from '@/components/MediaBar';
import { TourCarouselSection } from '@/components/TourCarouselSection';
import { CategoryToursSection } from '@/components/CategoryToursSection';
import { ExploreLinksSection } from '@/components/ExploreLinksSection';
import { AllDestinationsSection } from '@/components/AllDestinationsSection';
import { tourHref } from '@/lib/tours';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageDoc('home');
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/` },
    openGraph: page.heroImageUrl
      ? {
          title: page.metaTitle,
          description: page.metaDesc,
          url: `https://${SITE_DOMAIN}/`,
          images: [{ url: page.heroImageUrl, alt: page.title }],
        }
      : undefined,
    twitter: page.heroImageUrl ? { card: 'summary_large_image', images: [page.heroImageUrl] } : undefined,
  };
}

export default async function HomePage() {
  const [page, tours, allBlogPosts] = await Promise.all([getPageDoc('home'), getAllTours(), getAllBlogPosts()]);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Street Food Rome',
      url: `https://${SITE_DOMAIN}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Street Food Rome',
      url: `https://${SITE_DOMAIN}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: tours.slice(0, 19).map((tour, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://${SITE_DOMAIN}${tourHref(tour.slug)}`,
        name: tour.title,
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero imageUrl={page?.heroImageUrl ?? null} />
      <TrustPointsSection />
      <MediaBar />
      <TourCarouselSection tours={tours} />
      <CategoryToursSection tours={tours} />
      <ExploreLinksSection tours={tours} allBlogPosts={allBlogPosts} />
      <AllDestinationsSection />
    </>
  );
}
