/**
 * packages/governance/src/dupContentRule.ts — M10: "no duplicate content"
 * (doc 00 §8, >80% similarity across sites). Uses 3-word shingles + Jaccard
 * similarity rather than raw bag-of-words: two Rome food pages will always
 * share words like "Rome"/"tour"/"food", but sharing whole 3-word phrases is
 * a much stronger duplicate-content signal.
 */
const SHINGLE_SIZE = 3;

function shingles(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return new Set();
  if (words.length < SHINGLE_SIZE) return new Set([words.join(' ')]);

  const result = new Set<string>();
  for (let i = 0; i <= words.length - SHINGLE_SIZE; i++) {
    result.add(words.slice(i, i + SHINGLE_SIZE).join(' '));
  }
  return result;
}

export function jaccardSimilarity(textA: string, textB: string): number {
  const a = shingles(textA);
  const b = shingles(textB);
  if (a.size === 0 || b.size === 0) return 0;

  let intersection = 0;
  for (const shingle of a) {
    if (b.has(shingle)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export interface DuplicateContentViolation<TId> {
  pageId: TId;
  otherPageId: TId;
  similarity: number;
}

export const DUPLICATE_CONTENT_THRESHOLD = 0.8;

/** Pairwise-compares every page against every other — fine at dozens of
 * pages; would need a smarter index (e.g. MinHash/LSH) at real scale. */
export function findDuplicateContentViolations<TId>(
  pages: ReadonlyArray<{ id: TId; text: string }>,
  threshold: number = DUPLICATE_CONTENT_THRESHOLD,
): DuplicateContentViolation<TId>[] {
  const violations: DuplicateContentViolation<TId>[] = [];

  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const pageA = pages[i];
      const pageB = pages[j];
      if (!pageA || !pageB || !pageA.text.trim() || !pageB.text.trim()) continue;

      const similarity = jaccardSimilarity(pageA.text, pageB.text);
      if (similarity >= threshold) {
        violations.push({ pageId: pageA.id, otherPageId: pageB.id, similarity });
      }
    }
  }

  return violations;
}
