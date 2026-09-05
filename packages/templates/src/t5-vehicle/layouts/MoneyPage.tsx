/**
 * packages/templates/src/t5-vehicle/layouts/MoneyPage.tsx — T5 Vehicle money
 * page: hero, body copy, tour comparison, FAQ, closing CTA.
 */
import { CTA } from '@italy-tours/ui';
import { HeroVehicleTour } from '../blocks/HeroVehicleTour';
import { TourCards } from '../blocks/TourCards';
import { RouteBrief } from '../blocks/RouteBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import { CTA_STYLES } from '../../shared/cta-styles';
import type { TemplateComponentProps } from '../../types';

export function MoneyPage({ site, page }: TemplateComponentProps) {
  const ctaStyle = CTA_STYLES[site.niche];
  const primaryTourHref = page.tours[0]?.href ?? '#';

  return (
    <>
      <HeroVehicleTour title={page.title} heroImageUrl={page.heroImageUrl} ctaHref={primaryTourHref} ctaLabel={ctaStyle.primaryLabel} />
      {page.bodyHtml ? <RouteBrief heading="What to expect" bodyHtml={page.bodyHtml} /> : null}
      <TourCards tours={page.tours} />
      <TemplateFaqBlock faqs={page.faqs} />
      <div className="py-12">
        <CTA heading={ctaStyle.heading} primary={{ label: ctaStyle.primaryLabel, href: primaryTourHref }} />
      </div>
    </>
  );
}
