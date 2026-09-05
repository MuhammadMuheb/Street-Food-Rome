/**
 * packages/templates/src/t1-monument/defaultTokens.ts — stone/marble palette
 * applied to a new redirect site's Site.themeTokens when it picks this
 * template (see cms/src/endpoints/redirectSiteFactory.ts). Site.themeTokens
 * stays the actual source of truth once the site exists — this is only the
 * seed value.
 */
import type { ThemeTokens } from '@italy-tours/config';

export const t1MonumentDefaultTokens: ThemeTokens = {
  colorPrimary: '#1e293b',
  colorAccent: '#ca8a04',
  colorBackground: '#f8f7f4',
  colorForeground: '#1c1917',
  fontHeading: 'Georgia, serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.5rem',
  heroStyle: 'photo-forward',
};
