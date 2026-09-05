/**
 * cms/src/seed/seedStreetFoodRome.ts — seeds the streetfoodrome.com bespoke
 * hero (blueprint §5.2): the Site record, an Author, a GetYourGuide Partner
 * + a handful of Tours, and all 12 Pages from the blueprint's exact page
 * tree/slugs/primary-keywords. Content itself lives in
 * streetFoodRomeContent.ts (shared with updatePageContent.ts).
 *
 * Reachable locally via the middleware's dev-only `?__site=` override:
 * http://localhost:3000/?__site=streetfoodrome.localhost
 *
 * Run: `pnpm --filter @italy-tours/cms seed:streetfoodrome`
 */
import { getPayload } from 'payload';
import config from '../payload.config';
import { SITE_DOMAIN, THEME_TOKENS, AUTHOR, PAGES, TOURS } from './streetFoodRomeContent';

async function run(): Promise<void> {
  const payload = await getPayload({ config });

  const existingSite = await payload.find({ collection: 'sites', where: { domain: { equals: SITE_DOMAIN } }, limit: 1 });
  let site = existingSite.docs[0];
  if (!site) {
    site = await payload.create({
      collection: 'sites',
      data: {
        domain: SITE_DOMAIN,
        slug: 'streetfoodrome',
        type: 'hero',
        niche: 'food',
        themeTokens: THEME_TOKENS,
        status: 'live',
        language: 'en',
      },
    });
    console.log(`Created site "${SITE_DOMAIN}" (id: ${site.id}).`);
  } else {
    console.log(`Site "${SITE_DOMAIN}" already exists (id: ${site.id}).`);
  }

  const existingAuthor = await payload.find({ collection: 'authors', where: { name: { equals: AUTHOR.name } }, limit: 1 });
  let author = existingAuthor.docs[0];
  if (!author) {
    author = await payload.create({
      collection: 'authors',
      data: { name: AUTHOR.name, bio: AUTHOR.bio },
    });
    console.log(`Created author (id: ${author.id}).`);
  }

  const existingPartner = await payload.find({ collection: 'partners', where: { key: { equals: 'getyourguide' } }, limit: 1 });
  if (!existingPartner.docs[0]) {
    await payload.create({
      collection: 'partners',
      data: { name: 'GetYourGuide', key: 'getyourguide', affiliateId: 'demo-affiliate-id' },
    });
    console.log('Created GetYourGuide partner.');
  }

  const tourIdBySlug = new Map<string, number>();
  for (const tour of TOURS) {
    const existing = await payload.find({ collection: 'tours', where: { slug: { equals: tour.slug } }, limit: 1 });
    if (existing.docs[0]) {
      tourIdBySlug.set(tour.slug, existing.docs[0].id);
      continue;
    }
    const created = await payload.create({
      collection: 'tours',
      data: {
        title: tour.title,
        slug: tour.slug,
        partner: 'getyourguide',
        partnerProductId: `gyg-${tour.slug}`,
        affiliateUrl: `https://www.getyourguide.com/rome-l33/${tour.slug}-t000000/`,
        priceBand: tour.priceBand as never,
        duration: tour.duration,
        city: tour.city,
        niche: ['rome-food-tours-str'],
        firstHandNotes: tour.firstHandNotes,
      },
    });
    tourIdBySlug.set(tour.slug, created.id);
    console.log(`Created tour "${tour.slug}" (id: ${created.id}).`);
  }

  for (const pageSeed of PAGES) {
    const existingPage = await payload.find({
      collection: 'pages',
      where: { and: [{ site: { equals: site.id } }, { slug: { equals: pageSeed.slug } }] },
      limit: 1,
    });
    if (existingPage.docs[0]) {
      console.log(`Skipping existing page "${pageSeed.slug}".`);
      continue;
    }

    const featuredTours = (pageSeed.tourSlugs ?? [])
      .map((slug) => tourIdBySlug.get(slug))
      .filter((id): id is number => Boolean(id));

    await payload.create({
      collection: 'pages',
      data: {
        site: site.id,
        slug: pageSeed.slug,
        title: pageSeed.title,
        type: pageSeed.type,
        primaryKeyword: pageSeed.primaryKeyword,
        author: author.id,
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
                children: pageSeed.bodyParagraphs.map((text) => ({
                  type: 'paragraph',
                  version: 1,
                  children: [{ type: 'text', version: 1, text }],
                })),
              },
            },
          },
        ],
        faqs: pageSeed.faqs,
        featuredTours,
        metaTitle: pageSeed.title.slice(0, 60),
        metaDesc: pageSeed.metaDesc,
      },
    });
    console.log(`Created page "${pageSeed.slug}".`);
  }

  console.log(`\nDone. View at: http://localhost:3000/?__site=${SITE_DOMAIN}`);
  process.exit(0);
}

run().catch((err) => {
  console.error('[seedStreetFoodRome] failed:', err);
  process.exit(1);
});

