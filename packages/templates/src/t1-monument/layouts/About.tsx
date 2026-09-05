/**
 * packages/templates/src/t1-monument/layouts/About.tsx — T1 Monument about
 * page: entity/author credibility content, no tour push.
 */
import { Section } from '@italy-tours/ui';
import { LandmarkBrief } from '../blocks/LandmarkBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import type { TemplateComponentProps } from '../../types';

export function About({ page }: TemplateComponentProps) {
  return (
    <>
      <Section heading={page.title} />
      {page.bodyHtml ? <LandmarkBrief heading="Who's behind this" bodyHtml={page.bodyHtml} /> : null}
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
