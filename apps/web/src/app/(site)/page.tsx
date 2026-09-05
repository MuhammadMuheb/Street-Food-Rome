/**
 * apps/web/src/app/(site)/page.tsx — "/" for any resolved, live site.
 * Fetches the site's `home`-slug Page and hands off to renderDispatch
 * (blueprint §5.3: hero import vs. template registry lookup).
 */
import type { Metadata } from 'next';
import { buildPageMetadata } from '@italy-tours/seo';
import { getCurrentSite } from '@/site-resolver/resolveSite';
import { renderDispatch } from '@/site-resolver/renderDispatch';
import { fetchPageMeta } from '@/site-resolver/fetchPageMeta';

// See the matching comment in (site)/[slug]/page.tsx — same caveat applies:
// this route also resolves its tenant via headers(), which keeps it fully
// dynamic regardless of this export today.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getCurrentSite();
  if (!site) return {};

  const pageMeta = await fetchPageMeta(site, 'home');
  if (!pageMeta) return {};

  return buildPageMetadata({ domain: site.domain, language: site.language }, pageMeta, '/') as Metadata;
}

export default async function SiteHomePage() {
  const site = await getCurrentSite();

  if (!site) {
    return <main>No site context on this request.</main>;
  }

  const { content } = await renderDispatch(site, 'home');
  return content;
}
