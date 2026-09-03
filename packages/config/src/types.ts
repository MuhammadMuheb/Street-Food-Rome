/**
 * @italy-tours/config — shared Site Registry types (M1).
 *
 * Single source of truth for the shape of a resolved `Site`, consumed by:
 *  - apps/web/middleware.ts            (fetches + stamps request headers/cookies)
 *  - apps/web/src/app/layout.tsx       (reads headers, renders CSS vars)
 *  - apps/web/src/site-resolver/*      (server components read headers back out)
 *  - cms/src/collections/Sites.ts      (Payload collection this type mirrors)
 */

export type SiteType = 'hero' | 'redirect';

export type SiteNiche = 'monument' | 'dayzia' | 'food' | 'cooking' | 'vehicle' | 'photo';

export type SiteStatus = 'draft' | 'live' | 'parked';

export type SiteLanguage = 'en' | 'it';

export type AffiliatePartner = 'getyourguide' | 'viator' | 'tiqets' | 'civitatis';

export type PageType = 'money' | 'support' | 'about' | 'legal';

/** Design tokens carried per-site; consumed as CSS custom properties by packages/ui. */
export interface ThemeTokens {
  colorPrimary: string;
  colorAccent: string;
  colorBackground: string;
  colorForeground: string;
  fontHeading: string;
  fontBody: string;
  radius: string;
  heroStyle: string;
  [key: string]: string;
}

/** Shape returned by GET /api/internal/resolve-site and consumed by middleware.ts. */
export interface ResolvedSite {
  id: string;
  domain: string;
  type: SiteType;
  slug: string;
  niche: SiteNiche;
  /** Templates.templateKey (e.g. "t3-food") — packages/templates/src/registry.ts's lookup key, not the raw Template doc id. */
  templateKey: string | null;
  heroTargetSiteId: string | null;
  heroTargetDomain: string | null;
  status: SiteStatus;
  language: SiteLanguage;
  themeTokens: ThemeTokens;
}

/** Request headers the middleware stamps onto every resolved, live request. */
export const SITE_REQUEST_HEADERS = {
  siteId: 'x-site-id',
  siteType: 'x-site-type',
  siteSlug: 'x-site-slug',
  siteNiche: 'x-site-niche',
  siteLanguage: 'x-site-language',
  siteTemplateId: 'x-site-template-id',
  themeTokens: 'x-theme-tokens',
} as const;

export const SITE_THEME_COOKIE = 'site-theme';
