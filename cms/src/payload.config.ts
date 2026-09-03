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

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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
  }),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
