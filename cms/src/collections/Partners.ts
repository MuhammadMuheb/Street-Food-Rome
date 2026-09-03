/**
 * cms/src/collections/Partners.ts — affiliate partner accounts, referenced by
 * Sites.affiliateDefaults (M3 Affiliate Engine config). Minimal Phase 1 stub;
 * partner-specific link-building logic lives in packages/affiliate/src/partners/*.
 */
import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: { useAsTitle: 'name', group: 'Site Registry' },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'key',
      type: 'select',
      required: true,
      unique: true,
      options: ['getyourguide', 'viator', 'tiqets', 'civitatis'],
    },
    { name: 'affiliateId', type: 'text', required: true },
  ],
};
