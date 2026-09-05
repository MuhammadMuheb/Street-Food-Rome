/**
 * apps/web/src/app/(payload)/admin/normalizePayloadArgs.ts — Next 15's
 * optional catch-all (`[[...segments]]`) types `segments` as possibly
 * `undefined` and `searchParams` values as possibly `undefined`; Payload's
 * `RootPage`/`NotFoundPage`/`generatePageMetadata` types don't allow either.
 *
 * Also: when `not-found.tsx` here is invoked as the generic 404 boundary
 * (a `notFound()` call bubbling up from somewhere else in the tree, not a
 * direct request to an unmatched `/admin/*` path), Next renders it with NO
 * props at all — `params`/`searchParams` themselves are `undefined`, not
 * Promises. Both helpers tolerate that and fall back to empty.
 */
export interface RawPageArgs {
  params?: Promise<{ segments?: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function normalizeParams(params: RawPageArgs['params']): Promise<{ segments: string[] }> {
  const resolved = params ? await params : undefined;
  return { segments: resolved?.segments ?? [] };
}

export async function normalizeSearchParams(searchParams: RawPageArgs['searchParams']): Promise<{ [key: string]: string | string[] }> {
  const resolved = searchParams ? await searchParams : undefined;
  const normalized: { [key: string]: string | string[] } = {};
  if (resolved) {
    for (const [key, value] of Object.entries(resolved)) {
      if (value !== undefined) normalized[key] = value;
    }
  }
  return normalized;
}
