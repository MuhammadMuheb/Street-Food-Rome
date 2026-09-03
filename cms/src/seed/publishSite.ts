/**
 * cms/src/seed/publishSite.ts — flips a Site's status to "live" by domain.
 * Utility for local testing/demoing sites created via the Redirect Site
 * Factory (which always creates them as `draft`).
 *
 * Run: `pnpm --filter @italy-tours/cms publish -- <domain>`
 */
import { getPayload } from 'payload';
import config from '../payload.config';

async function run(): Promise<void> {
  const domain = process.argv[2];
  if (!domain) {
    console.error('Usage: pnpm --filter @italy-tours/cms publish -- <domain>');
    process.exit(1);
  }

  const payload = await getPayload({ config });

  const result = await payload.find({ collection: 'sites', where: { domain: { equals: domain } }, limit: 1 });
  const site = result.docs[0];
  if (!site) {
    console.error(`No site found for domain "${domain}".`);
    process.exit(1);
  }

  await payload.update({ collection: 'sites', id: site.id, data: { status: 'live' } });
  console.log(`Published "${domain}" (id: ${site.id}).`);
  process.exit(0);
}

run().catch((err) => {
  console.error('[publishSite] failed:', err);
  process.exit(1);
});
