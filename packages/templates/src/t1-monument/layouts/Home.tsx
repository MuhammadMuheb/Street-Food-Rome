/**
 * packages/templates/src/t1-monument/layouts/Home.tsx — T1 Monument homepage.
 *
 * Composes only the blocks that have a real data source on the current
 * `Pages` schema (hero, tours, FAQ, body copy). `TicketOptions`, `VisitorFacts`,
 * and `LandmarkGallery` stay available in ../blocks for future use once Pages
 * grows dedicated structured fields for ticket/fact lists — wiring them in
 * now would mean inventing data that doesn't exist yet.
 */
import { HeroLandmark } from '../blocks/HeroLandmark';
import { TourCards } from '../blocks/TourCards';
import { LandmarkBrief } from '../blocks/LandmarkBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import { CTA_STYLES } from '../../shared/cta-styles';
import type { TemplateComponentProps } from '../../types';

export function Home({ site, page }: TemplateComponentProps) {
  const ctaStyle = CTA_STYLES[site.niche];

  return (
    <>
      <HeroLandmark title={page.title} heroImageUrl={page.heroImageUrl} ctaHref="#tours" ctaLabel={ctaStyle.primaryLabel} />
      {page.bodyHtml ? <LandmarkBrief heading="About this site" bodyHtml={page.bodyHtml} /> : null}
      <div id="tours">
        <TourCards tours={page.tours} />
      </div>
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
