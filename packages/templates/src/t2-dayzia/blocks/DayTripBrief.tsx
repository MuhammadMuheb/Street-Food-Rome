/**
 * packages/templates/src/t2-dayzia/blocks/DayTripBrief.tsx — day-trip
 * background/context copy, rendered from Payload's richText body.
 */
import { Section } from '@italy-tours/ui';

export interface DayTripBriefProps {
  heading: string;
  bodyHtml: string;
}

export function DayTripBrief({ heading, bodyHtml }: DayTripBriefProps) {
  return (
    <Section heading={heading}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="prose max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </Section>
  );
}
