/**
 * cms/src/seed/seedInstagramOfferPage.ts — seeds streetfoodrome.com's
 * Instagram bio-link offer page (apps/web/src/sites/streetfoodrome/layouts/
 * InstagramOfferLayout.tsx), reusing the author + tour already created by
 * seedStreetFoodRome.ts. Kept as its own script rather than folded into that
 * one, since this page isn't part of the blueprint's fixed 12-page tree —
 * it's an addition for Instagram-specific traffic.
 *
 * Run: `pnpm --filter @italy-tours/cms seed:instagram-offer`
 */
import { getPayload } from 'payload';
import config from '../payload.config';
import { SITE_DOMAIN } from './streetFoodRomeContent';

const PAGE_SLUG = 'instagram';
const FLAGSHIP_TOUR_SLUG = 'trastevere-food-wine-walk';

async function run(): Promise<void> {
  const payload = await getPayload({ config });

  const siteResult = await payload.find({ collection: 'sites', where: { domain: { equals: SITE_DOMAIN } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) {
    console.error(`No site found for domain "${SITE_DOMAIN}" — run seed:streetfoodrome first.`);
    process.exit(1);
  }

  const existingPage = await payload.find({
    collection: 'pages',
    where: { and: [{ site: { equals: site.id } }, { slug: { equals: PAGE_SLUG } }] },
    limit: 1,
  });
  if (existingPage.docs[0]) {
    console.log(`Page "${PAGE_SLUG}" already exists for "${SITE_DOMAIN}".`);
    process.exit(0);
  }

  const authorResult = await payload.find({ collection: 'authors', where: { name: { equals: 'Marco Ferretti' } }, limit: 1 });
  const author = authorResult.docs[0];

  const tourResult = await payload.find({ collection: 'tours', where: { slug: { equals: FLAGSHIP_TOUR_SLUG } }, limit: 1 });
  const tour = tourResult.docs[0];
  if (!tour) {
    console.error(`No tour found for slug "${FLAGSHIP_TOUR_SLUG}" — run seed:streetfoodrome first.`);
    process.exit(1);
  }

  await payload.create({
    collection: 'pages',
    data: {
      site: site.id,
      slug: PAGE_SLUG,
      title: 'The Trastevere Food Tour From Our Reels',
      type: 'money',
      primaryKeyword: 'rome street food instagram offer',
      author: author?.id,
      body: [
        {
          blockType: 'richText',
          content: {
            root: {
              type: 'root',
              version: 1,
              direction: 'ltr' as const,
              format: '' as const,
              indent: 0,
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      version: 1,
                      text: "You've seen the stops on Instagram — here's the same three-hour Trastevere walk, ready to book straight from your phone.",
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
      faqs: [
        {
          question: 'Is this the exact tour from the Reel?',
          answer: 'Yes — same route, same stops, same guide.',
        },
      ],
      featuredTours: [tour.id],
      metaTitle: 'Rome Street Food Tour — Instagram Offer',
      metaDesc: "The Trastevere food tour from our Instagram Reels, ready to book.",
    },
  });

  console.log(`Created page "${PAGE_SLUG}" for "${SITE_DOMAIN}".`);
  console.log(`\nView at: http://localhost:3000/instagram?__site=${SITE_DOMAIN}`);
  process.exit(0);
}

run().catch((err) => {
  console.error('[seedInstagramOfferPage] failed:', err);
  process.exit(1);
});
