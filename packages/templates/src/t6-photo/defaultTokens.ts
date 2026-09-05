/**
 * packages/templates/src/t6-photo/defaultTokens.ts — sleek gallery palette
 * applied to a new redirect site's Site.themeTokens when it picks this
 * template (see cms/src/endpoints/redirectSiteFactory.ts). Site.themeTokens
 * stays the actual source of truth once the site exists — this is only the
 * seed value.
 */
import type { ThemeTokens } from '@italy-tours/config';

export const t6PhotoDefaultTokens: ThemeTokens = {
  colorPrimary: '#18181b',
  colorAccent: '#eab308',
  colorBackground: '#fafafa',
  colorForeground: '#18181b',
  fontHeading: 'Georgia, serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.25rem',
  heroStyle: 'photo-forward',
};
