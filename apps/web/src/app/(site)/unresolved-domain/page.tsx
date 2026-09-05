/**
 * apps/web/src/app/(site)/unresolved-domain/page.tsx — fallback rendered by the
 * middleware rewrite when a hostname has no live `Site` record.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domain Not Configured',
  robots: { index: false, follow: false },
};

export default function UnresolvedDomainPage() {
  return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <div>
        <h1>Domain not configured</h1>
        <p>This domain isn&apos;t connected to a live site yet.</p>
      </div>
    </main>
  );
}
