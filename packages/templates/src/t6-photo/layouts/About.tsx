/**
 * packages/templates/src/t6-photo/layouts/About.tsx — T6 Photo about page:
 * entity/author credibility content, no tour push.
 */
import { Section } from '@italy-tours/ui';
import { SessionBrief } from '../blocks/SessionBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import type { TemplateComponentProps } from '../../types';

export function About({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <SessionBrief heading="Who's behind this" bodyHtml={page.bodyHtml} /> : null}
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
