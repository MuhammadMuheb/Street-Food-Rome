/**
 * apps/web/src/sites/streetfoodrome/layouts/HomeLayout.tsx — hub page: niche
 * intro, top money pages via tour comparison, trust via author box + FAQ.
 */
import { AuthorBox, FAQ, Section, EditorialBreak } from '@italy-tours/ui';
import { Hero } from '../components/Hero';
import { NeighbourhoodGuide } from '../components/NeighbourhoodGuide';
import { TourComparison } from '../components/TourComparison';
import { FoodMatchTeaser } from '../components/FoodMatchTeaser';
import { PLACEHOLDER_IMAGES, heroImageForSlug } from '../placeholderImages';
import type { StreetFoodRomePageProps } from '../types';

export function HomeLayout({ page }: StreetFoodRomePageProps) {
  const hero = page.heroImageUrl ? { src: page.heroImageUrl, alt: '' } : heroImageForSlug('home');

  return (
    <>
      <Hero title={page.title} imageUrl={hero.src} imageAlt={hero.alt} />
      {page.bodyHtml ? (
        <NeighbourhoodGuide
          kicker="Welcome"
          heading="A first-hand guide to eating in Rome"
          bodyHtml={page.bodyHtml}
          imageUrl={PLACEHOLDER_IMAGES.trattoriaTables.src}
          imageAlt={PLACEHOLDER_IMAGES.trattoriaTables.alt}
          imageCaption="A piazza trattoria, most evenings."
        />
      ) : null}
      <EditorialBreak {...PLACEHOLDER_IMAGES.streetScene} caption="Trastevere — where locals still outnumber tourists" />
      <FoodMatchTeaser />
      <TourComparison tours={page.tours} />
      {page.author || page.faqs.length > 0 ? (
        <Section padding="sm" tint>
          <div className="grid gap-10 sm:grid-cols-[1fr_1.4fr] sm:gap-16">
            {page.author ? (
              <AuthorBox name={page.author.name} bio={page.author.bio ?? undefined} avatarUrl={page.author.avatarUrl ?? undefined} />
            ) : null}
            {page.faqs.length > 0 ? <FAQ items={page.faqs} /> : null}
          </div>
        </Section>
      ) : null}
    </>
  );
}
