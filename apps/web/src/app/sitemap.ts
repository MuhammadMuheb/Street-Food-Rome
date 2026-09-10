import type { MetadataRoute } from 'next';
import { getAllBlogPosts, listPageDocs, SITE_DOMAIN } from '@/lib/firestore';
import { KEPT_TOURS } from '@/components/TourPageContent';

// Only these PageDoc slugs have a live route — Firestore may still hold
// orphaned docs (e.g. cookie-policy, affiliate-disclosure) from pages that
// were removed from the site; keep those out of the sitemap.
const LIVE_PAGE_SLUGS = new Set(['home', 'about', 'contact', 'privacy', 'terms', 'faq']);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([listPageDocs(), getAllBlogPosts()]);

  const pageEntries = pages
    .filter((page) => LIVE_PAGE_SLUGS.has(page.slug))
    .map((page) => ({
      url: `https://${SITE_DOMAIN}/${page.slug === 'home' ? '' : page.slug}`,
      lastModified: page.updatedAt ?? new Date().toISOString(),
    }));

  const tourEntries = KEPT_TOURS.map((tour) => ({
    url: `https://${SITE_DOMAIN}/tours/${tour.path}`,
  }));

  const blogEntries = posts.map((post) => ({
    url: `https://${SITE_DOMAIN}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const staticEntries = [`https://${SITE_DOMAIN}/blog`].map((url) => ({ url }));

  return [...pageEntries, ...tourEntries, ...blogEntries, ...staticEntries];
}
