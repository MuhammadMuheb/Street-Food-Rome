/**
 * packages/templates/src/t6-photo/layouts/Contact.tsx — T6 Photo contact
 * page: body copy plus the affiliate disclosure (also carried in
 * packages/ui's Footer, but repeated here per-page since /contact is where
 * visitors specifically look for it).
 */
import { Section } from '@italy-tours/ui';
import { SessionBrief } from '../blocks/SessionBrief';
import type { TemplateComponentProps } from '../../types';

export function Contact({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <SessionBrief heading="Get in touch" bodyHtml={page.bodyHtml} /> : null}
    </>
  );
}
