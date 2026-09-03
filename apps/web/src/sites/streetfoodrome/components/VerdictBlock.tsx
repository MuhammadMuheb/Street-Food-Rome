/**
 * apps/web/src/sites/streetfoodrome/components/VerdictBlock.tsx — bespoke
 * "is it worth it" first-hand verdict, closing out every money page. Feeds
 * from first-hand notes, establishing the credibility blueprint §5.2
 * requires on every page.
 */
import { Section } from '@italy-tours/ui';

export function VerdictBlock({ verdict }: { verdict: string }) {
  return (
    <Section heading="Is it worth it?">
      <p className="border-l-4 border-accent pl-4 italic text-foreground/80">{verdict}</p>
    </Section>
  );
}
