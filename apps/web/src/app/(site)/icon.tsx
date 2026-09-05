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
 * headers the middleware never stamps for this excluded path.
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
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import { DEFAULT_THEME_TOKENS } from '@italy-tours/config';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  const headerList = await headers();
  const host = headerList.get('host')?.split(':')[0] ?? '';

  const payload = await getPayload({ config });
  const siteResult = await payload.find({
    collection: 'sites',
    where: { domain: { equals: host } },
    limit: 1,
    depth: 0,
  });
  const site = siteResult.docs[0];

  if (site?.slug === 'streetfoodrome') {
    return new ImageResponse(
      (
        <svg width={32} height={32} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="31" fill="#dc2626" stroke="#1c1917" strokeWidth="2" />
          <rect x="29" y="27" width="6" height="29" rx="3" fill="#fffaf0" />
          <rect x="19" y="24" width="26" height="5" rx="2.5" fill="#fffaf0" />
          <rect x="19" y="10" width="3.4" height="16" rx="1.7" fill="#fffaf0" />
          <rect x="26.3" y="8" width="3.4" height="18" rx="1.7" fill="#fffaf0" />
          <rect x="34.3" y="8" width="3.4" height="18" rx="1.7" fill="#fffaf0" />
          <rect x="41.6" y="10" width="3.4" height="16" rx="1.7" fill="#fffaf0" />
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
