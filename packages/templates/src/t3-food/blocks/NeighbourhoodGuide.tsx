/**
 * packages/templates/src/t3-food/blocks/NeighbourhoodGuide.tsx — brief guide
 * to a food neighbourhood, rendered from Payload's richText body.
 */
import { Section } from '@italy-tours/ui';

export interface NeighbourhoodGuideProps {
  heading: string;
  bodyHtml: string;
}

export function NeighbourhoodGuide({ heading, bodyHtml }: NeighbourhoodGuideProps) {
  return (
    <Section heading={heading}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="prose max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </Section>
  );
}
