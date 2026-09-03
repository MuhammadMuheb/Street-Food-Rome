/**
 * apps/web/src/middleware.ts — Hostname multi-tenancy entrypoint (M1 · Site Registry).
 *
 * Lives in src/, not the package root — Next.js only auto-detects
 * middleware there when the project uses a src/ directory (which this one
 * does, for src/app).
 *
 * Runs on the edge for every request, so it cannot talk to Postgres directly.
 * It normalizes the request hostname, resolves it against the cached
 * `/api/internal/resolve-site` route handler (which reads Payload's local API),
 * and stamps the result onto request headers + a `site-theme` cookie so the
 * App Router and shared UI primitives can render per-domain without knowing
 * anything about routing themselves.
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  SITE_REQUEST_HEADERS,
  SITE_THEME_COOKIE,
  serializeThemeTokens,
  type ResolvedSite,
} from '@italy-tours/config';

// `config.matcher` is kept as a best-effort build-time hint, but is NOT
// relied on: Next.js 15.4.11's dev server (verified independent of this
// project's code — reproduced with a trivial one-line middleware.ts) doesn't
// reliably read this static export and silently falls back to matching
// every request. The exclusion below inside `middleware()` itself is the
// real, authoritative guard — a runtime pathname check that works
// regardless of that build-time bug.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|admin|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)'],
};

const SITE_RESOLVER_PATH = '/api/internal/resolve-site';
// Revalidated early via `afterChangePublishRevalidate`'s `revalidateTag(`site:${domain}`)` call.
const SITE_CACHE_TTL_SECONDS = 300;
// A hung DB connection inside resolve-site must not hang every single page
// request — bound the wait and fall through to "unresolved" instead.
const SITE_RESOLVE_TIMEOUT_MS = 4000;
// Not "/_unresolved-domain" — Next's App Router treats a leading "_" as a
// private-folder marker and excludes that route from routing entirely.
const UNRESOLVED_DOMAIN_PATH = '/unresolved-domain';

const EXCLUDED_PATH_PREFIXES = ['/_next', '/api', '/admin', '/favicon.ico', '/sitemap.xml', '/robots.txt'];
const EXCLUDED_EXTENSIONS = /\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$/;

function isExcludedFromTenantResolution(pathname: string): boolean {
  return EXCLUDED_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)) ||
    EXCLUDED_EXTENSIONS.test(pathname);
}

function normalizeHostname(host: string | null): string {
  if (!host) return '';
  const withoutPort = host.split(':')[0]?.toLowerCase() ?? '';
  return withoutPort.startsWith('www.') ? withoutPort.slice(4) : withoutPort;
}

async function resolveSite(hostname: string, origin: string): Promise<ResolvedSite | null> {
  const timeout = AbortSignal.timeout(SITE_RESOLVE_TIMEOUT_MS);
  try {
    const res = await fetch(`${origin}${SITE_RESOLVER_PATH}?domain=${encodeURIComponent(hostname)}`, {
      next: { revalidate: SITE_CACHE_TTL_SECONDS, tags: [`site:${hostname}`] },
      signal: timeout,
    });
    if (!res.ok) return null;
    return (await res.json()) as ResolvedSite;
  } catch (err) {
    console.error(`[middleware] site resolution failed for "${hostname}"`, err);
    return null;
  }
}

function unresolvedDomainResponse(req: NextRequest): NextResponse {
  const url = req.nextUrl.clone();
  url.pathname = UNRESOLVED_DOMAIN_PATH;
  return NextResponse.rewrite(url);
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  if (isExcludedFromTenantResolution(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const hostname = normalizeHostname(req.headers.get('host'));
  if (!hostname) return NextResponse.next();

  // Local dev: ?__site=streetfoodrome.com bypasses hostname resolution.
  const devOverride = req.nextUrl.searchParams.get('__site');
  const lookupHost = process.env.NODE_ENV === 'development' && devOverride ? devOverride : hostname;

  const site = await resolveSite(lookupHost, req.nextUrl.origin);

  if (!site || site.status !== 'live') {
    return unresolvedDomainResponse(req);
  }

  // Bare-301 redirect sites (no template, just points at the hero) skip the
  // App Router entirely — configured per domain rather than inferred at runtime.
  if (site.type === 'redirect' && site.heroTargetDomain && !site.templateKey) {
    const target = new URL(req.nextUrl.pathname + req.nextUrl.search, `https://${site.heroTargetDomain}`);
    return NextResponse.redirect(target, 301);
  }

  const themeTokenHeader = serializeThemeTokens(site.themeTokens);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(SITE_REQUEST_HEADERS.siteId, site.id);
  requestHeaders.set(SITE_REQUEST_HEADERS.siteType, site.type);
  requestHeaders.set(SITE_REQUEST_HEADERS.siteSlug, site.slug);
  requestHeaders.set(SITE_REQUEST_HEADERS.siteNiche, site.niche);
  requestHeaders.set(SITE_REQUEST_HEADERS.siteLanguage, site.language);
  requestHeaders.set(SITE_REQUEST_HEADERS.siteTemplateId, site.templateKey ?? '');
  requestHeaders.set(SITE_REQUEST_HEADERS.themeTokens, themeTokenHeader);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Mirrored as a cookie so client components can read theme tokens without a round-trip.
  response.cookies.set(SITE_THEME_COOKIE, themeTokenHeader, {
    path: '/',
    sameSite: 'lax',
  });

  return response;
}
