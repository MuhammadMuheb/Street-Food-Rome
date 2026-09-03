/**
 * packages/templates/src/t3-food/layouts/Contact.tsx — T3 Food contact page:
 * body copy plus the affiliate disclosure (also carried in packages/ui's
 * Footer, but repeated here per-page since /contact is where visitors
 * specifically look for it).
 */
import { Section } from '@italy-tours/ui';
import { NeighbourhoodGuide } from '../blocks/NeighbourhoodGuide';
import type { TemplateComponentProps } from '../../types';

export function Contact({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <NeighbourhoodGuide heading="Get in touch" bodyHtml={page.bodyHtml} /> : null}
    </>
  );
}
