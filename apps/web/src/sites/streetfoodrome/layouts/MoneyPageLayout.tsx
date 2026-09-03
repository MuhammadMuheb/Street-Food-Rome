/**
 * apps/web/src/sites/streetfoodrome/layouts/MoneyPageLayout.tsx — money page:
 * hero, body, tour comparison, author box, FAQ, closing CTA. One primary CTA
 * plus one contextual link per blueprint §5.2's structural requirements —
 * the primary CTA is the first tour's booking link inside TourComparison,
 * the contextual link is the FAQ's own copy.
 */
import { AuthorBox, FAQ, Container, CTA } from '@italy-tours/ui';
import { Hero } from '../components/Hero';
import { NeighbourhoodGuide } from '../components/NeighbourhoodGuide';
import { TourComparison } from '../components/TourComparison';
import type { StreetFoodRomePageProps } from '../types';

export function MoneyPageLayout({ page }: StreetFoodRomePageProps) {
  const primaryTourHref = page.tours[0]?.href ?? '#';

  return (
    <>
      <Hero title={page.title} imageUrl={page.heroImageUrl} />
      {page.bodyHtml ? <NeighbourhoodGuide heading="What to expect" bodyHtml={page.bodyHtml} /> : null}
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
      <Container className="py-12">
        <CTA heading="Ready to book?" primary={{ label: 'Reserve your spot', href: primaryTourHref }} />
      </Container>
    </>
  );
}
