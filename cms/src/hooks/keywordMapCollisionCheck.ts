/**
 * cms/src/hooks/keywordMapCollisionCheck.ts — code-enforced version of the
 * "no two pages on the same site share a primary keyword" governance rule
 * (see Pages.ts, primaryKeyword field). Runs `beforeValidate` so a collision
 * blocks the save rather than being caught later by CI's keyword-map check.
 */
import type { CollectionBeforeValidateHook } from 'payload';
import { ValidationError } from 'payload';

export const keywordMapCollisionCheck: CollectionBeforeValidateHook = async ({ data, req, originalDoc }) => {
  const primaryKeyword = data?.primaryKeyword;
  const site = data?.site ?? originalDoc?.site;

  if (!primaryKeyword || !site) return data;

  const siteId = typeof site === 'object' && site !== null ? site.id : site;
  const currentPageId = originalDoc?.id;

  const collision = await req.payload.find({
    collection: 'pages',
    where: {
      and: [
        { site: { equals: siteId } },
        { primaryKeyword: { equals: primaryKeyword } },
        ...(currentPageId ? [{ id: { not_equals: currentPageId } }] : []),
      ],
    },
    limit: 1,
    depth: 0,
  });

  if (collision.docs.length > 0) {
    throw new ValidationError({
      errors: [
        {
          path: 'primaryKeyword',
          message: `Primary keyword "${primaryKeyword}" is already used by another page on this site (id: ${collision.docs[0]?.id}).`,
        },
      ],
    });
  }

  return data;
};
