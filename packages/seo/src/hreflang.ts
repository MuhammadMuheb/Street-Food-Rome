/**
 * packages/seo/src/hreflang.ts — alternate-language link entries pairing an
 * EN hero with its IT sibling via `Sites.hreflangGroup` (blueprint §1.2/§4).
 */
export interface HreflangSitePair {
  domain: string;
  language: string;
}

export interface HreflangLink {
  hrefLang: string;
  href: string;
}

export function buildHreflangLinks(sites: HreflangSitePair[]): HreflangLink[] {
  return sites.map((site) => ({
    hrefLang: site.language,
    href: `https://${site.domain}/`,
  }));
}
