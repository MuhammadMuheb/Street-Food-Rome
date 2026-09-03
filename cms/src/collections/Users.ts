/**
 * cms/src/collections/Users.ts — auth-enabled collection backing the Payload
 * admin panel login. Every collection's write access (`isAdmin`) checks
 * `req.user`, which is populated from this collection.
 */
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [],
};
