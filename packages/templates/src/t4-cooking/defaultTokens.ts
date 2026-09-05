/**
 * packages/templates/src/t4-cooking/defaultTokens.ts — warm kitchen palette
 * applied to a new redirect site's Site.themeTokens when it picks this
 * template (see cms/src/endpoints/redirectSiteFactory.ts). Site.themeTokens
 * stays the actual source of truth once the site exists — this is only the
 * seed value.
 */
import type { ThemeTokens } from '@italy-tours/config';

export const t4CookingDefaultTokens: ThemeTokens = {
  colorPrimary: '#78350f',
  colorAccent: '#65a30d',
  colorBackground: '#fffdf7',
  colorForeground: '#292118',
  fontHeading: 'Georgia, serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.75rem',
  heroStyle: 'photo-forward',
};
