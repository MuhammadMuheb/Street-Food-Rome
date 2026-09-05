/**
 * cms/src/collections/Authors.ts — first-hand-credibility author boxes,
 * referenced by Pages.author. Minimal Phase 1 stub.
 */
import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { setOwnerFromReqUser } from '../hooks/setOwnerFromReqUser';

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: { useAsTitle: 'name', group: 'Content' },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'bio', type: 'textarea' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
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
