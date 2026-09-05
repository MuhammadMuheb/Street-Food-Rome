/**
 * packages/templates/src/t5-vehicle/blocks/HeroVehicleTour.tsx — T5 Vehicle's
 * hero variant: packages/ui's generic Hero, with ride-tour copy framing.
 */
import { Hero } from '@italy-tours/ui';

export interface HeroVehicleTourProps {
  title: string;
  heroImageUrl?: string | null;
  ctaHref: string;
  ctaLabel: string;
}

export function HeroVehicleTour({ title, heroImageUrl, ctaHref, ctaLabel }: HeroVehicleTourProps) {
  return (
    <Hero
      heading={title}
      subheading="Hit the road properly — first-hand route notes, not a rental-desk brochure."
      imageUrl={heroImageUrl ?? undefined}
      primaryCta={{ label: ctaLabel, href: ctaHref }}
    />
  );
}
