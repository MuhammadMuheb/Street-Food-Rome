/** apps/web/src/lib/blog.ts — the 5-category blog taxonomy shared between
 * /blog and /blog/category/{slug}. */

export interface BlogCategoryDef {
  slug: string;
  name: string;
  intro: string;
}

export const BLOG_CATEGORIES: BlogCategoryDef[] = [
  {
    slug: 'food-guides',
    name: 'Food Guides',
    intro:
      'Deep dives on the dishes themselves — what makes a real supplì, how carbonara differs from cacio e pepe, and what to actually look for on a menu so you can tell a tourist-trap plate from the real thing before you order.',
  },
  {
    slug: 'neighborhood-guides',
    name: 'Neighbourhood Guides',
    intro:
      "Rome's food identity changes block by block. This series covers the character of individual neighbourhoods — Trastevere, Testaccio, the Jewish Ghetto, and beyond — and complements the dedicated neighbourhood hubs with more informal, story-driven notes.",
  },
  {
    slug: 'practical-tips',
    name: 'Practical Tips',
    intro:
      'The logistics nobody puts on a menu: how to order at a bar counter, when tipping actually matters, how to spot a menu turistico from across the street, and other small things that make a trip smoother.',
  },
  {
    slug: 'itineraries',
    name: 'Itineraries & Day Plans',
    intro:
      'Full day plans that string several stops together with a walking route in mind — a morning market crawl, an evening that moves from aperitivo to dinner to gelato — built around what a real day of eating in Rome actually looks like.',
  },
  {
    slug: 'seasonal-events',
    name: 'Seasonal & Events',
    intro:
      "What's actually in season and why it matters — artichoke season, summer sagre (food festivals) in the outskirts, and how Rome's food calendar shifts through the year in ways a one-size-fits-all guide won't tell you.",
  },
];

export function getBlogCategory(slug: string): BlogCategoryDef | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}
