/**
 * cms/src/collections/Media.ts — upload collection backing Sites/Pages/Tours
 * image relationships (M8 Media/Photo). Minimal Phase 1 stub: compression,
 * per-tour gallery structuring, and alt-text enforcement land with M8.
 */
import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { setOwnerFromReqUser } from '../hooks/setOwnerFromReqUser';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: true,
  fields: [
    { name: 'alt', type: 'text', required: true },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', description: 'Account this record belongs to.' },
    },
  ],
  hooks: {
    beforeChange: [setOwnerFromReqUser],
  },
};
