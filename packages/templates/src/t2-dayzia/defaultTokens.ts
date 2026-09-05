/**
 * packages/templates/src/t2-dayzia/defaultTokens.ts — earthy/countryside
 * palette applied to a new redirect site's Site.themeTokens when it picks
 * this template (see cms/src/endpoints/redirectSiteFactory.ts). Site.themeTokens
 * stays the actual source of truth once the site exists — this is only the
 * seed value.
 */
import type { ThemeTokens } from '@italy-tours/config';

export const t2DayziaDefaultTokens: ThemeTokens = {
  colorPrimary: '#0f4c3a',
  colorAccent: '#f59e0b',
  colorBackground: '#f7f5f0',
  colorForeground: '#1f2937',
  fontHeading: 'Georgia, serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.75rem',
  heroStyle: 'photo-forward',
};
