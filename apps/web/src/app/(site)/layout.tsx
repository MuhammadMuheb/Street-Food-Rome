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
 *
 * The inline script in <head> applies a stored dark-mode choice (see
 * packages/ui/src/layout/ThemeToggle.tsx) to <html> before first paint —
 * without it, the page would render light, then visibly flash to dark a
 * moment after hydration for anyone who'd chosen dark last visit. It has to
 * live here (a root layout, where Next.js allows a literal <head>) rather
 * than in ThemeToggle itself, which only runs after React hydrates.
 *
 * Fraunces is loaded here (not via next/font) as a plain Google Fonts
 * stylesheet, deliberately: a site's `fontHeading` theme token is a plain
 * CSS value stamped from the database (see resolveThemeStyle below), and
 * next/font only produces a *hashed*, build-scoped font-family name — a
 * per-tenant DB string can never reference that name. A real font-family
 * name ("Fraunces") is the only thing both the CSS var system and a literal
 * SVG fontFamily attribute (LogoMark.tsx) can agree on.
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
    // suppressHydrationWarning is scoped to this element only (React does not
    // propagate it to descendants) — it exists for exactly this case: an
    // attribute a script intentionally sets on <html> pre-hydration, which
    // React's own render legitimately doesn't know about.
    <html lang={language} style={themeStyle} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,500&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('sfr-theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}",
          }}
        />
      </head>
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
