/**
 * packages/templates/src/t3-food/defaultTokens.ts — warm/food palette applied
 * to a new redirect site's Site.themeTokens when it picks this template
 * (see cms/src/endpoints/redirectSiteFactory.ts). Site.themeTokens stays the
 * actual source of truth once the site exists — this is only the seed value.
 */
import type { ThemeTokens } from '@italy-tours/config';

export const t3FoodDefaultTokens: ThemeTokens = {
  colorPrimary: '#7c2d12',
  colorAccent: '#f97316',
  colorBackground: '#fffbf5',
  colorForeground: '#292118',
  fontHeading: 'Georgia, serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.75rem',
  heroStyle: 'photo-forward',
};
