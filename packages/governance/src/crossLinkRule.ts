/**
 * packages/governance/src/crossLinkRule.ts — M10: "no cross-links between
 * owned sites" (doc 00 §8). A relative path (e.g. "/about") is same-site by
 * construction and never a violation; only an absolute URL whose hostname
 * matches another Site's domain counts.
 */
export interface CrossLinkViolation {
  url: string;
  targetDomain: string;
}

function extractHostname(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}

/**
 * @param links Every URL found in a page's body (see extractLexicalContent).
 * @param ownDomain The domain of the Site this page belongs to — a link back
 *   to its own site is fine, not a cross-link.
 * @param ownedDomains Every OTHER Site's domain on the platform.
 */
export function findCrossLinkViolations(links: string[], ownDomain: string, ownedDomains: ReadonlySet<string>): CrossLinkViolation[] {
  const normalizedOwn = ownDomain.replace(/^www\./, '').toLowerCase();
  const violations: CrossLinkViolation[] = [];

  for (const url of links) {
    const hostname = extractHostname(url);
    if (!hostname || hostname === normalizedOwn) continue;
    if (ownedDomains.has(hostname)) {
      violations.push({ url, targetDomain: hostname });
    }
  }

  return violations;
}
