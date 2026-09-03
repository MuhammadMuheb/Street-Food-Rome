/**
 * cms/src/access/isAdmin.ts — write access gate shared by every collection
 * whose reads are public (Sites, Pages, Tours, Redirects) but whose writes
 * must stay behind the admin panel / an authenticated editor.
 */
import type { Access } from 'payload';

export const isAdmin: Access = ({ req }) => {
  return Boolean(req.user);
};
