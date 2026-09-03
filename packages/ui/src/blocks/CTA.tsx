/**
 * packages/ui/src/blocks/CTA.tsx — the "one primary CTA" every hero page
 * (blueprint §5.2) must carry, plus an optional secondary/contextual link.
 */
import { ButtonLink } from '../primitives/Button';

export interface CTAProps {
  heading: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CTA({ heading, body, primary, secondary }: CTAProps) {
  return (
    <div className="rounded-site bg-primary/5 p-8 text-center">
      <h3 className="font-heading text-xl font-semibold text-foreground">{heading}</h3>
      {body ? <p className="mt-2 text-foreground/80">{body}</p> : null}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <ButtonLink href={primary.href} variant="primary">
          {primary.label}
        </ButtonLink>
        {secondary ? (
          <ButtonLink href={secondary.href} variant="outline">
            {secondary.label}
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}
