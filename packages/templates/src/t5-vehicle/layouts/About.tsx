/**
 * packages/templates/src/t5-vehicle/layouts/About.tsx — T5 Vehicle about
 * page: entity/author credibility content, no tour push.
 */
import { Section } from '@italy-tours/ui';
import { RouteBrief } from '../blocks/RouteBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import type { TemplateComponentProps } from '../../types';

export function About({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <RouteBrief heading="Who's behind this" bodyHtml={page.bodyHtml} /> : null}
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
