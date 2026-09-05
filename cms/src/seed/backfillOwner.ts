/**
 * cms/src/seed/backfillOwner.ts — sets `owner` on every existing record
 * across all owner-scoped collections that predates the `owner` field
 * (everything seeded in earlier sessions was created via the local API with
 * no `req.user`, so `setOwnerFromReqUser` never ran for it).
 *
 * Run: `pnpm --filter @italy-tours/cms backfill:owner <ownerEmail>`
 * Defaults to muheb@admin.com if no email is given.
 */
import { getPayload } from 'payload';
import config from '../payload.config';

const OWNER_SCOPED_COLLECTIONS = [
  'sites',
  'pages',
  'tours',
  'redirects',
  'authors',
  'media',
  'templates',
  'partners',
  'click-events',
] as const;

async function run(): Promise<void> {
  const ownerEmail = process.argv[2] ?? 'muheb@admin.com';
  const payload = await getPayload({ config });

  const ownerResult = await payload.find({ collection: 'users', where: { email: { equals: ownerEmail } }, limit: 1 });
  const owner = ownerResult.docs[0];
  if (!owner) {
    console.error(`No user found for email "${ownerEmail}". Run create:owner first.`);
    process.exit(1);
  }

  for (const collection of OWNER_SCOPED_COLLECTIONS) {
    const unowned = await payload.find({
      collection,
      where: { owner: { equals: null } },
      limit: 1000,
      depth: 0,
      overrideAccess: true,
    });

    for (const doc of unowned.docs) {
      await payload.update({
        collection,
        id: doc.id,
        data: { owner: owner.id },
        overrideAccess: true,
      });
    }

    console.log(`${collection}: backfilled ${unowned.docs.length} record(s).`);
  }

  console.log(`\nDone. All records now owned by "${ownerEmail}" (id: ${owner.id}).`);
  process.exit(0);
}

run().catch((err) => {
  console.error('[backfillOwner] failed:', err);
  process.exit(1);
});
