/**
 * apps/web/src/app/(site)/[slug]/page.tsx — generic page route (money,
 * support, about, legal) for any resolved, live site.
 *
 * Checks Redirects before falling through to renderDispatch's own 404 —
 * a retired path with a Redirects doc should 301/302, not 404.
 */
import { redirect } from 'next/navigation';
import { getCurrentSite } from '@/site-resolver/resolveSite';
import { renderDispatch } from '@/site-resolver/renderDispatch';
import { findRedirect } from '@/site-resolver/findRedirect';

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

  return renderDispatch(site, slug);
}
