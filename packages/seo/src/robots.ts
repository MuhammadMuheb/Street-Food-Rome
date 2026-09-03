/**
 * packages/seo/src/robots.ts — per-domain robots.txt rules (M4). A `draft` or
 * `parked` site should never be indexed even if a request slips through, so
 * this takes the site's live status rather than assuming "live" like
 * sitemap.ts's caller does upstream.
 */
export interface RobotsRule {
  userAgent: string;
  allow?: string;
  disallow?: string;
}

export interface RobotsResult {
  rules: RobotsRule[];
  sitemapUrl: string;
}

export function buildRobotsRules(domain: string, isLive: boolean): RobotsResult {
  return {
    rules: [{ userAgent: '*', ...(isLive ? { allow: '/' } : { disallow: '/' }) }],
    sitemapUrl: `https://${domain}/sitemap.xml`,
  };
}
