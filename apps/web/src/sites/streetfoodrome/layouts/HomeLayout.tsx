/**
 * apps/web/src/sites/streetfoodrome/layouts/HomeLayout.tsx — hub page: niche
 * intro, top money pages via tour comparison, trust via author box + FAQ.
 */
import { AuthorBox, FAQ, Container } from '@italy-tours/ui';
import { Hero } from '../components/Hero';
import { NeighbourhoodGuide } from '../components/NeighbourhoodGuide';
import { TourComparison } from '../components/TourComparison';
import type { StreetFoodRomePageProps } from '../types';

export function HomeLayout({ page }: StreetFoodRomePageProps) {
  return (
    <>
      <Hero title={page.title} imageUrl={page.heroImageUrl} />
      {page.bodyHtml ? <NeighbourhoodGuide heading="Welcome" bodyHtml={page.bodyHtml} /> : null}
      <TourComparison tours={page.tours} />
      {page.author ? (
        <Container className="py-8">
          <AuthorBox name={page.author.name} bio={page.author.bio ?? undefined} avatarUrl={page.author.avatarUrl ?? undefined} />
        </Container>
      ) : null}
      {page.faqs.length > 0 ? (
        <Container className="py-8">
          <FAQ items={page.faqs} />
        </Container>
      ) : null}
    </>
  );
}
