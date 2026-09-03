/**
 * packages/templates/src/t3-food/layouts/Home.tsx — T3 Food homepage.
 *
 * Composes only the blocks that have a real data source on the current
 * `Pages` schema (hero, tours, FAQ, body copy). `WhatYouEatList`,
 * `MarketCards`, and `DishGallery` stay available in ../blocks for future
 * use once Pages grows dedicated structured fields for dish/market lists —
 * wiring them in now would mean inventing data that doesn't exist yet.
 */
import { HeroAppetite } from '../blocks/HeroAppetite';
import { TourCards } from '../blocks/TourCards';
import { NeighbourhoodGuide } from '../blocks/NeighbourhoodGuide';
import { TemplateFaqBlock } from '../../shared/faq-block';
import { CTA_STYLES } from '../../shared/cta-styles';
import type { TemplateComponentProps } from '../../types';

export function Home({ site, page }: TemplateComponentProps) {
  const ctaStyle = CTA_STYLES[site.niche];

  return (
    <>
      <HeroAppetite title={page.title} heroImageUrl={page.heroImageUrl} ctaHref="#tours" ctaLabel={ctaStyle.primaryLabel} />
      {page.bodyHtml ? <NeighbourhoodGuide heading="About this site" bodyHtml={page.bodyHtml} /> : null}
      <div id="tours">
        <TourCards tours={page.tours} />
      </div>
      <TemplateFaqBlock faqs={page.faqs} />
    </>
  );
}
