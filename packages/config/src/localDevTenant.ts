/**
 * packages/config/src/localDevTenant.ts — shared local-dev tenant fallback.
 *
 * `middleware.ts` resolves bare `http://localhost:3000` (no subdomain) to
 * this domain purely for the internal site *lookup*, so anyone who types
 * "localhost:3000" gets the real site instead of "domain not configured".
 * Three routes are explicitly excluded from the middleware and resolve
 * their own site straight from the request Host header instead —
 * icon.tsx, robots.ts, sitemap.ts (each explains why in its own comment).
 * Before this shared helper, none of the three knew about the bare-
 * localhost fallback, so hitting the site at the exact URL middleware
 * makes "just work" still got the generic monogram favicon, an empty
 * sitemap, and a blocking robots.txt. One function keeps all four
 * consistent going forward instead of relying on four copies staying in
 * sync by hand.
 */
export const DEFAULT_LOCAL_TENANT_DOMAIN = 'streetfoodrome.com';

export function resolveLocalDevHostname(hostname: string): string {
  if (process.env.NODE_ENV === 'development' && hostname === 'localhost') {
    return DEFAULT_LOCAL_TENANT_DOMAIN;
  }
  return hostname;
}
