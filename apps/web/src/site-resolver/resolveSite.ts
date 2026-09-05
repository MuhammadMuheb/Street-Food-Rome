/**
 * apps/web/src/site-resolver/resolveSite.ts — server-side read of the
 * `x-site-*` headers the middleware stamped onto this request. Use this from
 * server components/route handlers instead of calling `headers()` directly,
 * so the header names + parsing stay in one place.
 */
import { headers } from 'next/headers';
import { SITE_REQUEST_HEADERS, parseThemeTokens, DEFAULT_THEME_TOKENS } from '@italy-tours/config';
import type { SiteLanguage, SiteNiche, SiteType, ThemeTokens } from '@italy-tours/config';

export interface CurrentSite {
  id: string;
  type: SiteType;
  slug: string;
  domain: string;
  niche: SiteNiche;
  language: SiteLanguage;
  templateKey: string | null;
  themeTokens: ThemeTokens;
  gaId: string | null;
}

/** Reads the resolved site for the current request off its headers. Null off-site (e.g. `/unresolved-domain`). */
export async function getCurrentSite(): Promise<CurrentSite | null> {
  const headerList = await headers();
  const id = headerList.get(SITE_REQUEST_HEADERS.siteId);
  const type = headerList.get(SITE_REQUEST_HEADERS.siteType) as SiteType | null;
  const slug = headerList.get(SITE_REQUEST_HEADERS.siteSlug);

  if (!id || !type || !slug) return null;

  const templateKey = headerList.get(SITE_REQUEST_HEADERS.siteTemplateId);

  return {
    id,
    type,
    slug,
    domain: headerList.get(SITE_REQUEST_HEADERS.siteDomain) ?? '',
    niche: (headerList.get(SITE_REQUEST_HEADERS.siteNiche) as SiteNiche | null) ?? 'monument',
    language: (headerList.get(SITE_REQUEST_HEADERS.siteLanguage) as SiteLanguage | null) ?? 'en',
    templateKey: templateKey ? templateKey : null,
    themeTokens: { ...DEFAULT_THEME_TOKENS, ...parseThemeTokens(headerList.get(SITE_REQUEST_HEADERS.themeTokens)) },
    gaId: headerList.get(SITE_REQUEST_HEADERS.siteGaId) || null,
  };
}
