/**
 * apps/web/src/sites/streetfoodrome/tokens.ts — fallback token defaults.
 * `Site.themeTokens` (seeded via cms/src/seed/seedStreetFoodRome.ts) is the
 * actual source of truth once the Site record exists; this only covers the
 * unlikely case of the hero rendering before that record is seeded.
 */
import type { ThemeTokens } from '@italy-tours/config';

export const streetFoodRomeFallbackTokens: ThemeTokens = {
  colorPrimary: '#0a0a0a',
  colorAccent: '#dc2626',
  colorBackground: '#fafaf9',
  colorForeground: '#0a0a0a',
  fontHeading: 'Fraunces, Georgia, serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.25rem',
  heroStyle: 'editorial',
};
