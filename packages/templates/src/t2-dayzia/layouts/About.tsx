/**
 * packages/templates/src/t2-dayzia/layouts/About.tsx — T2 Day Trip about
 * page: entity/author credibility content, no tour push.
 */
import { Section } from '@italy-tours/ui';
import { DayTripBrief } from '../blocks/DayTripBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import type { TemplateComponentProps } from '../../types';

export function About({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <DayTripBrief heading="Who's behind this" bodyHtml={page.bodyHtml} /> : null}
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
