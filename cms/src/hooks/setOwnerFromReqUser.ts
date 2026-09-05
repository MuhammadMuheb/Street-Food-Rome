/**
 * cms/src/hooks/setOwnerFromReqUser.ts — auto-populates a new doc's `owner`
 * field from the authenticated admin creating it, so every record is
 * attached to a user without requiring manual selection in the admin UI.
 *
 * Only fires on create, and only when `owner` wasn't already supplied (a
 * script using the local API can still set it explicitly — e.g. the
 * backfill script setting historical records' owner after the fact).
 */
import type { CollectionBeforeChangeHook } from 'payload';

export const setOwnerFromReqUser: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create' && !data.owner && req.user) {
    data.owner = req.user.id;
  }
  return data;
};
