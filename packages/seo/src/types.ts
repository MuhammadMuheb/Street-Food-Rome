/**
 * packages/seo/src/types.ts — plain input shapes for this package's builders.
 *
 * Deliberately not the raw Payload `Pages`/`Sites` doc types — that would
 * make packages/seo depend on @italy-tours/cms (and its Postgres/Payload
 * deps) just to build metadata objects. Callers (apps/web route handlers,
 * hero/template layouts) map the CMS doc into this narrower shape.
 */
import type { SiteLanguage } from '@italy-tours/config';

export interface SeoSite {
  domain: string;
  language: SiteLanguage;
  hreflangGroup?: string | null;
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  schemaType?: string[];
  faqs?: SeoFaq[];
  heroImageUrl?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
}
