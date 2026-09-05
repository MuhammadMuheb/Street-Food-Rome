/**
 * packages/templates/src/t4-cooking/blocks/HeroCookingClass.tsx — T4 Cooking's
 * hero variant: packages/ui's generic Hero, with cooking-class copy framing.
 */
import { Hero } from '@italy-tours/ui';

export interface HeroCookingClassProps {
  title: string;
  heroImageUrl?: string | null;
  ctaHref: string;
  ctaLabel: string;
}

export function HeroCookingClass({ title, heroImageUrl, ctaHref, ctaLabel }: HeroCookingClassProps) {
  return (
    <Hero
      heading={title}
      subheading="Cook like a local — first-hand notes on class format, not a stock listing."
      imageUrl={heroImageUrl ?? undefined}
      primaryCta={{ label: ctaLabel, href: ctaHref }}
    />
  );
}
