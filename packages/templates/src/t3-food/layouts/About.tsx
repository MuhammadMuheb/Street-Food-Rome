/**
 * packages/templates/src/t3-food/layouts/About.tsx — T3 Food about page:
 * entity/author credibility content, no tour push.
 */
import { Section } from '@italy-tours/ui';
import { NeighbourhoodGuide } from '../blocks/NeighbourhoodGuide';
import { TemplateFaqBlock } from '../../shared/faq-block';
import type { TemplateComponentProps } from '../../types';

export function About({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <NeighbourhoodGuide heading="Who's behind this" bodyHtml={page.bodyHtml} /> : null}
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
