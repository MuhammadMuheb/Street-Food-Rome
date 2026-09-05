/**
 * cms/src/collections/ClickEvents.ts — M3 Affiliate Engine click log.
 *
 * Written only by packages/affiliate/src/clickTracking.ts (via the local
 * API, `overrideAccess: true`) when a visitor hits `/go/:slug`. Never
 * writable through the public API or the admin panel by non-admins — this
 * is an append-only analytics trail, not editable content.
 */
import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { setOwnerFromReqUser } from '../hooks/setOwnerFromReqUser';

export const ClickEvents: CollectionConfig = {
  slug: 'click-events',
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'partner', 'site', 'tour', 'createdAt'],
    group: 'Analytics',
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    { name: 'site', type: 'relationship', relationTo: 'sites', required: true, index: true },
    { name: 'tour', type: 'relationship', relationTo: 'tours' },
    { name: 'slug', type: 'text', required: true, admin: { description: 'The /go/:slug that was clicked.' } },
    {
      name: 'partner',
      type: 'select',
      options: ['getyourguide', 'viator', 'tiqets', 'civitatis'],
    },
    { name: 'referrer', type: 'text' },
    { name: 'userAgent', type: 'text' },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description:
          'Account this record belongs to. Left blank on clicks logged by clickTracking.ts (an anonymous visitor action, no admin session) — backfilled for historical rows instead.',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [setOwnerFromReqUser],
  },
};
