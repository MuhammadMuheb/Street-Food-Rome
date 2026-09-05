/**
 * cms/src/collections/Templates.ts — M5 template registry, referenced by
 * Sites.templateId. Each record's `templateKey` maps to an entry in
 * packages/templates/src/registry.ts; the T1–T6 records are created by
 * cms/src/seed/seed-templates.ts. Minimal Phase 1 stub.
 */
import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { setOwnerFromReqUser } from '../hooks/setOwnerFromReqUser';

export const Templates: CollectionConfig = {
  slug: 'templates',
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
      name: 'templateKey',
      type: 'select',
      required: true,
      unique: true,
      options: ['t1-monument', 't2-dayzia', 't3-food', 't4-cooking', 't5-vehicle', 't6-photo'],
      admin: { description: 'Maps to packages/templates/src/registry.ts.' },
    },
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
