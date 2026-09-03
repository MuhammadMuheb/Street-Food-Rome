/**
 * apps/web/src/app/(site)/page.tsx — "/" for any resolved, live site.
 * Fetches the site's `home`-slug Page and hands off to renderDispatch
 * (blueprint §5.3: hero import vs. template registry lookup).
 */
import { getCurrentSite } from '@/site-resolver/resolveSite';
import { renderDispatch } from '@/site-resolver/renderDispatch';

export default async function SiteHomePage() {
  const site = await getCurrentSite();

  if (!site) {
    return <main>No site context on this request.</main>;
  }

  return renderDispatch(site, 'home');
}
