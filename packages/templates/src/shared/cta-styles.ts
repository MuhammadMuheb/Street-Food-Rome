/**
 * packages/templates/src/shared/cta-styles.ts — per-niche CTA copy pattern,
 * shared across every template pack so a food redirect site and a cooking
 * redirect site don't need to duplicate this mapping.
 */
import type { SiteNiche } from '@italy-tours/config';

export interface CtaStylePattern {
  heading: string;
  primaryLabel: string;
}

export const CTA_STYLES: Record<SiteNiche, CtaStylePattern> = {
  monument: { heading: 'Ready to see it in person?', primaryLabel: 'Reserve your ticket' },
  dayzia: { heading: 'Plan your day trip', primaryLabel: 'Reserve your day trip' },
  food: { heading: 'Ready to eat your way through the city?', primaryLabel: 'Reserve your food tour' },
  cooking: { heading: 'Ready to cook like a local?', primaryLabel: 'Reserve your class' },
  vehicle: { heading: 'Ready to hit the road?', primaryLabel: 'Reserve your ride' },
  photo: { heading: 'Ready to capture the shot?', primaryLabel: 'Reserve your session' },
};
