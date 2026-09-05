/**
 * packages/templates/src/t5-vehicle/layouts/Contact.tsx — T5 Vehicle contact
 * page: body copy plus the affiliate disclosure (also carried in
 * packages/ui's Footer, but repeated here per-page since /contact is where
 * visitors specifically look for it).
 */
import { Section } from '@italy-tours/ui';
import { RouteBrief } from '../blocks/RouteBrief';
import type { TemplateComponentProps } from '../../types';

export function Contact({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <RouteBrief heading="Get in touch" bodyHtml={page.bodyHtml} /> : null}
    </>
  );
}
