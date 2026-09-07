/**
 * apps/web/src/app/go/[slug]/route.ts — M3 Affiliate Engine: the cloaked
 * redirect every tour link on the site actually points at. Resolves the
 * slug to a real, campaign-tagged affiliate URL, logs the click, then 302s.
 * Never links directly to a partner URL anywhere else in the app.
 */
import { NextRequest, NextResponse } from 'next/server';
import { resolveCloakedSlug, logClickEvent } from '@italy-tours/affiliate';
import { getCurrentSite } from '@/site-resolver/resolveSite';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse> {
  const { slug } = await params;
  const site = await getCurrentSite();

  if (!site) {
    return NextResponse.redirect(new URL('/unresolved-domain', req.nextUrl.origin));
  }

  const resolution = await resolveCloakedSlug(slug);
  if (!resolution) {
    return NextResponse.json({ error: `No tour found for slug "${slug}"` }, { status: 404 });
  }

  await logClickEvent({
    siteDomain: site.domain,
    slug,
    tourSlug: resolution.tourSlug,
    partner: resolution.partner,
    referrer: req.headers.get('referer'),
    userAgent: req.headers.get('user-agent'),
  });

  return NextResponse.redirect(resolution.destinationUrl, { status: 302 });
}
