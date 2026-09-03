/**
 * cms/src/blocks/RichTextBlock.ts — generic body-copy block for page sections
 * that don't need a bespoke component (support/about content, verdicts, etc.).
 */
import type { Block } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
  fields: [{ name: 'content', type: 'richText', editor: lexicalEditor(), required: true }],
};
