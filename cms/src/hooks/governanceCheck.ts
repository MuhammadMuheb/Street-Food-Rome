/**
 * cms/src/hooks/governanceCheck.ts — M10 Governance (doc 00 §8), enforced at
 * save time alongside keywordMapCollisionCheck: a page may not link to
 * another owned Site's domain, and may not be a near-duplicate (>80%
 * content similarity, doc 00 §8's own threshold) of any other page on the
 * platform — not just this site, since the rule is platform-wide.
 *
 * Runs `beforeValidate` so a violation blocks the save itself, the same
 * "catch it at authoring time" reasoning as the keyword-collision check.
 * The CI workflow (.github/workflows/governance.yml) re-runs the same
 * @italy-tours/governance rules as a final gate — this hook is the fast
 * feedback loop, CI is the backstop for anything written via a script that
 * bypasses the admin UI (e.g. a seed script using `overrideAccess`).
 */
import type { CollectionBeforeValidateHook } from 'payload';
import { ValidationError } from 'payload';
import { extractBodyContent, findCrossLinkViolations, jaccardSimilarity, DUPLICATE_CONTENT_THRESHOLD } from '@italy-tours/governance';

export const governanceCheck: CollectionBeforeValidateHook = async ({ data, req, originalDoc }) => {
  const body = data?.body ?? originalDoc?.body;
  const siteRef = data?.site ?? originalDoc?.site;
  if (!body || !siteRef) return data;

  const siteId = typeof siteRef === 'object' && siteRef !== null ? siteRef.id : siteRef;
  const currentSite = await req.payload.findByID({ collection: 'sites', id: siteId, depth: 0 });

  const otherSites = await req.payload.find({ collection: 'sites', limit: 500, depth: 0 });
  const ownDomain = currentSite.domain.replace(/^www\./, '').toLowerCase();
  const ownedDomains = new Set(
    otherSites.docs.map((site) => site.domain.replace(/^www\./, '').toLowerCase()).filter((domain) => domain !== ownDomain),
  );

  const { text, links } = extractBodyContent(body);

  const crossLinkViolations = findCrossLinkViolations(links, currentSite.domain, ownedDomains);
  if (crossLinkViolations.length > 0) {
    throw new ValidationError({
      errors: [
        {
          path: 'body',
          message: `Links to owned domain(s) ${crossLinkViolations.map((v) => v.targetDomain).join(', ')} — no cross-links between owned sites (doc 00 §8).`,
        },
      ],
    });
  }

  if (text.trim().length > 0) {
    const currentPageId = originalDoc?.id;
    const otherPages = await req.payload.find({
      collection: 'pages',
      limit: 500,
      depth: 0,
      where: currentPageId ? { id: { not_equals: currentPageId } } : {},
    });

    for (const other of otherPages.docs) {
      const otherContent = extractBodyContent(other.body);
      if (!otherContent.text.trim()) continue;

      const similarity = jaccardSimilarity(text, otherContent.text);
      if (similarity >= DUPLICATE_CONTENT_THRESHOLD) {
        throw new ValidationError({
          errors: [
            {
              path: 'body',
              message: `${(similarity * 100).toFixed(0)}% similar to page "${other.title}" (id ${other.id}) — no duplicate content across sites (doc 00 §8, >${DUPLICATE_CONTENT_THRESHOLD * 100}% threshold).`,
            },
          ],
        });
      }
    }
  }

  return data;
};
