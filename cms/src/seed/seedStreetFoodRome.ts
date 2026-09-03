/**
 * cms/src/seed/seedStreetFoodRome.ts — seeds the streetfoodrome.com
 * bespoke hero (blueprint §5.2): the Site record, an Author, a
 * GetYourGuide Partner + a handful of Tours, and all 12 Pages from the
 * blueprint's exact page tree/slugs/primary-keywords.
 *
 * Body copy is honest placeholder text (structurally complete — H1, one
 * quotable FAQ, author credit — but not researched marketing copy); tour
 * data (affiliate URLs, partner id) is fabricated for local demo purposes,
 * not a real GetYourGuide account.
 *
 * Reachable locally via the middleware's dev-only `?__site=` override:
 * http://localhost:3000/?__site=streetfoodrome.localhost
 *
 * Run: `pnpm --filter @italy-tours/cms seed:streetfoodrome`
 */
import { getPayload } from 'payload';
import config from '../payload.config';

const SITE_DOMAIN = 'streetfoodrome.localhost';

const THEME_TOKENS = {
  colorPrimary: '#1c1917',
  colorAccent: '#dc2626',
  colorBackground: '#fffaf0',
  colorForeground: '#1c1917',
  fontHeading: 'Georgia, serif',
  fontBody: 'system-ui, sans-serif',
  radius: '0.25rem',
  heroStyle: 'editorial',
};

interface PageSeed {
  slug: string;
  title: string;
  type: 'money' | 'support' | 'about' | 'legal';
  primaryKeyword: string;
  bodyParagraphs: string[];
  faq: { question: string; answer: string };
  tourSlugs?: string[];
}

