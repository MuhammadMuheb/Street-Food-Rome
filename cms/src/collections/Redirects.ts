/**
 * cms/src/collections/Redirects.ts — path-to-URL redirect map, scoped per Site.
 *
 * Consumed by apps/web/src/app/[slug]/page.tsx (or a dedicated route) when a
 * requested path has no matching Page but a Redirect exists — e.g. a retired
 * money page pointing at its replacement. The compound unique index on
 * (site, fromPath) prevents two conflicting redirect rules for the same path.
 */
import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'fromPath',
    defaultColumns: ['site', 'fromPath', 'toUrl', 'code'],
    group: 'Site Registry',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'site', type: 'relationship', relationTo: 'sites', required: true, index: true },
    { name: 'fromPath', type: 'text', required: true, admin: { description: 'Leading-slash path on this site, e.g. "/old-tour-page".' } },
    { name: 'toUrl', type: 'text', required: true },
    {
      name: 'code',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        { label: '301 (Permanent)', value: '301' },
        { label: '302 (Temporary)', value: '302' },
      ],
    },
  ],
  indexes: [{ fields: ['site', 'fromPath'], unique: true }],
};
