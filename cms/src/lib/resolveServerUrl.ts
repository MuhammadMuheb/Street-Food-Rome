/**
 * cms/src/lib/resolveServerUrl.ts — the app's own public origin, used as
 * Payload's `serverURL`/CSRF allowlist and by the publish hook to reach
 * `/api/internal/revalidate`.
 *
 * Falls back to Vercel's own auto-injected `VERCEL_URL` (host only, no
 * protocol — Vercel deployments are always https) before falling back to
 * localhost. Without this, a first deploy is a chicken-and-egg problem:
 * `NEXT_PUBLIC_SITE_URL` would need to be set to a URL that doesn't exist
 * until after that same deploy finishes. Once a custom domain is attached,
 * set `NEXT_PUBLIC_SITE_URL` explicitly to it — `VERCEL_URL` always points
 * at the `*.vercel.app` deployment URL, not a custom domain.
 */
export function resolveServerUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
