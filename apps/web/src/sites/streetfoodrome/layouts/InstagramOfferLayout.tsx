/**
 * apps/web/src/sites/streetfoodrome/layouts/InstagramOfferLayout.tsx —
 * mobile-first offer/landing page meant as the Instagram bio-link
 * destination: one above-the-fold CTA, quick proof (author + FAQ), and a
 * link-in-bio list fanning out to the rest of the site. Deliberately has no
 * nav header — a bio-link visitor is here to convert on one offer, not to
 * browse.
 *
 * Reachable at /instagram (see cms/src/seed/seedInstagramOfferPage.ts).
 */
import { AuthorBox, FAQ, Container, OfferHero, LinkInBioList, StickyCTA } from '@italy-tours/ui';
import { heroImageForSlug } from '../placeholderImages';
import type { StreetFoodRomePageProps } from '../types';

const QUICK_FACTS = ['3 hours, small group', 'First-hand guide, not a script', 'Instant confirmation'];

export function InstagramOfferLayout({ page }: StreetFoodRomePageProps) {
  const primaryTourHref = page.tours[0]?.href ?? '#';
  const hero = page.heroImageUrl ? { src: page.heroImageUrl, alt: '' } : heroImageForSlug('instagram');

  return (
    <>
      <OfferHero
        eyebrow="From our Instagram"
        heading={page.title}
        subheading={page.bodyHtml ? undefined : 'The exact food tour from our Reels — see it, then book it in under a minute.'}
        imageUrl={hero.src}
        imageAlt={hero.alt}
        primaryCta={{ label: 'Reserve your spot', href: primaryTourHref }}
      />

      <Container className="py-6">
        <ul className="flex flex-col gap-2 text-sm text-foreground/80">
          {QUICK_FACTS.map((fact) => (
            <li key={fact} className="flex items-center gap-2">
              <span aria-hidden className="text-accent">
                &#10003;
              </span>
              {fact}
            </li>
          ))}
        </ul>
      </Container>

      {page.author ? (
        <Container className="pb-6">
          <AuthorBox name={page.author.name} bio={page.author.bio ?? undefined} avatarUrl={page.author.avatarUrl ?? undefined} />
        </Container>
      ) : null}

      {page.faqs.length > 0 ? (
        <Container className="pb-8">
          <FAQ items={page.faqs} />
        </Container>
      ) : null}

      <LinkInBioList
        heading="More from Street Food Rome"
        links={[
          { label: 'All Rome street food tours', href: '/rome-street-food-tour', description: 'Compare every tour we recommend' },
          { label: 'Rome food markets guide', href: '/rome-market-guide', description: 'Where locals actually shop' },
          { label: 'About this site', href: '/about', description: "Who's behind Street Food Rome" },
        ]}
      />

      {/* Mobile-only persistent CTA — the bio-link visitor never has to scroll back up to book. */}
      <StickyCTA label="Reserve your spot" href={primaryTourHref} />
      <div className="h-16 sm:hidden" aria-hidden />

      <Container className="pb-8 pt-2 text-xs text-foreground/50">
        We earn a commission when you book through links on this page, at no extra cost to you.
      </Container>
    </>
  );
}
