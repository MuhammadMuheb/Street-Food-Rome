/**
 * cms/src/seed/governanceScan.ts — M10 governance CI gate (doc 00 §8,
 * doc 01 §7 "governance checks wired into publish"). Re-runs the same
 * @italy-tours/governance rules cms/src/hooks/governanceCheck.ts enforces
 * per-save, but platform-wide and all-at-once — a backstop for anything
 * written via a script with `overrideAccess` (which bypasses hooks) rather
 * than through the admin UI.
 *
 * Exits 1 (failing the CI job) if any violation is found, 0 otherwise.
 *
 * Run: `pnpm --filter @italy-tours/cms governance:scan`
 */
import { getPayload } from 'payload';
import config from '../payload.config';
import { extractBodyContent, findCrossLinkViolations, findDuplicateContentViolations } from '@italy-tours/governance';

async function run(): Promise<void> {
  const payload = await getPayload({ config });

  const [sitesResult, pagesResult] = await Promise.all([
    payload.find({ collection: 'sites', limit: 500, depth: 0 }),
    payload.find({ collection: 'pages', limit: 1000, depth: 0 }),
  ]);

  const sitesById = new Map(sitesResult.docs.map((site) => [String(site.id), site]));
  let violationCount = 0;

  console.log(`Scanning ${pagesResult.docs.length} pages across ${sitesResult.docs.length} sites...\n`);

  // Rule 1: no cross-links between owned sites.
  for (const page of pagesResult.docs) {
    const siteId = typeof page.site === 'object' && page.site !== null ? String(page.site.id) : String(page.site);
    const site = sitesById.get(siteId);
    if (!site) continue;

    const ownDomain = site.domain.replace(/^www\./, '').toLowerCase();
    const ownedDomains = new Set(
      sitesResult.docs.map((s) => s.domain.replace(/^www\./, '').toLowerCase()).filter((domain) => domain !== ownDomain),
    );

    const { links } = extractBodyContent(page.body);
    const violations = findCrossLinkViolations(links, site.domain, ownedDomains);
    for (const violation of violations) {
      violationCount++;
      console.error(
        `[cross-link] Page "${page.title}" (id ${page.id}, site ${site.domain}) links to owned domain "${violation.targetDomain}" (${violation.url}).`,
      );
    }
  }

  // Rule 2: no duplicate content across sites (platform-wide, not per-site).
  const pageTexts = pagesResult.docs.map((page) => ({ id: page.id, title: page.title, text: extractBodyContent(page.body).text }));
  const dupViolations = findDuplicateContentViolations(pageTexts);
  for (const violation of dupViolations) {
    violationCount++;
    const pageA = pageTexts.find((p) => p.id === violation.pageId);
    const pageB = pageTexts.find((p) => p.id === violation.otherPageId);
    console.error(
      `[duplicate-content] "${pageA?.title}" (id ${violation.pageId}) is ${(violation.similarity * 100).toFixed(0)}% similar to "${pageB?.title}" (id ${violation.otherPageId}).`,
    );
  }

  if (violationCount === 0) {
    console.log('Governance checks passed — no violations found.');
    process.exit(0);
  } else {
    console.error(`\n${violationCount} governance violation(s) found.`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('[governanceScan] failed:', err);
  process.exit(1);
});
