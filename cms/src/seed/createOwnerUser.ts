/**
 * cms/src/seed/createOwnerUser.ts — creates the single admin account every
 * other collection's `owner` field points at (see hooks/setOwnerFromReqUser.ts
 * and seed/backfillOwner.ts). Idempotent — safe to re-run.
 *
 * Password comes from OWNER_PASSWORD (set it in infra/env/.env, which is
 * gitignored) rather than a literal in source — this script's output is
 * committed to git, and a hardcoded password would sit in history forever.
 * With no env var set, generates a random one and prints it once so local
 * setup still works out of the box.
 *
 * Run: `pnpm --filter @italy-tours/cms create:owner`
 */
import { randomBytes } from 'node:crypto';
import { getPayload } from 'payload';
import config from '../payload.config';

const OWNER_EMAIL = 'muheb@admin.com';

async function run(): Promise<void> {
  const payload = await getPayload({ config });

  const existing = await payload.find({ collection: 'users', where: { email: { equals: OWNER_EMAIL } }, limit: 1 });
  if (existing.docs[0]) {
    console.log(`Owner user "${OWNER_EMAIL}" already exists (id: ${existing.docs[0].id}).`);
    process.exit(0);
  }

  const generated = !process.env.OWNER_PASSWORD;
  const password = process.env.OWNER_PASSWORD ?? randomBytes(9).toString('base64url');

  const created = await payload.create({
    collection: 'users',
    data: { email: OWNER_EMAIL, password },
  });

  console.log(`Created owner user "${OWNER_EMAIL}" (id: ${created.id}).`);
  if (generated) {
    console.log(`No OWNER_PASSWORD env var was set — generated one for this run: ${password}`);
  }
  process.exit(0);
}

run().catch((err) => {
  console.error('[createOwnerUser] failed:', err);
  process.exit(1);
});
