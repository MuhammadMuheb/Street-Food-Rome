import type { Metadata } from 'next';
import { getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { TrustPointsSection } from '@/components/TrustPointsSection';
import { MediaBar } from '@/components/MediaBar';
import { TourCarouselSection } from '@/components/TourCarouselSection';
import { CategoryToursSection } from '@/components/CategoryToursSection';
import { ExploreLinksSection } from '@/components/ExploreLinksSection';
import { AllDestinationsSection } from '@/components/AllDestinationsSection';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageDoc('home');
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/` },
  };
}

export default async function HomePage() {
  const [page, tours] = await Promise.all([getPageDoc('home'), getAllTours()]);

  return (
    <>
      <Hero imageUrl={page?.heroImageUrl ?? null} />
      <TrustPointsSection />
      <MediaBar />
      <TourCarouselSection tours={tours} />
      <CategoryToursSection tours={tours} />
      <ExploreLinksSection tours={tours} />
      <AllDestinationsSection />
    </>
  );
}
