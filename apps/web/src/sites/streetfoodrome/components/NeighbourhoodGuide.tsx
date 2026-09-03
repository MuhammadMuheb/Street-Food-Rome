/**
 * apps/web/src/sites/streetfoodrome/components/NeighbourhoodGuide.tsx —
 * bespoke body-copy section for /best-neighbourhoods-for-food and similar
 * support pages.
 */
import { Section } from '@italy-tours/ui';

export function NeighbourhoodGuide({ heading, bodyHtml }: { heading: string; bodyHtml: string }) {
  return (
    <Section heading={heading}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="prose max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </Section>
  );
}
