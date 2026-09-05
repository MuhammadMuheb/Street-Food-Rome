/**
 * packages/templates/src/t2-dayzia/layouts/Home.tsx — T2 Day Trip homepage.
 *
 * Composes only the blocks that have a real data source on the current
 * `Pages` schema (hero, tours, FAQ, body copy). `ItineraryTimeline`,
 * `WhatsIncluded`, and `DayTripGallery` stay available in ../blocks for future
 * use once Pages grows dedicated structured fields for itinerary/inclusion
 * lists — wiring them in now would mean inventing data that doesn't exist yet.
 */
import { HeroDayTrip } from '../blocks/HeroDayTrip';
import { TourCards } from '../blocks/TourCards';
import { DayTripBrief } from '../blocks/DayTripBrief';
import { TemplateFaqBlock } from '../../shared/faq-block';
import { CTA_STYLES } from '../../shared/cta-styles';
import type { TemplateComponentProps } from '../../types';

export function Home({ site, page }: TemplateComponentProps) {
  const ctaStyle = CTA_STYLES[site.niche];

  return (
    <>
      <HeroDayTrip title={page.title} heroImageUrl={page.heroImageUrl} ctaHref="#tours" ctaLabel={ctaStyle.primaryLabel} />
      {page.bodyHtml ? <DayTripBrief heading="About this site" bodyHtml={page.bodyHtml} /> : null}
      <div id="tours">
        <TourCards tours={page.tours} />
      </div>
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
