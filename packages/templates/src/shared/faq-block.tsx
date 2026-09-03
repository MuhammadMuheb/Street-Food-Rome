/**
 * packages/templates/src/shared/faq-block.tsx — thin adapter from
 * TemplateFaq[] to packages/ui's FAQ block, shared by every template pack.
 */
import { FAQ } from '@italy-tours/ui';
import type { TemplateFaq } from '../types';

export function TemplateFaqBlock({ faqs }: { faqs: TemplateFaq[] }) {
  return <FAQ items={faqs} />;
}
