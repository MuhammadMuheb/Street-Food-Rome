/**
 * cms/src/endpoints/redirectSiteFactory.ts — M6 Redirect Site Factory.
 *
 * POST /api/redirect-site-factory
 * Body: { domain, slug, niche, templateKey, themeTokens? }
 *
 * The backend half of "pick template → set domain → tag tours → publish":
 * looks up the Template by key, creates the Site (draft, so it isn't live
 * until someone flips status), and seeds a minimal `home` Page so the site
 * isn't empty. A dedicated admin-UI wizard around this endpoint is out of
 * scope for this pass — call it directly (as cms/src/seed/* scripts do).
 *
 * `themeTokens` is caller-supplied rather than looked up from the template
 * pack's own defaults (packages/templates/src/t3-food/defaultTokens.ts) —
 * this package stays backend-only and doesn't depend on packages/templates,
 * which pulls in React. Callers that know the template (e.g. a seed script)
 * import the default tokens themselves and pass them through.
 */
import type { Endpoint } from 'payload';
import { DEFAULT_THEME_TOKENS } from '@italy-tours/config';
import type { SiteNiche } from '@italy-tours/config';

interface RedirectSiteFactoryBody {
  domain: string;
  slug: string;
  niche: SiteNiche;
  templateKey: string;
  themeTokens?: Record<string, string>;
}

function isValidBody(body: unknown): body is RedirectSiteFactoryBody {
  if (typeof body !== 'object' || body === null) return false;
  const b = body as Record<string, unknown>;
  return typeof b.domain === 'string' && typeof b.slug === 'string' && typeof b.niche === 'string' && typeof b.templateKey === 'string';
}

export const redirectSiteFactory: Endpoint = {
  path: '/redirect-site-factory',
  method: 'post',
  handler: async (req) => {
    const body = await (req.json ? req.json() : Promise.resolve(undefined));

    if (!isValidBody(body)) {
      return Response.json({ error: 'domain, slug, niche, and templateKey are required.' }, { status: 400 });
    }

    const templateResult = await req.payload.find({
      collection: 'templates',
      where: { templateKey: { equals: body.templateKey } },
      limit: 1,
      depth: 0,
    });

    const template = templateResult.docs[0];
    if (!template) {
      return Response.json({ error: `No template found for templateKey "${body.templateKey}".` }, { status: 404 });
    }

    const site = await req.payload.create({
      collection: 'sites',
      data: {
        domain: body.domain,
        slug: body.slug,
        type: 'redirect',
        niche: body.niche,
        themeTokens: body.themeTokens ?? DEFAULT_THEME_TOKENS,
        templateId: template.id,
        status: 'draft',
        language: 'en',
      },
    });

    const homePage = await req.payload.create({
      collection: 'pages',
      data: {
        site: site.id,
        slug: 'home',
        title: body.domain,
        type: 'money',
        primaryKeyword: body.domain,
        metaTitle: body.domain,
        metaDesc: `${body.domain} — powered by the ${template.name} template.`,
        body: [{ blockType: 'hero', heading: body.domain }],
      },
    });

    return Response.json({ site, homePage }, { status: 201 });
  },
};
