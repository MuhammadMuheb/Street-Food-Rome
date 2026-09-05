/**
 * apps/web/src/sites/streetfoodrome/components/TourComparison.tsx — bespoke
 * side-by-side tour comparison, the money-page centerpiece. The first tour
 * carries an "Editor's pick" tag and the solid CTA; every other tour gets a
 * quieter text-link CTA — an actual hierarchy between tours, not identical
 * boxes repeated down the page.
 */
import Image from 'next/image';
import { Section, Badge, ButtonLink, type TourCardData } from '@italy-tours/ui';
import { tourImage } from '../placeholderImages';

export function TourComparison({ tours }: { tours: TourCardData[] }) {
  if (tours.length === 0) return null;

  return (
    <Section kicker="Compare" heading="Which tour should you book?" lede="Both routes run first-hand, small-group — the difference is neighbourhood and pace.">
      <div className="flex flex-col">
        {tours.map((tour, index) => {
          const isFlagship = index === 0;
          const image = tour.imageUrl ? { src: tour.imageUrl, alt: tour.imageAlt ?? '' } : tourImage(tour.href);

          return (
            <div
              key={tour.href}
              className="grid grid-cols-1 gap-6 border-t border-foreground/10 py-9 last:border-b sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-10"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-site sm:aspect-auto">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                {isFlagship ? (
                  <span className="mb-3 inline-flex w-fit items-center rounded-site border border-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                    Editor&rsquo;s pick
                  </span>
                ) : null}
                <h3 className="font-heading text-2xl font-semibold text-foreground">{tour.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {tour.priceBand ? <Badge>{tour.priceBand}</Badge> : null}
                  {tour.duration ? <Badge>{tour.duration}</Badge> : null}
                </div>
                <div className="mt-6">
                  {isFlagship ? (
                    <ButtonLink href={tour.href} variant="primary">
                      Reserve your spot
                    </ButtonLink>
                  ) : (
                    <a
                      href={tour.href}
                      className="inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-sm font-semibold text-foreground transition-all hover:gap-3"
                    >
                      See this tour <span aria-hidden>&rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
