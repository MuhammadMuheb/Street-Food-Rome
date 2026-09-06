/**
 * cms/src/seed/seedFoodMatchPage.ts — seeds streetfoodrome.com's
 * "What's Your Rome Street Food Match?" quiz page
 * (apps/web/src/sites/streetfoodrome/layouts/FoodMatchLayout.tsx). Links all
 * four existing tours as this page's featuredTours so the quiz can match a
 * result against real, cloaked tour links via the same `page.tours` prop
 * every other block on this site already uses — no separate data-fetching
 * path for this feature.
 *
 * Run: `pnpm --filter @italy-tours/cms seed:food-match`
 */
import { getPayload } from 'payload';
import config from '../payload.config';
import { SITE_DOMAIN } from './streetFoodRomeContent';

const PAGE_SLUG = 'food-match';
const TOUR_SLUGS = ['trastevere-food-wine-walk', 'testaccio-market-food-tour', 'rome-food-wine-tasting', 'aperitivo-evening-experience'];

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

  const tourIds: number[] = [];
  for (const slug of TOUR_SLUGS) {
    const result = await payload.find({ collection: 'tours', where: { slug: { equals: slug } }, limit: 1 });
    const tour = result.docs[0];
    if (!tour) {
      console.error(`No tour found for slug "${slug}" — run seed:streetfoodrome first.`);
      process.exit(1);
    }
    tourIds.push(tour.id);
  }

  await payload.create({
    collection: 'pages',
    data: {
      site: site.id,
      slug: PAGE_SLUG,
      title: "What's Your Rome Street Food Match?",
      type: 'support',
      primaryKeyword: 'rome street food quiz',
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
                      text: 'Four quick questions, one real recommendation — no generic "top 10" list.',
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
          question: 'Is this quiz just marketing, or does it actually change the recommendation?',
          answer: 'It actually scores your answers — different answers can and do land on a different tour.',
        },
      ],
      featuredTours: tourIds,
      metaTitle: "What's Your Rome Street Food Match?",
      metaDesc: 'Answer four quick questions and get matched with the Rome street food tour that actually fits your evening.',
    },
  });

  console.log(`Created page "${PAGE_SLUG}" for "${SITE_DOMAIN}".`);
  console.log(`\nView at: http://localhost:3000/food-match?__site=${SITE_DOMAIN}`);
  process.exit(0);
}

run().catch((err) => {
  console.error('[seedFoodMatchPage] failed:', err);
  process.exit(1);
});
