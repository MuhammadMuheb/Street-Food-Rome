/**
 * packages/templates/src/t6-photo/layouts/MoneyPage.tsx — T6 Photo money
 * page: hero, body copy, tour comparison, FAQ, closing CTA.
 */
import { CTA } from '@italy-tours/ui';
import { HeroPhotoSession } from '../blocks/HeroPhotoSession';
import { TourCards } from '../blocks/TourCards';
import { SessionBrief } from '../blocks/SessionBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import { CTA_STYLES } from '../../shared/cta-styles';
import type { TemplateComponentProps } from '../../types';

export function MoneyPage({ site, page }: TemplateComponentProps) {
  const ctaStyle = CTA_STYLES[site.niche];
  const primaryTourHref = page.tours[0]?.href ?? '#';

  return (
    <>
      <HeroPhotoSession title={page.title} heroImageUrl={page.heroImageUrl} ctaHref={primaryTourHref} ctaLabel={ctaStyle.primaryLabel} />
      {page.bodyHtml ? <SessionBrief heading="What to expect" bodyHtml={page.bodyHtml} /> : null}
      <TourCards tours={page.tours} />
      <TemplateFaqBlock faqs={page.faqs} />
      <div className="py-12">
        <CTA heading={ctaStyle.heading} primary={{ label: ctaStyle.primaryLabel, href: primaryTourHref }} />
      </div>
    </>
  );
}
