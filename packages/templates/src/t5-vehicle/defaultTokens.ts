/**
 * packages/templates/src/t5-vehicle/defaultTokens.ts — bold road palette
 * applied to a new redirect site's Site.themeTokens when it picks this
 * template (see cms/src/endpoints/redirectSiteFactory.ts). Site.themeTokens
 * stays the actual source of truth once the site exists — this is only the
 * seed value.
 */
import type { ThemeTokens } from '@italy-tours/config';

export const t5VehicleDefaultTokens: ThemeTokens = {
  colorPrimary: '#7f1d1d',
  colorAccent: '#f59e0b',
  colorBackground: '#faf9f7',
  colorForeground: '#1c1917',
  fontHeading: 'system-ui, sans-serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.5rem',
  heroStyle: 'photo-forward',
};
