/**
 * GET /api/internal/resolve-site?domain=<hostname>
 *
 * Internal route handler `apps/web/middleware.ts` calls (with Next's fetch
 * cache + `tags: [`site:${domain}`]`) to turn a hostname into a `ResolvedSite`.
 * Runs in the Node runtime so it can use Payload's local API directly —
 * no HTTP hop to a separate CMS server.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@italy-tours/cms/payload.config';
import type { ResolvedSite, ThemeTokens } from '@italy-tours/config';

export const runtime = 'nodejs';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const domain = req.nextUrl.searchParams.get('domain');
  if (!domain) {
    return NextResponse.json({ error: 'Missing "domain" query param' }, { status: 400 });
  }

  const payload = await getPayload({ config });

  // depth: 1 so `heroTargetSite` populates into an object we can read `.domain`
  // off — the bare-301 branch in middleware.ts needs the target domain, not
  // just its id.
  const result = await payload.find({
    collection: 'sites',
    where: { domain: { equals: domain } },
    limit: 1,
    depth: 1,
  });

  const site = result.docs[0];
  if (!site) {
    return NextResponse.json({ error: `No site found for domain "${domain}"` }, { status: 404 });
  }

  // depth: 1 means `templateId` populates into the full Template doc — pull
  // its `templateKey` (e.g. "t3-food"), not the raw internal id, since
  // that's what packages/templates/src/registry.ts is keyed by.
  const template = typeof site.templateId === 'object' ? site.templateId : null;
  const heroTargetSite = typeof site.heroTargetSite === 'object' ? site.heroTargetSite : null;

  const resolved: ResolvedSite = {
    id: String(site.id),
    domain: site.domain,
    type: site.type,
    slug: site.slug,
    niche: site.niche,
    templateKey: template?.templateKey ?? null,
    heroTargetSiteId: heroTargetSite ? String(heroTargetSite.id) : null,
    heroTargetDomain: heroTargetSite?.domain ?? null,
    status: site.status,
    language: site.language,
    themeTokens: site.themeTokens as ThemeTokens,
  };

  return NextResponse.json(resolved, {
    headers: { 'Cache-Control': 'private, max-age=300' },
  });
}
