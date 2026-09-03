/**
 * packages/templates/src/t3-food/blocks/AperitivoVariant.tsx — evening
 * aperitivo-focused variant section, used on aperitivo-angle money pages.
 */
import { Section, CTA } from '@italy-tours/ui';

export interface AperitivoVariantProps {
  body: string;
  ctaHref: string;
}

export function AperitivoVariant({ body, ctaHref }: AperitivoVariantProps) {
  return (
    <Section heading="The aperitivo hour">
      <p className="text-foreground/80">{body}</p>
      <div className="mt-6">
        <CTA
          heading="Ready for aperitivo?"
          primary={{ label: 'Reserve your aperitivo tour', href: ctaHref }}
        />
      </div>
    </Section>
  );
}
