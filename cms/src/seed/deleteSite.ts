/**
 * cms/src/seed/deleteSite.ts — deletes a Site by domain, plus its Pages.
 * Utility for removing throwaway test sites (e.g. the early "demo" site
 * created before streetfoodrome.com existed).
 *
 * Run: `pnpm --filter @italy-tours/cms site:delete <domain>`
 */
import { getPayload } from 'payload';
import config from '../payload.config';

async function run(): Promise<void> {
  const domain = process.argv[2];
  if (!domain) {
    console.error('Usage: pnpm --filter @italy-tours/cms site:delete <domain>');
    process.exit(1);
  }

  const payload = await getPayload({ config });

  const result = await payload.find({ collection: 'sites', where: { domain: { equals: domain } }, limit: 1 });
  const site = result.docs[0];
  if (!site) {
    console.error(`No site found for domain "${domain}".`);
    process.exit(1);
  }

  const pages = await payload.find({ collection: 'pages', where: { site: { equals: site.id } }, limit: 200 });
  for (const page of pages.docs) {
    await payload.delete({ collection: 'pages', id: page.id });
    console.log(`Deleted page "${page.slug}".`);
  }

  // ClickEvents.site is NOT NULL — must delete these before the site itself,
  // or Payload's cascade (which tries to null the column) violates that.
  const clickEvents = await payload.find({ collection: 'click-events', where: { site: { equals: site.id } }, limit: 500 });
  for (const clickEvent of clickEvents.docs) {
    await payload.delete({ collection: 'click-events', id: clickEvent.id });
  }
  if (clickEvents.docs.length > 0) {
    console.log(`Deleted ${clickEvents.docs.length} click event(s).`);
  }

  await payload.delete({ collection: 'sites', id: site.id });
  console.log(`Deleted site "${domain}" (id: ${site.id}).`);
  process.exit(0);
}

run().catch((err) => {
  console.error('[deleteSite] failed:', err);
  process.exit(1);
});
