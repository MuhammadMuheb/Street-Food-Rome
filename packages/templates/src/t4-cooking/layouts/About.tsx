/**
 * packages/templates/src/t4-cooking/layouts/About.tsx — T4 Cooking about
 * page: entity/author credibility content, no tour push.
 */
import { Section } from '@italy-tours/ui';
import { ClassBrief } from '../blocks/ClassBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import type { TemplateComponentProps } from '../../types';

export function About({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <ClassBrief heading="Who's behind this" bodyHtml={page.bodyHtml} /> : null}
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
