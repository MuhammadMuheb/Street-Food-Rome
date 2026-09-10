import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTourBySlug, SITE_DOMAIN } from '@/lib/firestore';
import { TourPageContent, KEPT_TOURS } from '@/components/TourPageContent';

export const revalidate = 3600;

const REAL_SLUG = 'trastevere-food-wine-walk';

export async function generateMetadata(): Promise<Metadata> {
  const tour = await getTourBySlug(REAL_SLUG);
  if (!tour) return {};
  return {
    title: tour.title,
    description: tour.firstHandNotes ?? `${tour.title} — a Street Food Rome tour.`,
    alternates: { canonical: `https://${SITE_DOMAIN}/tours/trastevere-food-tour` },
  };
}

export default async function TrastevereFoodTourPage() {
  const tour = await getTourBySlug(REAL_SLUG);
  if (!tour) notFound();

  const others = await Promise.all(
    KEPT_TOURS.filter((t) => t.path !== 'trastevere-food-tour').map(async (t) => {
      const other = await getTourBySlug(t.realSlug);
      return other ? { title: other.title, href: `/tours/${t.path}` } : null;
    }),
  );

  return <TourPageContent tour={tour} otherTours={others.filter((o): o is { title: string; href: string } => Boolean(o))} />;
}
