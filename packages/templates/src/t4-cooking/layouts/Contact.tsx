/**
 * packages/templates/src/t4-cooking/layouts/Contact.tsx — T4 Cooking contact
 * page: body copy plus the affiliate disclosure (also carried in
 * packages/ui's Footer, but repeated here per-page since /contact is where
 * visitors specifically look for it).
 */
import { Section } from '@italy-tours/ui';
import { ClassBrief } from '../blocks/ClassBrief';
import type { TemplateComponentProps } from '../../types';

export function Contact({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <ClassBrief heading="Get in touch" bodyHtml={page.bodyHtml} /> : null}
    </>
  );
}
