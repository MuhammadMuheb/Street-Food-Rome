/**
 * apps/web/src/app/(site)/layout.tsx — root layout for every tenant site.
 *
 * Lives inside the (site) route group, not directly under app/, because
 * Payload's admin panel (app/(payload)/layout.tsx) needs its own <html>/<body>
 * — Next.js only allows that via sibling route groups each acting as their
 * own root layout, with no shared layout.tsx directly in app/.
 *
 * Reads the `x-theme-tokens` header the middleware stamped onto this request
 * (see ../../middleware.ts) and injects it as inline CSS custom properties on
 * `<html>`. Every shared UI primitive in `packages/ui` reads `var(--colorPrimary)`,
 * `var(--fontHeading)`, etc. — they never know which site they're rendering for.
 *
 * Also injects GA4 (M7 · Analytics) from the same request's `x-site-ga-id`
 * header, per-site rather than one hardcoded property — every site owns its
 * own analytics. Renders nothing when a site has no gaId set yet (true for
 * every seeded site today; the CMS field is there, just empty).
 */
import type { CSSProperties } from 'react';
import { headers } from 'next/headers';
import Script from 'next/script';
import { SITE_REQUEST_HEADERS, parseThemeTokens, tokensToCssVars, DEFAULT_THEME_TOKENS } from '@italy-tours/config';
import '../globals.css';

function resolveThemeStyle(themeTokenHeader: string | null): CSSProperties {
  const parsed = parseThemeTokens(themeTokenHeader);
  const merged = { ...DEFAULT_THEME_TOKENS, ...parsed };
  return tokensToCssVars(merged) as CSSProperties;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const themeStyle = resolveThemeStyle(headerList.get(SITE_REQUEST_HEADERS.themeTokens));
  const language = headerList.get(SITE_REQUEST_HEADERS.siteLanguage) ?? 'en';
  const gaId = headerList.get(SITE_REQUEST_HEADERS.siteGaId);

  return (
    <html lang={language} style={themeStyle}>
      <body>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
