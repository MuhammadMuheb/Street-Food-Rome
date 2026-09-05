/**
 * packages/ui/src/blocks/OfferHero.tsx — above-the-fold hero for a single,
 * conversion-focused offer page (e.g. an Instagram link-in-bio landing page).
 *
 * Differs from the generic Hero block in one deliberate way: the primary CTA
 * renders immediately after the subheading with no scrolling required —
 * traffic arriving from a bio link has already decided to look, the job here
 * is to not make them hunt for the button.
 */
import { Container } from '../primitives/Container';
import { Badge } from '../primitives/Badge';
import { ButtonLink } from '../primitives/Button';

export interface OfferHeroProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  imageUrl?: string;
  imageAlt?: string;
  primaryCta: { label: string; href: string };
}

export function OfferHero({ eyebrow, heading, subheading, imageUrl, imageAlt, primaryCta }: OfferHeroProps) {
  return (
    <div className="relative overflow-hidden bg-primary text-background">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={imageAlt ?? ''} className="absolute inset-0 h-full w-full object-cover opacity-40" />
      ) : null}
      <Container className="relative py-10 sm:py-16">
        {eyebrow ? (
          <Badge className="bg-accent text-background">{eyebrow}</Badge>
        ) : null}
        <h1 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">{heading}</h1>
        {subheading ? <p className="mt-3 max-w-xl text-base opacity-90">{subheading}</p> : null}
        <ButtonLink href={primaryCta.href} variant="accent" className="mt-6 w-full text-center sm:w-auto">
          {primaryCta.label}
        </ButtonLink>
      </Container>
    </div>
  );
}
