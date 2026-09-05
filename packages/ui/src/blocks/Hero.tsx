/**
 * packages/ui/src/blocks/Hero.tsx — generic page-top hero block: heading,
 * subheading, optional background image, optional primary CTA.
 *
 * Category-specific hero variants (e.g. T3 Food's HeroAppetite) compose this
 * rather than duplicating its layout.
 */
import type { ReactNode } from 'react';
import { Container } from '../primitives/Container';
import { ButtonLink } from '../primitives/Button';

export interface HeroProps {
  heading: string;
  subheading?: string;
  imageUrl?: string;
  imageAlt?: string;
  primaryCta?: { label: string; href: string };
  children?: ReactNode;
}

export function Hero({ heading, subheading, imageUrl, imageAlt, primaryCta, children }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-primary text-inverse">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={imageAlt ?? ''} className="absolute inset-0 h-full w-full object-cover opacity-40" />
      ) : null}
      <Container className="relative py-20">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">{heading}</h1>
        {subheading ? <p className="mt-4 max-w-2xl text-lg opacity-90">{subheading}</p> : null}
        {primaryCta ? (
          <ButtonLink href={primaryCta.href} variant="accent" className="mt-8">
            {primaryCta.label}
          </ButtonLink>
        ) : null}
        {children}
      </Container>
    </div>
  );
}
