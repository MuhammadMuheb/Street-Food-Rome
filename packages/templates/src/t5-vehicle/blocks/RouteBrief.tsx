/**
 * packages/templates/src/t5-vehicle/blocks/RouteBrief.tsx — ride/route
 * background/context copy, rendered from Payload's richText body.
 */
import { Section } from '@italy-tours/ui';

export interface RouteBriefProps {
  heading: string;
  bodyHtml: string;
}

export function RouteBrief({ heading, bodyHtml }: RouteBriefProps) {
  return (
    <Section heading={heading}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="prose max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </Section>
  );
}
