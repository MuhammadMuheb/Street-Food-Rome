/**
 * cms/src/collections/Sites.ts — M1 Site Registry (Payload CMS 3 collection).
 *
 * The single record every request resolves against: `apps/web/middleware.ts`
 * calls GET /api/internal/resolve-site?domain=<host>, which queries this
 * collection by `domain` and maps the doc into `ResolvedSite`
 * (see packages/config/src/types.ts). Reads are public because the edge
 * middleware hits this on every request for a live domain; writes are
 * restricted to authenticated admins/editors.
 */
import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { afterChangePublishRevalidate } from '../hooks/afterChangePublishRevalidate';
import { setOwnerFromReqUser } from '../hooks/setOwnerFromReqUser';

export const Sites: CollectionConfig = {
  slug: 'sites',
  admin: {
    useAsTitle: 'domain',
    defaultColumns: ['domain', 'type', 'niche', 'status'],
    group: 'Site Registry',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Normalized apex domain, no protocol or "www.", e.g. "streetfoodrome.com".' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Hero sites: matches the folder under apps/web/src/sites/<slug>. Redirect sites: a stable internal identifier.',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero', value: 'hero' },
        { label: 'Redirect', value: 'redirect' },
      ],
    },
    {
      name: 'niche',
      type: 'select',
      required: true,
      options: [
        { label: 'Monument', value: 'monument' },
        { label: 'Day Trip', value: 'dayzia' },
        { label: 'Food', value: 'food' },
        { label: 'Cooking', value: 'cooking' },
        { label: 'Vehicle', value: 'vehicle' },
        { label: 'Photo', value: 'photo' },
      ],
    },
    {
      name: 'themeTokens',
      type: 'json',
      required: true,
      admin: {
        description: 'colorPrimary, colorAccent, colorBackground, colorForeground, fontHeading, fontBody, radius, heroStyle.',
      },
    },
    {
      name: 'templateId',
      type: 'relationship',
      relationTo: 'templates',
      admin: { condition: (data) => data?.type === 'redirect' },
    },
    {
      name: 'heroTargetSite',
      type: 'relationship',
      relationTo: 'sites',
      admin: {
        condition: (data) => data?.type === 'redirect',
        description: 'If set and no template is chosen, this domain 301s to the hero instead of building a micro-site.',
      },
    },
    { name: 'affiliateDefaults', type: 'relationship', relationTo: 'partners', hasMany: true },
    { name: 'gaId', type: 'text', admin: { description: 'GA4 measurement ID for this domain.' } },
    { name: 'gscToken', type: 'text', admin: { description: 'Search Console verification token for this domain.' } },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Live', value: 'live' },
        { label: 'Parked', value: 'parked' },
      ],
    },
    {
      name: 'language',
      type: 'select',
      required: true,
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Italian', value: 'it' },
      ],
    },
    {
      name: 'hreflangGroup',
      type: 'text',
      admin: { description: 'Shared key linking an EN hero to its IT sibling for hreflang pairing.' },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', description: 'Account this record belongs to.' },
    },
  ],
  hooks: {
    beforeChange: [setOwnerFromReqUser],
    afterChange: [afterChangePublishRevalidate],
  },
};
