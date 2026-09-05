/**
 * packages/templates/src/t6-photo/blocks/HeroPhotoSession.tsx — T6 Photo's
 * hero variant: packages/ui's generic Hero, with photo-session copy framing.
 */
import { Hero } from '@italy-tours/ui';

export interface HeroPhotoSessionProps {
  title: string;
  heroImageUrl?: string | null;
  ctaHref: string;
  ctaLabel: string;
}

export function HeroPhotoSession({ title, heroImageUrl, ctaHref, ctaLabel }: HeroPhotoSessionProps) {
  return (
    <Hero
      heading={title}
      subheading="Get the shot without the guesswork — first-hand notes on light, timing, and spots."
      imageUrl={heroImageUrl ?? undefined}
      primaryCta={{ label: ctaLabel, href: ctaHref }}
    />
  );
}
