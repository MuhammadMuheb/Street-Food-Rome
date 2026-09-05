/**
 * apps/web/src/app/(site)/[slug]/page.tsx — generic page route (money,
 * support, about, legal) for any resolved, live site.
 *
 * Checks Redirects before falling through to renderDispatch's own 404 —
 * a retired path with a Redirects doc should 301/302, not 404.
 */
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@italy-tours/seo';
import { getCurrentSite } from '@/site-resolver/resolveSite';
import { renderDispatch } from '@/site-resolver/renderDispatch';
import { findRedirect } from '@/site-resolver/findRedirect';
import { fetchPageMeta } from '@/site-resolver/fetchPageMeta';
import { buildPageJsonLd } from '@/site-resolver/buildPageJsonLd';

// TRD (doc 05 §9): "Rendering: SSG + ISR". Note this is a partial step, not
// full ISR: this route reads `headers()` (via getCurrentSite/findRedirect)
// to resolve the current tenant, and Next.js's dynamic-function usage opts a
// route into per-request dynamic rendering regardless of `revalidate` — so
// today this doesn't yet cache a static shell the way true ISR would. It's
// left in place as the documented target and because the resolve-site fetch
// one layer up (middleware.ts) already revalidates on that same cadence via
// Next's fetch cache; closing the gap fully needs a separate architecture
// change (e.g. resolving site by build-time param instead of request header).
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = await getCurrentSite();
  if (!site) return {};

  const pageMeta = await fetchPageMeta(site, slug);
  if (!pageMeta) return {};

  return buildPageMetadata({ domain: site.domain, language: site.language }, pageMeta, `/${slug}`) as Metadata;
}

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getCurrentSite();

  if (!site) {
    return <main>No site context on this request.</main>;
  }

  const foundRedirect = await findRedirect(site, `/${slug}`);
  if (foundRedirect) {
    redirect(foundRedirect.toUrl);
  }

  const { content, pageType, page } = await renderDispatch(site, slug);
  const jsonLd = buildPageJsonLd(site, slug, pageType, page);

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD requires raw <script> content; escaped below to prevent breaking out of the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      ))}
      {content}
    </>
  );
}
