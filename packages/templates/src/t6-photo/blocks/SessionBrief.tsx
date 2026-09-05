/**
 * packages/templates/src/t6-photo/blocks/SessionBrief.tsx — photo-session
 * background/context copy, rendered from Payload's richText body.
 */
import { Section } from '@italy-tours/ui';

export interface SessionBriefProps {
  heading: string;
  bodyHtml: string;
}

export function SessionBrief({ heading, bodyHtml }: SessionBriefProps) {
  return (
    <Section heading={heading}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="prose max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </Section>
  );
}
