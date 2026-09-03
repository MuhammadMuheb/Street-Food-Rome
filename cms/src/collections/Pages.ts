/**
 * cms/src/collections/Pages.ts — per-site page content (M2 Content).
 *
 * A page belongs to exactly one Site and carries its own SEO metadata, a
 * `blocks`-typed body (constrained per-template in the admin UI and by the
 * Redirect Site Factory's page-seeding step to each template's blockLibrary),
 * and a quotable-FAQ array feeding the GEO/AI layer (M9,
 * packages/seo/src/geo/quotableFaq.ts). `beforeValidate` enforces the
 * platform's "no two pages on one site share a primary keyword" governance
 * rule at save time via `keywordMapCollisionCheck`.
 */
import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { keywordMapCollisionCheck } from '../hooks/keywordMapCollisionCheck';
import { afterChangePublishRevalidate } from '../hooks/afterChangePublishRevalidate';
import { HeroBlock } from '../blocks/HeroBlock';
import { RichTextBlock } from '../blocks/RichTextBlock';
import { TourComparisonBlock } from '../blocks/TourComparisonBlock';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'site', 'type', 'primaryKeyword'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'site', type: 'relationship', relationTo: 'sites', required: true, index: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'title', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Money', value: 'money' },
        { label: 'Support', value: 'support' },
        { label: 'About', value: 'about' },
        { label: 'Legal', value: 'legal' },
      ],
    },
    {
      name: 'primaryKeyword',
      type: 'text',
      required: true,
      admin: { description: 'Uniqueness enforced per-site by keywordMapCollisionCheck, not a DB constraint.' },
    },
    {
      name: 'body',
      type: 'blocks',
      blocks: [HeroBlock, RichTextBlock, TourComparisonBlock],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'authors' },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          admin: { description: 'One quotable sentence — GEO/AI layer (M9).' },
        },
      ],
    },
    { name: 'featuredTours', type: 'relationship', relationTo: 'tours', hasMany: true },
    {
      name: 'schemaType',
      type: 'select',
      hasMany: true,
      options: ['TouristAttraction', 'TouristTrip', 'Product', 'FAQPage', 'BreadcrumbList', 'Course', 'Service'],
    },
    { name: 'metaTitle', type: 'text', maxLength: 60, required: true },
    { name: 'metaDesc', type: 'textarea', required: true },
  ],
  indexes: [{ fields: ['site', 'slug'], unique: true }],
  hooks: {
    beforeValidate: [keywordMapCollisionCheck],
    afterChange: [afterChangePublishRevalidate],
  },
};
