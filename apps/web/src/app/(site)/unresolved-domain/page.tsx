/**
 * apps/web/src/app/(site)/unresolved-domain/page.tsx — fallback rendered by the
 * middleware rewrite when a hostname has no live `Site` record.
 */
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
