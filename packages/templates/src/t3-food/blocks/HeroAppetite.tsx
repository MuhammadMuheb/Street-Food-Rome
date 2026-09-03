/**
 * packages/templates/src/t3-food/blocks/HeroAppetite.tsx — T3 Food's hero
 * variant: packages/ui's generic Hero, with food-specific copy framing.
 */
import { Hero } from '@italy-tours/ui';

export interface HeroAppetiteProps {
  title: string;
  heroImageUrl?: string | null;
  ctaHref: string;
  ctaLabel: string;
}

export function HeroAppetite({ title, heroImageUrl, ctaHref, ctaLabel }: HeroAppetiteProps) {
  return (
    <Hero
      heading={title}
      subheading="Eat like a local — first-hand routes, not tourist traps."
      imageUrl={heroImageUrl ?? undefined}
      primaryCta={{ label: ctaLabel, href: ctaHref }}
    />
  );
}
