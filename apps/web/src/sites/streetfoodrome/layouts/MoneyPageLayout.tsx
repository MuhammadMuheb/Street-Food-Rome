/**
 * apps/web/src/sites/streetfoodrome/layouts/MoneyPageLayout.tsx — money page:
 * hero, body, tour comparison, first-hand verdict, author box, FAQ, closing
 * CTA, plus a persistent mobile sticky CTA (doc 05 §6: money pages need a
 * "sticky/repeated CTA" and an "is it worth it" verdict on top of the
 * baseline per-page requirements). One primary CTA plus one contextual link
 * per blueprint §5.2's structural requirements — the primary CTA is the
 * first tour's booking link (both in TourComparison and the sticky bar),
 * the contextual link is the FAQ's own copy.
 */
import { AuthorBox, FAQ, Section, CTA, StickyCTA, EditorialBreak } from '@italy-tours/ui';
import { Hero } from '../components/Hero';
import { NeighbourhoodGuide } from '../components/NeighbourhoodGuide';
import { TourComparison } from '../components/TourComparison';
import { VerdictBlock } from '../components/VerdictBlock';
import { PLACEHOLDER_IMAGES, heroImageForSlug, editorialBreakImage } from '../placeholderImages';
import type { StreetFoodRomePageProps } from '../types';

export function MoneyPageLayout({ page, slug }: StreetFoodRomePageProps) {
  const primaryTourHref = page.tours[0]?.href ?? '#';
  const hero = page.heroImageUrl ? { src: page.heroImageUrl, alt: '' } : heroImageForSlug(slug);
  const closingImage = editorialBreakImage(`${slug}-closing`);

  return (
    <>
      <Hero
        title={page.title}
        imageUrl={hero.src}
        imageAlt={hero.alt}
        stats={[
          { value: '4.8 ★', label: '212 reviews' },
          { value: page.tours[0]?.duration ?? '3 hrs', label: 'On foot' },
          { value: page.tours[0]?.priceBand ?? '€40+', label: 'Per person' },
          { value: 'Small group', label: 'Max 8 people' },
        ]}
      />
      {page.bodyHtml ? (
        <NeighbourhoodGuide
          kicker="What to expect"
          lede="This isn't a food-tasting checklist — it's an evening built around where Romans actually eat."
          bodyHtml={page.bodyHtml}
          imageUrl={PLACEHOLDER_IMAGES.pastaDish.src}
          imageAlt={PLACEHOLDER_IMAGES.pastaDish.alt}
          imageCaption="What you're actually eating."
        />
      ) : null}
      <EditorialBreak {...editorialBreakImage(slug)} />
      <TourComparison tours={page.tours} />
      {page.verdict ? <VerdictBlock verdict={page.verdict} attribution={page.author ? `${page.author.name} — Street Food Rome` : undefined} /> : null}
      {page.author || page.faqs.length > 0 ? (
        <Section padding="sm">
          <div className="grid gap-10 sm:grid-cols-[1fr_1.4fr] sm:gap-16">
            {page.author ? (
              <AuthorBox name={page.author.name} bio={page.author.bio ?? undefined} avatarUrl={page.author.avatarUrl ?? undefined} />
            ) : null}
            {page.faqs.length > 0 ? <FAQ items={page.faqs} /> : null}
          </div>
        </Section>
      ) : null}
      <CTA
        heading="Ready to eat like a local?"
        body="Small groups, real neighbourhoods, zero laminated menus."
        primary={{ label: 'Reserve your spot', href: primaryTourHref }}
        imageUrl={closingImage.src}
        imageAlt={closingImage.alt}
      />
      {/* Mobile-only persistent CTA — doc 05's "sticky/repeated CTA" requirement. */}
      <StickyCTA label="Reserve your spot" href={primaryTourHref} />
      <div className="h-16 sm:hidden" aria-hidden />
    </>
  );
}
