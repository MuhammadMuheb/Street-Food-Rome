/**
 * packages/seo/src/geo/entityBlock.ts — M9 GEO/AI layer: a compact
 * entity-summary an AI answer engine can cite (who wrote this, what it's
 * about, based on what first-hand experience) — the machine-readable
 * counterpart to the visible AuthorBox block in packages/ui.
 */
export interface EntityBlockInput {
  pageTitle: string;
  authorName: string;
  authorBio?: string;
  primaryKeyword: string;
}

export interface EntityBlock {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  about: string;
  author: { '@type': 'Person'; name: string; description?: string };
}

export function buildEntityBlock(input: EntityBlockInput): EntityBlock {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.pageTitle,
    about: input.primaryKeyword,
    author: {
      '@type': 'Person',
      name: input.authorName,
      ...(input.authorBio ? { description: input.authorBio } : {}),
    },
  };
}
