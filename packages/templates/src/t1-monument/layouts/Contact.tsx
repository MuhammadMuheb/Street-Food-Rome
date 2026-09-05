/**
 * packages/templates/src/t1-monument/layouts/Contact.tsx — T1 Monument
 * contact page: body copy plus the affiliate disclosure (also carried in
 * packages/ui's Footer, but repeated here per-page since /contact is where
 * visitors specifically look for it).
 */
import { Section } from '@italy-tours/ui';
import { LandmarkBrief } from '../blocks/LandmarkBrief';
import type { TemplateComponentProps } from '../../types';

export function Contact({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <LandmarkBrief heading="Get in touch" bodyHtml={page.bodyHtml} /> : null}
    </>
  );
}
