/**
 * packages/templates/src/t4-cooking/blocks/TourCards.tsx — featured-class
 * grid, thin adapter from TourCardData[] to packages/ui's TourCard.
 */
import { Section, TourCard, type TourCardData } from '@italy-tours/ui';

export function TourCards({ tours }: { tours: TourCardData[] }) {
  if (tours.length === 0) return null;

  return (
    <Section heading="Book a class">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour.href} {...tour} />
        ))}
      </div>
    </Section>
  );
}
