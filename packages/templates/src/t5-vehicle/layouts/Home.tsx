/**
 * packages/templates/src/t5-vehicle/layouts/Home.tsx — T5 Vehicle homepage.
 *
 * Composes only the blocks that have a real data source on the current
 * `Pages` schema (hero, tours, FAQ, body copy). `RouteHighlights`,
 * `VehicleOptions`, and `RideGallery` stay available in ../blocks for future
 * use once Pages grows dedicated structured fields for route/option lists —
 * wiring them in now would mean inventing data that doesn't exist yet.
 */
import { HeroVehicleTour } from '../blocks/HeroVehicleTour';
import { TourCards } from '../blocks/TourCards';
import { RouteBrief } from '../blocks/RouteBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import { CTA_STYLES } from '../../shared/cta-styles';
import type { TemplateComponentProps } from '../../types';

export function Home({ site, page }: TemplateComponentProps) {
  const ctaStyle = CTA_STYLES[site.niche];

  return (
    <>
      <HeroVehicleTour title={page.title} heroImageUrl={page.heroImageUrl} ctaHref="#tours" ctaLabel={ctaStyle.primaryLabel} />
      {page.bodyHtml ? <RouteBrief heading="About this site" bodyHtml={page.bodyHtml} /> : null}
      <div id="tours">
        <TourCards tours={page.tours} />
      </div>
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
