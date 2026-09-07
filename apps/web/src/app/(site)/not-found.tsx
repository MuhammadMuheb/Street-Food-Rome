/**
 * apps/web/src/app/(site)/not-found.tsx — 404 boundary for the tenant-site
 * route tree, rendered directly when `renderDispatch` calls `notFound()`
 * for a slug with no matching page doc on a resolved, live site.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function SiteNotFound() {
  return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <div>
        <h1>Page not found</h1>
        <p>This page doesn&apos;t exist on this site.</p>
      </div>
    </main>
  );
}
