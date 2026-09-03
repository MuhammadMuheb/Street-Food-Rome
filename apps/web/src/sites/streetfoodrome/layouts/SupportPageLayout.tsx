/**
 * apps/web/src/sites/streetfoodrome/layouts/SupportPageLayout.tsx — used for
 * support, about, and contact-flavored ("legal") page types: informational,
 * no tour push, still carries the author box + FAQ credibility elements.
 */
import { AuthorBox, FAQ, Container } from '@italy-tours/ui';
import { Hero } from '../components/Hero';
import { NeighbourhoodGuide } from '../components/NeighbourhoodGuide';
import type { StreetFoodRomePageProps } from '../types';

export function SupportPageLayout({ page }: StreetFoodRomePageProps) {
  return (
    <>
      <Hero title={page.title} imageUrl={page.heroImageUrl} />
      {page.bodyHtml ? <NeighbourhoodGuide heading={page.title} bodyHtml={page.bodyHtml} /> : null}
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
