import type { MetadataRoute } from 'next';
import { getAllBlogPosts, listPageDocs, SITE_DOMAIN, type PageDoc } from '@/lib/firestore';
import { CATEGORIES, NEIGHBORHOODS, NETWORK_SITES, TOURS } from '@/lib/tours';

// Only these PageDoc slugs have a live route — Firestore may still hold
// orphaned docs from pages that were removed from the site; keep those out
// of the sitemap. cookie-policy/affiliate-disclosure are included even
// though their PageDoc may not exist yet — the routes themselves are live
// and render sensible fallback content when Firestore has no doc.
const LIVE_PAGE_SLUGS = new Set([
  'home',
  'about',
  'contact',
  'privacy',
  'terms',
  'faq',
  'cookie-policy',
  'affiliate-disclosure',
]);

const STATIC_LEGAL_SLUGS = ['cookie-policy', 'affiliate-disclosure'];

type Tier = { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] };

/**
 * Single source of truth for every priority/changeFrequency value used in
 * this sitemap — PageDoc-backed pages AND registry-driven tour/category/
 * neighbourhood/blog URLs all read from this one map, so there's no way for
 * the two schemes to drift apart the way they previously did (tour/hub/blog
 * entries used to hardcode their own numbers despite a comment claiming
 * otherwise).
 */
const PRIORITY_TIERS = {
  // The homepage is a singular page, not a PageDoc "type" tier — it always
  // ranks highest regardless of how its PageDoc happens to be classified.
  home: { priority: 1.0, changeFrequency: 'daily' },
  money: { priority: 1.0, changeFrequency: 'weekly' },
  tour: { priority: 0.9, changeFrequency: 'weekly' },
  toursHub: { priority: 0.8, changeFrequency: 'weekly' },
  category: { priority: 0.7, changeFrequency: 'weekly' },
  guide: { priority: 0.65, changeFrequency: 'monthly' },
  hubIndex: { priority: 0.6, changeFrequency: 'monthly' },
  about: { priority: 0.6, changeFrequency: 'monthly' },
  support: { priority: 0.6, changeFrequency: 'monthly' },
  blogIndex: { priority: 0.6, changeFrequency: 'weekly' },
  blogPost: { priority: 0.5, changeFrequency: 'monthly' },
  legal: { priority: 0.3, changeFrequency: 'yearly' },
} as const satisfies Record<string, Tier>;

function priorityForType(type: PageDoc['type']): Tier {
  switch (type) {
    case 'money':
      return PRIORITY_TIERS.money;
    case 'about':
      return PRIORITY_TIERS.about;
    case 'support':
      return PRIORITY_TIERS.support;
    case 'category':
      return PRIORITY_TIERS.category;
    case 'guide':
      return PRIORITY_TIERS.guide;
    case 'legal':
      return PRIORITY_TIERS.legal;
    default:
      return PRIORITY_TIERS.support;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([listPageDocs(), getAllBlogPosts()]);

  const pagesBySlug = new Map(pages.map((p) => [p.slug, p]));

  const pageEntries = Array.from(LIVE_PAGE_SLUGS).map((slug) => {
    const page = pagesBySlug.get(slug);
    const { priority, changeFrequency } =
      slug === 'home' ? PRIORITY_TIERS.home : priorityForType(page?.type ?? (STATIC_LEGAL_SLUGS.includes(slug) ? 'legal' : 'support'));
    return {
      url: `https://${SITE_DOMAIN}/${slug === 'home' ? '' : slug}`,
      lastModified: page?.updatedAt ?? new Date().toISOString(),
      changeFrequency,
      priority,
    };
  });

  const tourEntries = TOURS.map((tour) => ({
    url: `https://${SITE_DOMAIN}/tours/${tour.seoSlug}`,
    changeFrequency: PRIORITY_TIERS.tour.changeFrequency,
    priority: PRIORITY_TIERS.tour.priority,
  }));

  const toursHubEntry = {
    url: `https://${SITE_DOMAIN}/tours`,
    changeFrequency: PRIORITY_TIERS.toursHub.changeFrequency,
    priority: PRIORITY_TIERS.toursHub.priority,
  };

  const categoryEntries = CATEGORIES.map((c) => ({
    url: `https://${SITE_DOMAIN}/tours/category/${c.slug}`,
    changeFrequency: PRIORITY_TIERS.category.changeFrequency,
    priority: PRIORITY_TIERS.category.priority,
  }));

  const neighborhoodsHubEntry = {
    url: `https://${SITE_DOMAIN}/neighborhoods`,
    changeFrequency: PRIORITY_TIERS.hubIndex.changeFrequency,
    priority: PRIORITY_TIERS.hubIndex.priority,
  };

  const neighborhoodEntries = NEIGHBORHOODS.map((n) => ({
    url: `https://${SITE_DOMAIN}/neighborhoods/${n.slug}`,
    changeFrequency: PRIORITY_TIERS.guide.changeFrequency,
    priority: PRIORITY_TIERS.guide.priority,
  }));

  // Placeholder pages for sister network properties — low priority since
  // content is still being built out.
  const networkEntries = NETWORK_SITES.map((site) => ({
    url: `https://${SITE_DOMAIN}/${site.slug}`,
    changeFrequency: PRIORITY_TIERS.legal.changeFrequency,
    priority: PRIORITY_TIERS.legal.priority,
  }));

  const blogEntries = posts.map((post) => ({
    url: `https://${SITE_DOMAIN}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: PRIORITY_TIERS.blogPost.changeFrequency,
    priority: PRIORITY_TIERS.blogPost.priority,
  }));

  const BLOG_CATEGORY_SLUGS = ['food-guides', 'neighborhood-guides', 'practical-tips', 'itineraries', 'seasonal-events'];
  const blogCategoryEntries = BLOG_CATEGORY_SLUGS.map((slug) => ({
    url: `https://${SITE_DOMAIN}/blog/category/${slug}`,
    changeFrequency: PRIORITY_TIERS.category.changeFrequency,
    priority: PRIORITY_TIERS.category.priority,
  }));

  const blogIndexEntry = {
    url: `https://${SITE_DOMAIN}/blog`,
    changeFrequency: PRIORITY_TIERS.blogIndex.changeFrequency,
    priority: PRIORITY_TIERS.blogIndex.priority,
  };

  return [
    ...pageEntries,
    toursHubEntry,
    ...tourEntries,
    ...categoryEntries,
    neighborhoodsHubEntry,
    ...neighborhoodEntries,
    ...networkEntries,
    blogIndexEntry,
    ...blogCategoryEntries,
    ...blogEntries,
  ];
}
