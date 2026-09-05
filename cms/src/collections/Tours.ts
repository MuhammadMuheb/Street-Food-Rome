/**
 * cms/src/collections/Tours.ts — bookable tours (M3 Affiliate Engine content).
 *
 * One Tour maps to exactly one affiliate partner product. `affiliateUrl` is
 * the raw partner deep link; the public-facing link is always the cloaked
 * `/go/:slug` route (packages/affiliate/src/cloak.ts) which resolves back to
 * this record's `affiliateUrl` and logs the click, never this URL directly.
 */
import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { setOwnerFromReqUser } from '../hooks/setOwnerFromReqUser';

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'partner', 'city', 'priceBand'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'The :slug in /go/:slug — must be globally unique across all Tours.' },
    },
    {
      name: 'partner',
      type: 'select',
      required: true,
      options: [
        { label: 'GetYourGuide', value: 'getyourguide' },
        { label: 'Viator', value: 'viator' },
        { label: 'Tiqets', value: 'tiqets' },
        { label: 'Civitatis', value: 'civitatis' },
      ],
    },
    { name: 'partnerProductId', type: 'text', required: true, admin: { description: "Partner's own product/SKU id." } },
    {
      name: 'affiliateUrl',
      type: 'text',
      required: true,
      admin: { description: 'Raw partner deep link. Never render this directly — use /go/:slug.' },
    },
    {
      name: 'priceBand',
      type: 'select',
      options: [
        { label: '€0–40', value: '€0-40' },
        { label: '€40–80', value: '€40-80' },
        { label: '€80–150', value: '€80-150' },
        { label: '€150+', value: '€150+' },
      ],
    },
    { name: 'duration', type: 'text', admin: { description: 'e.g. "3 hours".' } },
    { name: 'city', type: 'text', required: true, index: true },
    {
      name: 'niche',
      type: 'text',
      hasMany: true,
      index: true,
      admin: { description: 'Tag array, e.g. "rome-food-tours-str", used to pull tours by niche into templates.' },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'firstHandNotes',
      type: 'textarea',
      admin: { description: 'Own-experience notes — feeds "is it worth it" verdict copy.' },
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
  },
};
