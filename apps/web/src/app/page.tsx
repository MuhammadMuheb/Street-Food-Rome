import type { Metadata } from 'next';
import { getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { MediaBar } from '@/components/MediaBar';
import { TourCarouselSection } from '@/components/TourCarouselSection';

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
      <TrustBar />
      <MediaBar />
      <TourCarouselSection tours={tours} />
    </>
  );
}
