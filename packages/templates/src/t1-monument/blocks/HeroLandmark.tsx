/**
 * packages/templates/src/t1-monument/blocks/HeroLandmark.tsx — T1 Monument's
 * hero variant: packages/ui's generic Hero, with landmark-visit copy framing.
 */
import { Hero } from '@italy-tours/ui';

export interface HeroLandmarkProps {
  title: string;
  heroImageUrl?: string | null;
  ctaHref: string;
  ctaLabel: string;
}

export function HeroLandmark({ title, heroImageUrl, ctaHref, ctaLabel }: HeroLandmarkProps) {
  return (
    <Hero
      heading={title}
      subheading="Skip the line, skip the guesswork — first-hand visitor notes, not tourist-trap copy."
      imageUrl={heroImageUrl ?? undefined}
      primaryCta={{ label: ctaLabel, href: ctaHref }}
    />
  );
}
