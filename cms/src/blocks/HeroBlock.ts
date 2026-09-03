/**
 * cms/src/blocks/HeroBlock.ts — generic hero/intro block available to every
 * Page. Category-specific hero variants (e.g. T3 Food's `HeroAppetite`) are
 * added here as their template packs land in packages/templates.
 */
import type { Block } from 'payload';

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero Blocks' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
};
