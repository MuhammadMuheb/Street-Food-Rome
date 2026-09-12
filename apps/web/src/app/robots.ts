import type { MetadataRoute } from 'next';
import { SITE_DOMAIN } from '@/lib/firestore';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The header's search form (currently a non-functional action="#")
      // will eventually post to a search-results URL; disallow that pattern
      // pre-emptively, along with the account area, to avoid thin/duplicate
      // crawl waste once either is wired up.
      disallow: ['/account', '/account/*', '/*?*q=*', '/search', '/search/*'],
    },
    sitemap: `https://${SITE_DOMAIN}/sitemap.xml`,
  };
}
