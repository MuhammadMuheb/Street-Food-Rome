/**
 * packages/templates/src/t4-cooking/layouts/Home.tsx — T4 Cooking homepage.
 *
 * Composes only the blocks that have a real data source on the current
 * `Pages` schema (hero, tours, FAQ, body copy). `MenuHighlights`,
 * `ClassFormatCards`, and `KitchenGallery` stay available in ../blocks for
 * future use once Pages grows dedicated structured fields for dish/format
 * lists — wiring them in now would mean inventing data that doesn't exist yet.
 */
import { HeroCookingClass } from '../blocks/HeroCookingClass';
import { TourCards } from '../blocks/TourCards';
import { ClassBrief } from '../blocks/ClassBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import { CTA_STYLES } from '../../shared/cta-styles';
import type { TemplateComponentProps } from '../../types';

export function Home({ site, page }: TemplateComponentProps) {
  const ctaStyle = CTA_STYLES[site.niche];

  return (
    <>
      <HeroCookingClass title={page.title} heroImageUrl={page.heroImageUrl} ctaHref="#tours" ctaLabel={ctaStyle.primaryLabel} />
      {page.bodyHtml ? <ClassBrief heading="About this site" bodyHtml={page.bodyHtml} /> : null}
      <div id="tours">
        <TourCards tours={page.tours} />
      </div>
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
