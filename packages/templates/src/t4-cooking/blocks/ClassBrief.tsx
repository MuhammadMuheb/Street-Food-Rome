/**
 * packages/templates/src/t4-cooking/blocks/ClassBrief.tsx — cooking-class
 * background/context copy, rendered from Payload's richText body.
 */
import { Section } from '@italy-tours/ui';

export interface ClassBriefProps {
  heading: string;
  bodyHtml: string;
}

export function ClassBrief({ heading, bodyHtml }: ClassBriefProps) {
  return (
    <Section heading={heading}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="prose max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </Section>
  );
}
