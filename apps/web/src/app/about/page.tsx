import type { Metadata } from 'next';
import { getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { AboutHero } from '@/components/AboutHero';
import { OurTravelMantraSection } from '@/components/OurTravelMantraSection';
import { ExperiencesBannerSection } from '@/components/ExperiencesBannerSection';
import { WhoWritesThisSection } from '@/components/WhoWritesThisSection';
import { HowItStartedSection } from '@/components/HowItStartedSection';
import { HowWeChooseSection } from '@/components/HowWeChooseSection';
import { ExploreLinksSection } from '@/components/ExploreLinksSection';
import { AllDestinationsSection } from '@/components/AllDestinationsSection';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageDoc('about');
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/about` },
  };
}

export default async function AboutPage() {
  const tours = await getAllTours();

  return (
    <>
      <AboutHero />
      <OurTravelMantraSection />
      <ExperiencesBannerSection />
      <WhoWritesThisSection />
      <HowItStartedSection />
      <HowWeChooseSection />
      <ExploreLinksSection tours={tours} />
      <AllDestinationsSection />
    </>
  );
}
