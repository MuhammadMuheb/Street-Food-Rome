/**
 * apps/web/src/sites/streetfoodrome/components/AperitivoVariant.tsx —
 * bespoke evening-angle section for /aperitivo-evening-tour.
 */
import { Section, CTA } from '@italy-tours/ui';

export function AperitivoVariant({ body, ctaHref }: { body: string; ctaHref: string }) {
  return (
    <Section heading="Aperitivo, done right" className="bg-primary/5">
      <p className="text-foreground/80">{body}</p>
      <div className="mt-6">
        <CTA heading="Ready for golden hour in Rome?" primary={{ label: 'Reserve your aperitivo tour', href: ctaHref }} />
      </div>
    </Section>
  );
}
