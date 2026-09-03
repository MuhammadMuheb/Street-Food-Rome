/**
 * cms/src/seed/seedDemoSite.ts — one-off local seed for `pnpm --filter @italy-tours/cms seed:demo`.
 *
 * Creates (or updates) a single `hero` Site record for `localhost` so the
 * middleware pipeline has something real to resolve during local dev,
 * instead of every request falling through to /unresolved-domain. Not part
 * of the M6 Redirect Site Factory — that seeds real production domains.
 */
import { getPayload } from 'payload';
import config from '../payload.config';
import { DEFAULT_THEME_TOKENS } from '@italy-tours/config';

async function run(): Promise<void> {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: 'sites',
    where: { domain: { equals: 'localhost' } },
    limit: 1,
  });

  const data = {
    domain: 'localhost',
    slug: 'demo',
    type: 'hero' as const,
    niche: 'food' as const,
    themeTokens: DEFAULT_THEME_TOKENS,
    status: 'live' as const,
    language: 'en' as const,
  };

  if (existing.docs[0]) {
    await payload.update({ collection: 'sites', id: existing.docs[0].id, data });
    console.log(`Updated demo site (id: ${existing.docs[0].id}).`);
  } else {
    const created = await payload.create({ collection: 'sites', data });
    console.log(`Created demo site (id: ${created.id}).`);
  }

  process.exit(0);
}

run().catch((err) => {
  console.error('[seedDemoSite] failed:', err);
  process.exit(1);
});
