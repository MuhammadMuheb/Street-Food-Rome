/**
 * packages/templates/src/t1-monument/blocks/LandmarkBrief.tsx — landmark
 * background/context copy, rendered from Payload's richText body.
 */
import { Section } from '@italy-tours/ui';

export interface LandmarkBriefProps {
  heading: string;
  bodyHtml: string;
}

export function LandmarkBrief({ heading, bodyHtml }: LandmarkBriefProps) {
  return (
    <Section heading={heading}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="prose max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </Section>
  );
}
