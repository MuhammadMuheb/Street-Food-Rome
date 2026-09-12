import { Hero } from '@/components/Hero';
import { TrustPointsSection } from '@/components/TrustPointsSection';
import { MediaBar } from '@/components/MediaBar';
import { TourCarouselSection } from '@/components/TourCarouselSection';
import { CategoryToursSection } from '@/components/CategoryToursSection';
import { ExploreLinksSection } from '@/components/ExploreLinksSection';
import { AllDestinationsSection } from '@/components/AllDestinationsSection';
import type { BlogPostDoc, TourDoc } from '@/lib/firestore';
import { tourHref } from '@/lib/tours';

interface HomePageBodyProps {
  siteName: string;
  canonicalUrl: string;
  heroImageUrl: string | null;
  tours: TourDoc[];
  allBlogPosts: BlogPostDoc[];
}

/**
 * The full homepage content structure (Hero through AllDestinationsSection),
 * shared between the main site ('/') and each network property's branded
 * page ('/{slug}') — only the JSON-LD's name/url and the Header's wordmark
 * (handled separately, by route, in Header.tsx) vary by brand.
 */
export function HomePageBody({ siteName, canonicalUrl, heroImageUrl, tours, allBlogPosts }: HomePageBodyProps) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: canonicalUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: canonicalUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: tours.slice(0, 19).map((tour, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${canonicalUrl.replace(/\/$/, '')}${tourHref(tour.slug)}`,
        name: tour.title,
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero imageUrl={heroImageUrl} />
      <TrustPointsSection />
      <MediaBar />
      <TourCarouselSection tours={tours} />
      <CategoryToursSection tours={tours} />
      <ExploreLinksSection tours={tours} allBlogPosts={allBlogPosts} />
      <AllDestinationsSection />
    </>
  );
}
