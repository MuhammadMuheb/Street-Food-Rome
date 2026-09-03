/**
 * cms/src/blocks/TourComparisonBlock.ts — side-by-side comparison of tagged
 * Tours, the recurring "which one should I book" block on money pages.
 */
import type { Block } from 'payload';

export const TourComparisonBlock: Block = {
  slug: 'tourComparison',
  labels: { singular: 'Tour Comparison', plural: 'Tour Comparison Blocks' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'tours', type: 'relationship', relationTo: 'tours', hasMany: true, required: true },
  ],
};
