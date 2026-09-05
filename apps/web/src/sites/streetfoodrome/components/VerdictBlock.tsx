/**
 * apps/web/src/sites/streetfoodrome/components/VerdictBlock.tsx — bespoke
 * "is it worth it" first-hand verdict, closing out every money page. Feeds
 * from first-hand notes, establishing the credibility blueprint §5.2
 * requires on every page. Rendered as an oversized pull-quote — the
 * centerpiece of its section, not a footnoted aside.
 */
import { Section, PullQuote } from '@italy-tours/ui';

export function VerdictBlock({ verdict, attribution }: { verdict: string; attribution?: string }) {
  return (
    <Section kicker="Is it worth it?" tint>
      <PullQuote quote={verdict} attribution={attribution} />
    </Section>
  );
}
