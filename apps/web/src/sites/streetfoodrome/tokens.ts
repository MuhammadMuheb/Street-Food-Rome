/**
 * apps/web/src/sites/streetfoodrome/tokens.ts — fallback token defaults.
 * `Site.themeTokens` (seeded via cms/src/seed/seedStreetFoodRome.ts) is the
 * actual source of truth once the Site record exists; this only covers the
 * unlikely case of the hero rendering before that record is seeded.
 */
import type { ThemeTokens } from '@italy-tours/config';

export const streetFoodRomeFallbackTokens: ThemeTokens = {
  colorPrimary: '#1c1917',
  colorAccent: '#dc2626',
  colorBackground: '#fffaf0',
  colorForeground: '#1c1917',
  fontHeading: 'Georgia, serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.25rem',
  heroStyle: 'editorial',
};