const PAGES: PageSeed[] = [
  {
    slug: 'home',
    title: "Rome's Street Food, Mapped by Someone Who Actually Eats It",
    type: 'support',
    primaryKeyword: 'rome street food guide',
    bodyParagraphs: [
      'Street Food Rome is a first-hand guide to eating well in Rome — the markets, the neighbourhoods, and the tours actually worth booking.',
    ],
    faq: {
      question: 'Is Rome street food actually good?',
      answer: 'Yes — the trick is knowing which neighbourhoods and stalls locals actually eat at.',
    },
    tourSlugs: ['trastevere-food-wine-walk'],
  },
  {
    slug: 'rome-street-food-tour',
    title: 'The Rome Street Food Tour Worth Your Evening',
    type: 'money',
    primaryKeyword: 'rome street food tour',
    bodyParagraphs: [
      'A good Rome street food tour hits at least three neighbourhoods and skips anywhere with a laminated English menu out front.',
    ],
    faq: {
      question: 'How long does a Rome street food tour take?',
      answer: 'Most run three to four hours, covering multiple stops on foot.',
    },
    tourSlugs: ['trastevere-food-wine-walk', 'testaccio-market-food-tour'],
  },
  {
    slug: 'trastevere-food-tour',
    title: 'Eating Your Way Through Trastevere',
    type: 'money',
    primaryKeyword: 'trastevere food tour',
    bodyParagraphs: [
      "Trastevere's cobbled streets hide some of Rome's best small trattorie — the ones without a tourist menu translated into five languages.",
    ],
    faq: {
      question: 'Is Trastevere touristy?',
      answer: 'The main piazza is, but two streets over it is still a real Roman neighbourhood.',
    },
    tourSlugs: ['trastevere-food-wine-walk'],
  },
  {
    slug: 'testaccio-market-tour',
    title: 'Testaccio Market: Rome Eating Like a Local',
    type: 'money',
    primaryKeyword: 'testaccio market tour',
    bodyParagraphs: [
      "Testaccio Market is where Roman home cooks actually shop — it's also where the city's best trapizzino was invented.",
    ],
    faq: {
      question: 'What is a trapizzino?',
      answer: 'A pocket of pizza dough stuffed with slow-cooked Roman classics like oxtail or chicken cacciatore.',
    },
    tourSlugs: ['testaccio-market-food-tour'],
  },
  {
    slug: 'rome-food-wine-tour',
    title: 'Rome Food and Wine, Properly Paired',
    type: 'money',
    primaryKeyword: 'rome food and wine tour',
    bodyParagraphs: [
      'The best Rome food and wine tours pair each course with a wine from Lazio, not just whatever bottle is open.',
    ],
    faq: {
      question: 'Do Rome food and wine tours include enough food to skip dinner?',
      answer: 'A well-run one leaves you full, not just tipsy.',
    },
    tourSlugs: ['rome-food-wine-tasting'],
  },
  {
    slug: 'aperitivo-evening-tour',
    title: 'The Rome Aperitivo Tour: Golden Hour Done Right',
    type: 'money',
    primaryKeyword: 'rome aperitivo tour',
    bodyParagraphs: [
      'Aperitivo is a ritual, not just a happy hour — the right tour treats it that way, spread across two or three bars.',
    ],
    faq: {
      question: 'What time does aperitivo start in Rome?',
      answer: 'Usually between 6:30 and 7:30pm, right as the light turns gold.',
    },
    tourSlugs: ['aperitivo-evening-experience'],
  },
  {
    slug: 'what-you-actually-eat',
    title: 'Rome Food Tour: What to Actually Expect',
    type: 'support',
    primaryKeyword: 'rome food tour what to expect',
    bodyParagraphs: [
      'Expect walking, small portions across many stops, and a guide who eats there themselves — not a scripted sales pitch for a restaurant partner.',
    ],
    faq: {
      question: 'Should I eat before a food tour?',
      answer: "No — come hungry, tours are paced to fill you up gradually.",
    },
  },
  {
    slug: 'best-neighbourhoods-for-food',
    title: 'The Best Neighbourhoods for Food in Rome',
    type: 'support',
    primaryKeyword: 'best food areas rome',
    bodyParagraphs: [
      'Testaccio, Trastevere, and the Jewish Ghetto each have a genuinely distinct food identity worth planning a whole afternoon around.',
    ],
    faq: {
      question: "What's the single best food neighbourhood in Rome?",
      answer: 'Testaccio, for the market alone.',
    },
  },
  {
    slug: 'rome-market-guide',
    title: "Rome's Food Markets, Ranked",
    type: 'support',
    primaryKeyword: 'rome food markets',
    bodyParagraphs: [
      "Testaccio Market and Campo de' Fiori serve very different purposes — one feeds locals, the other feeds photo albums.",
    ],
    faq: {
      question: 'Which Rome market is best for lunch?',
      answer: 'Testaccio Market, hands down — it has actual food stalls, not just produce.',
    },
  },
  {
    slug: 'gelato-done-right',
    title: 'The Best Gelato in Rome (Not the Neon Kind)',
    type: 'support',
    primaryKeyword: 'best gelato rome',
    bodyParagraphs: [
      "If the pistachio gelato is bright green, walk away — real pistachio gelato is a dull, brownish green."],
    faq: {
      question: 'How do I spot bad gelato in Rome?',
      answer: 'Neon colors and mountain-shaped scoops are the two biggest red flags.',
    },
  },
  {
    slug: 'rome-coffee-culture',
    title: "A Visitor's Guide to Rome Coffee Culture",
    type: 'support',
    primaryKeyword: 'rome coffee guide',
    bodyParagraphs: [
      "Romans drink espresso standing at the bar in under two minutes — cappuccino after 11am marks you as a tourist, and that's fine."],
    faq: {
      question: 'Can I order a cappuccino after breakfast in Rome?',
      answer: "You can, but locals generally don't — espresso or macchiato is the after-meal norm.",
    },
  },
  {
    slug: 'about',
    title: 'About Street Food Rome',
    type: 'about',
    primaryKeyword: 'street food rome about',
    bodyParagraphs: [
      'Street Food Rome is written and maintained by someone who has spent years actually eating through the city, not just visiting once for a listicle.',
    ],
    faq: {
      question: 'Who writes Street Food Rome?',
      answer: 'A long-time Rome resident who eats at every place recommended here.',
    },
  },
  {
    slug: 'contact',
    title: 'Contact Street Food Rome',
    type: 'legal',
    primaryKeyword: 'street food rome contact',
    bodyParagraphs: [
      'Questions, corrections, or a tip about a place we missed? Reach out — this site runs on affiliate commissions from the tours it links to, at no extra cost to you.',
    ],
    faq: {
      question: 'Does Street Food Rome earn money from tour links?',
      answer: 'Yes, via affiliate commission — it never affects which tours we recommend.',
    },
  },
];

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

  const existingAuthor = await payload.find({ collection: 'authors', where: { name: { equals: 'Marco Ferretti' } }, limit: 1 });
  let author = existingAuthor.docs[0];
  if (!author) {
    author = await payload.create({
      collection: 'authors',
      data: { name: 'Marco Ferretti', bio: 'Rome resident of 12 years, eats at every place before recommending it.' },
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

  const TOURS: Array<{ slug: string; title: string; city: string; priceBand: string; duration: string }> = [
    { slug: 'trastevere-food-wine-walk', title: 'Trastevere Food & Wine Walk', city: 'Rome', priceBand: '€40-80', duration: '3 hours' },
    { slug: 'testaccio-market-food-tour', title: 'Testaccio Market Food Tour', city: 'Rome', priceBand: '€40-80', duration: '3.5 hours' },
    { slug: 'rome-food-wine-tasting', title: 'Rome Food & Wine Tasting', city: 'Rome', priceBand: '€80-150', duration: '4 hours' },
    { slug: 'aperitivo-evening-experience', title: 'Aperitivo Evening Experience', city: 'Rome', priceBand: '€40-80', duration: '2.5 hours' },
  ];

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
        firstHandNotes: `Booked and taken this one myself — worth the price for ${tour.title.toLowerCase()}.`,
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
        faqs: [pageSeed.faq],
        featuredTours,
        metaTitle: pageSeed.title.slice(0, 60),
        metaDesc: pageSeed.bodyParagraphs[0]?.slice(0, 155) ?? pageSeed.title,
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
