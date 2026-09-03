/**
 * apps/web/src/sites/streetfoodrome/components/TourComparison.tsx — bespoke
 * side-by-side tour comparison table, the money-page centerpiece.
 */
import { Section, Badge, ButtonLink, type TourCardData } from '@italy-tours/ui';

export function TourComparison({ tours }: { tours: TourCardData[] }) {
  if (tours.length === 0) return null;

  return (
    <Section heading="Which tour should you book?">
      <div className="flex flex-col gap-4">
        {tours.map((tour) => (
          <div
            key={tour.href}
            className="flex flex-col items-start justify-between gap-3 rounded-site border border-foreground/10 p-4 sm:flex-row sm:items-center"
          >
            <div>
              <h3 className="font-heading font-semibold text-foreground">{tour.title}</h3>
              <div className="mt-1 flex gap-2">
                {tour.priceBand ? <Badge>{tour.priceBand}</Badge> : null}
                {tour.duration ? <Badge>{tour.duration}</Badge> : null}
              </div>
            </div>
            <ButtonLink href={tour.href} variant="primary">
              Check availability
            </ButtonLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
