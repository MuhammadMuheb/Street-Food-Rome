/**
 * packages/templates/src/t6-photo/layouts/Home.tsx — T6 Photo homepage.
 *
 * Composes only the blocks that have a real data source on the current
 * `Pages` schema (hero, tours, FAQ, body copy). `ShotListHighlights`,
 * `SessionPackages`, and `PortfolioGallery` stay available in ../blocks for
 * future use once Pages grows dedicated structured fields for shot/package
 * lists — wiring them in now would mean inventing data that doesn't exist yet.
 */
import { HeroPhotoSession } from '../blocks/HeroPhotoSession';
import { TourCards } from '../blocks/TourCards';
import { SessionBrief } from '../blocks/SessionBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import { CTA_STYLES } from '../../shared/cta-styles';
import type { TemplateComponentProps } from '../../types';

export function Home({ site, page }: TemplateComponentProps) {
  const ctaStyle = CTA_STYLES[site.niche];

  return (
    <>
      <HeroPhotoSession title={page.title} heroImageUrl={page.heroImageUrl} ctaHref="#tours" ctaLabel={ctaStyle.primaryLabel} />
      {page.bodyHtml ? <SessionBrief heading="About this site" bodyHtml={page.bodyHtml} /> : null}
      <div id="tours">
        <TourCards tours={page.tours} />
      </div>
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
