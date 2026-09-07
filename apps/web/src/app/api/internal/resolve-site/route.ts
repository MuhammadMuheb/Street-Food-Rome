/**
 * GET /api/internal/resolve-site?domain=<hostname>
 *
 * Internal route handler `apps/web/middleware.ts` calls (with Next's fetch
 * cache + `tags: [`site:${domain}`]`) to turn a hostname into a `ResolvedSite`.
 * Runs in the Node runtime so it can use the Firebase Admin SDK directly —
 * no HTTP hop to a separate CMS server.
 */
import { NextRequest, NextResponse } from 'next/server';
import { findSiteByDomain } from '@italy-tours/firebase';

export const runtime = 'nodejs';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const domain = req.nextUrl.searchParams.get('domain');
  if (!domain) {
    return NextResponse.json({ error: 'Missing "domain" query param' }, { status: 400 });
  }

  const site = await findSiteByDomain(domain);
  if (!site) {
    return NextResponse.json({ error: `No site found for domain "${domain}"` }, { status: 404 });
  }

  return NextResponse.json(site, {
    headers: { 'Cache-Control': 'private, max-age=300' },
  });
}
