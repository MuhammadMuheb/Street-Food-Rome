/**
 * packages/templates/src/t2-dayzia/blocks/HeroDayTrip.tsx — T2 Day Trip's
 * hero variant: packages/ui's generic Hero, with day-trip copy framing.
 */
import { Hero } from '@italy-tours/ui';

export interface HeroDayTripProps {
  title: string;
  heroImageUrl?: string | null;
  ctaHref: string;
  ctaLabel: string;
}

export function HeroDayTrip({ title, heroImageUrl, ctaHref, ctaLabel }: HeroDayTripProps) {
  return (
    <Hero
      heading={title}
      subheading="One day, done right — first-hand routes and timing, not a rushed coach itinerary."
      imageUrl={heroImageUrl ?? undefined}
      primaryCta={{ label: ctaLabel, href: ctaHref }}
    />
  );
}
