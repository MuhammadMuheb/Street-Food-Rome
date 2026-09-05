/**
 * apps/web/src/sites/streetfoodrome/layouts/SupportPageLayout.tsx — used for
 * support, about, and contact-flavored ("legal") page types: informational,
 * no tour push, still carries the author box + FAQ credibility elements.
 *
 * The body section deliberately does NOT repeat `page.title` as its own
 * heading (it used to — a duplicate H1/H2 bug) — it either uses no heading
 * at all (the body copy sits right under the hero) or a generic one like
 * "The short version", never the page's own title verbatim.
 */
import { AuthorBox, FAQ, Section, EditorialBreak } from '@italy-tours/ui';
import { Hero } from '../components/Hero';
import { NeighbourhoodGuide } from '../components/NeighbourhoodGuide';
import { MarketCards } from '../components/MarketCards';
import { PLACEHOLDER_IMAGES, heroImageForSlug, editorialBreakImage, itemImage } from '../placeholderImages';
import type { StreetFoodRomePageProps } from '../types';

// Bespoke to /rome-market-guide only — real market names/notes, same pattern
// as FoodMatchQuiz's hardcoded question set (no CMS field backs this yet).
const ROME_MARKETS = [
  { name: 'Testaccio Market', description: 'Where Roman home cooks actually shop — and where the trapizzino was invented.' },
  { name: "Campo de' Fiori", description: 'Postcard-pretty and priced for it — go early, before the tour groups arrive.' },
  { name: 'Mercato di Piazza San Cosimato', description: 'Trastevere’s neighbourhood market, small enough to see in twenty minutes.' },
  { name: 'Nuovo Mercato Esquilino', description: "Rome's most international market — as much a food tour as a shopping trip." },
];

export function SupportPageLayout({ page, slug }: StreetFoodRomePageProps) {
  const hero = page.heroImageUrl ? { src: page.heroImageUrl, alt: '' } : heroImageForSlug(slug);
  const pairedImage = slug === 'about' ? PLACEHOLDER_IMAGES.cafeOutdoor : itemImage(slug);

  return (
    <>
      <Hero title={page.title} imageUrl={hero.src} imageAlt={hero.alt} />
      {page.bodyHtml ? (
        <NeighbourhoodGuide bodyHtml={page.bodyHtml} imageUrl={pairedImage.src} imageAlt={pairedImage.alt} />
      ) : null}
      {slug === 'rome-market-guide' ? <MarketCards markets={ROME_MARKETS} /> : null}
      {slug !== 'contact' ? <EditorialBreak {...editorialBreakImage(slug)} /> : null}
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
