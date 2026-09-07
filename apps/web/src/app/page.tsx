import type { Metadata } from 'next';
import { getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { TourCard } from '@/components/TourCard';
import { Carousel } from '@/components/Carousel';
import { VerdictCard } from '@/components/VerdictCard';
import { PhotoGridCard } from '@/components/PhotoGridCard';
import { NeighbourhoodBanner } from '@/components/NeighbourhoodBanner';
import { FeatureGrid } from '@/components/FeatureGrid';
import { SeoLinkFarm } from '@/components/SeoLinkFarm';
import { FaqSection } from '@/components/FaqSection';

export const revalidate = 3600;

// Tours have no page reference of their own (a Tour can be featured on more
// than one guide page) — this is the one place that needs to know which
// written guide each tour's card should link to.
const TOUR_GUIDE_HREF: Record<string, string> = {
  'trastevere-food-wine-walk': '/trastevere-food-tour',
  'testaccio-market-food-tour': '/testaccio-market-tour',
  'rome-food-wine-tasting': '/rome-food-wine-tour',
  'aperitivo-evening-experience': '/aperitivo-evening-tour',
};

const NEIGHBOURHOOD_META: Record<string, { name: string; description: string }> = {
  'trastevere-food-wine-walk': {
    name: 'Trastevere',
    description: 'Two streets back from the tourist piazza, where the trattorie still cook for the neighbourhood.',
  },
  'testaccio-market-food-tour': {
    name: 'Testaccio',
    description: 'Home to the market, the trapizzino, and the offal cooking that built this neighbourhood.',
  },
  'rome-food-wine-tasting': {
    name: 'Food & Wine Pairing',
    description: 'Lazio as a real wine region — Frascati and Cesanese del Piglio, matched course by course.',
  },
  'aperitivo-evening-experience': {
    name: 'Aperitivo Hour',
    description: 'Golden hour, done properly — two or three bars, never just one.',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageDoc('home');
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDesc,
      images: page.heroImageUrl ? [page.heroImageUrl] : undefined,
    },
  };
}

export default async function HomePage() {
  const [page, tours] = await Promise.all([getPageDoc('home'), getAllTours()]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: 'Street Food Rome',
        url: `https://${SITE_DOMAIN}`,
        description: page?.metaDesc,
        areaServed: { '@type': 'City', name: 'Rome' },
      },
      {
        '@type': 'ItemList',
        name: 'Rome Street Food Tours',
        itemListElement: tours.map((tour, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://${SITE_DOMAIN}${TOUR_GUIDE_HREF[tour.slug] ?? '/'}`,
          name: tour.title,
        })),
      },
      page && page.faqs.length > 0
        ? {
            '@type': 'FAQPage',
            mainEntity: page.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }
        : null,
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD requires raw <script> content; escaped below to prevent breaking out of the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <Hero imageUrl={page?.heroImageUrl ?? null} />
      <TrustBar />

      {/* Most Popular Tours — horizontal carousel */}
      <section id="tours" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Our best tours at a glance
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
          Most Popular Food Tours
        </h2>
        <div className="mt-10">
          <Carousel>
            {tours.map((tour, index) => (
              <div key={tour.slug} className="w-[300px] shrink-0 snap-start">
                <TourCard tour={tour} guideHref={TOUR_GUIDE_HREF[tour.slug] ?? '/'} priority={index === 0} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Verdicts — real first-hand quotes, styled like the reference's review carousel, never fabricated third-party testimonials */}
      <section className="border-y border-line bg-paper-tint">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            First-hand, every time
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
            The Honest Verdict on Every Tour
          </h2>
          <div className="mt-10">
            <Carousel>
              {tours
                .filter((t) => t.firstHandNotes)
                .map((tour) => (
                  <VerdictCard
                    key={tour.slug}
                    neighbourhood={NEIGHBOURHOOD_META[tour.slug]?.name ?? tour.city}
                    quote={tour.firstHandNotes!}
                    href={TOUR_GUIDE_HREF[tour.slug] ?? '/'}
                  />
                ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Photo grid — neighbourhoods & occasions, not fabricated multi-city "destinations" */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Eat like it&rsquo;s your neighbourhood
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
          Rome, By Neighbourhood &amp; Occasion
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour) => {
            const meta = NEIGHBOURHOOD_META[tour.slug];
            if (!meta || !tour.imageUrl) return null;
            return (
              <PhotoGridCard
                key={tour.slug}
                href={TOUR_GUIDE_HREF[tour.slug] ?? '/'}
                imageUrl={tour.imageUrl}
                imageAlt={`${meta.name}, Rome`}
                eyebrow="Rome"
                title={meta.name}
                priceBand={tour.priceBand}
              />
            );
          })}
        </div>
      </section>

      {/* Repeating banner + tour blocks — the reference's "Top Attractions" pattern, adapted to real neighbourhoods */}
      <section className="border-t border-line bg-paper-tint">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Things you must eat in this city
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
            Where to Go, Tour by Tour
          </h2>

          <div className="mt-10 space-y-16">
            {tours.map((tour) => {
              const meta = NEIGHBOURHOOD_META[tour.slug];
              if (!meta || !tour.imageUrl) return null;
              return (
                <div key={tour.slug}>
                  <NeighbourhoodBanner
                    name={meta.name}
                    imageUrl={tour.imageUrl}
                    imageAlt={`${meta.name} — ${tour.title}`}
                    description={meta.description}
                    href={TOUR_GUIDE_HREF[tour.slug] ?? '/'}
                  />
                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <TourCard tour={tour} guideHref={TOUR_GUIDE_HREF[tour.slug] ?? '/'} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FeatureGrid />
      <SeoLinkFarm />

      {page ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">The full story</p>
            <div
              className="mt-6 space-y-6 text-lg leading-relaxed text-ink-muted"
              // eslint-disable-next-line react/no-danger -- bodyHtml is authored/edited directly in the Firebase Console, not user input.
              dangerouslySetInnerHTML={{ __html: page.bodyHtml ?? '' }}
            />
          </div>
        </section>
      ) : null}

      {page ? <FaqSection faqs={page.faqs} /> : null}
    </>
  );
}
