import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACTIVE_NETWORK_SLUG } from '@/lib/tours';

/**
 * Only the one active network property (ACTIVE_NETWORK_SLUG) gets its
 * sub-pages rewritten to the real site content — e.g. /street-food-rome/about
 * transparently serves the same content as /about, with the browser URL
 * staying prefixed. The other 12 properties are separate, not-yet-built
 * projects: their sub-paths are left alone here and fall through to the
 * app/[slug]/[...rest] catch-all, which renders an "under construction"
 * placeholder instead of this site's content.
 *
 * The bare /{slug} root (any of the 13) is left untouched either way — it's
 * handled by app/[slug]/page.tsx directly, not by this rewrite, since there's
 * nothing to strip when there's only one segment.
 */
export function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split('/').filter(Boolean);

  if (segments.length >= 2 && segments[0] === ACTIVE_NETWORK_SLUG) {
    const url = request.nextUrl.clone();
    url.pathname = `/${segments.slice(1).join('/')}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
