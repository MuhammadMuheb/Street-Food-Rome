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
 */
import type { CSSProperties } from 'react';
import { headers } from 'next/headers';
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

  return (
    <html lang={language} style={themeStyle}>
      <body>{children}</body>
    </html>
  );
}
