/**
 * apps/web/src/app/(site)/icon.tsx — browser-tab favicon for the tenant-site
 * route tree, using Next's dynamic `icon` file convention (renders per
 * request via ImageResponse/Satori).
 *
 * Not covered by the tenant middleware's site headers — same reasoning as
 * sitemap.ts/robots.ts, and necessarily so here: this route is explicitly
 * excluded from the middleware's rewrite-on-unresolved-domain behavior (see
 * middleware.ts's ICON_ROUTE_PREFIX) so a browser favicon request for an
 * unresolved domain still gets image bytes back instead of the
 * /unresolved-domain page's HTML. That means it resolves the site straight
 * from the Host header rather than `getCurrentSite()`, which depends on
 * headers the middleware never stamps for this excluded path — so it also
 * needs the same bare-localhost dev fallback middleware.ts applies (see
 * @italy-tours/config's localDevTenant.ts), or `http://localhost:3000`
 * — the exact URL middleware makes "just work" — would resolve no Site row
 * here and silently fall back to the generic monogram badge below.
 *
 * One deployed app serves every domain (blueprint §1.3), so a single static
 * favicon.ico would be wrong for a multi-tenant app — every site would show
 * the same icon. Instead: streetfoodrome.com gets its real designed mark
 * (redrawn here, not imported — Satori's renderer only supports a
 * constrained element set, not an arbitrary imported React/SVG component);
 * any other site (including ones not built yet) falls back to a monogram
 * badge generated from its own theme tokens, so nothing ever ships with a
 * blank or wrong tab icon.
 */
import { headers } from 'next/headers';
import { ImageResponse } from 'next/og';
import { findSiteByDomain } from '@italy-tours/firebase';
import { DEFAULT_THEME_TOKENS, resolveLocalDevHostname } from '@italy-tours/config';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  const headerList = await headers();
  const host = resolveLocalDevHostname(headerList.get('host')?.split(':')[0] ?? '');

  const site = await findSiteByDomain(host);

  if (site?.slug === 'streetfoodrome') {
    // The column glyph half of the header lockup (apps/web/src/sites/
    // streetfoodrome/components/LogoMark.tsx) on its own fixed-contrast dark
    // chip — a wordmark would be illegible at favicon size, and a favicon
    // can't respond to the page's own light/dark toggle (the browser fetches
    // it independently of this page's DOM/JS), so unlike the header logo it
    // needs one self-contained rendering that reads on any browser tab bar
    // rather than a light/dark pair. Redrawn (not imported) since Satori's
    // renderer only supports a constrained element set, not an arbitrary
    // imported React/SVG component.
    return new ImageResponse(
      (
        <svg width={32} height={32} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="44" height="44" rx="9" fill="#0a0a0a" />
          <rect x="12" y="10" width="24" height="4" rx="1" fill="#fafaf9" />
          <rect x="15" y="16" width="4" height="18" rx="1.5" fill="#fafaf9" />
          <rect x="22" y="14" width="4" height="20" rx="1.5" fill="#fafaf9" />
          <rect x="29" y="16" width="4" height="18" rx="1.5" fill="#fafaf9" />
          <rect x="12" y="34" width="24" height="4" rx="1" fill="#fafaf9" />
        </svg>
      ),
      size,
    );
  }

  const themeTokens = { ...DEFAULT_THEME_TOKENS, ...((site?.themeTokens as Record<string, string>) ?? {}) };
  const label = (site?.slug?.charAt(0) || host.charAt(0) || 'i').toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: themeTokens.colorAccent,
          borderRadius: '50%',
          color: themeTokens.colorBackground,
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {label}
      </div>
    ),
    size,
  );
}
