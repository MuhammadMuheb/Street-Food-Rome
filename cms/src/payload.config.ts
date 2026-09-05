/**
 * cms/src/payload.config.ts — Payload CMS 3 root config.
 *
 * Imported by apps/web's `/api/internal/resolve-site` route (and by the
 * Payload admin/API route handlers once those are mounted into
 * apps/web/src/app) via `@italy-tours/cms/payload.config`. Self-hosted,
 * in-repo, Postgres-backed per the platform blueprint (§1.2).
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import { Users } from './collections/Users';
import { Sites } from './collections/Sites';
import { Pages } from './collections/Pages';
import { Tours } from './collections/Tours';
import { Redirects } from './collections/Redirects';
import { Authors } from './collections/Authors';
import { Partners } from './collections/Partners';
import { Templates } from './collections/Templates';
import { Media } from './collections/Media';
import { ClickEvents } from './collections/ClickEvents';
import { redirectSiteFactory } from './endpoints/redirectSiteFactory';
import { resolveServerUrl } from './lib/resolveServerUrl';
import { migrations } from './migrations';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const serverURL = resolveServerUrl();

export default buildConfig({
  serverURL,
  // Payload's cookie-auth JWT extraction falls back to checking Sec-Fetch-Site
  // once any CSRF allowlist is configured; leaving this empty was never
  // actually the safe default it looks like — set it explicitly.
  csrf: [serverURL],
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [Users, Sites, Pages, Tours, Redirects, Authors, Partners, Templates, Media, ClickEvents],
  endpoints: [redirectSiteFactory],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    // The postgres adapter only auto-syncs schema changes when
    // NODE_ENV !== 'production' (see its own connect.js) — in production it
    // does nothing at all unless given `prodMigrations` explicitly, in which
    // case it applies whatever's pending here on cold start. Without this, a
    // brand-new production database never gets its tables created — every
    // query fails with "relation does not exist" and nothing points at why.
    // `src/migrations/` is checked in for exactly this reason (see that
    // folder's own migrate:create output) — regenerate it with
    // `pnpm --filter @italy-tours/cms generate:migration <name>` after any
    // collection schema change, the same way `payload-types.ts` gets
    // regenerated after any typed-field change.
    prodMigrations: migrations,
  }),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
