/**
 * packages/templates/src/t1-monument/layouts/MoneyPage.tsx — T1 Monument money
 * page: hero, body copy, ticket comparison, FAQ, closing CTA.
 */
import { CTA } from '@italy-tours/ui';
import { HeroLandmark } from '../blocks/HeroLandmark';
import { TourCards } from '../blocks/TourCards';
import { LandmarkBrief } from '../blocks/LandmarkBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import { CTA_STYLES } from '../../shared/cta-styles';
import type { TemplateComponentProps } from '../../types';

export function MoneyPage({ site, page }: TemplateComponentProps) {
  const ctaStyle = CTA_STYLES[site.niche];
  const primaryTourHref = page.tours[0]?.href ?? '#';

  return (
    <>
      <HeroLandmark title={page.title} heroImageUrl={page.heroImageUrl} ctaHref={primaryTourHref} ctaLabel={ctaStyle.primaryLabel} />
      {page.bodyHtml ? <LandmarkBrief heading="What to expect" bodyHtml={page.bodyHtml} /> : null}
      <TourCards tours={page.tours} />
      <TemplateFaqBlock faqs={page.faqs} />
      <div className="py-12">
        <CTA heading={ctaStyle.heading} primary={{ label: ctaStyle.primaryLabel, href: primaryTourHref }} />
      </div>
    </>
  );
}
