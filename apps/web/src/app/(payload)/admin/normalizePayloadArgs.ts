/**
 * apps/web/src/app/(payload)/admin/normalizePayloadArgs.ts — Next 15's
 * optional catch-all (`[[...segments]]`) types `segments` as possibly
 * `undefined` and `searchParams` values as possibly `undefined`; Payload's
 * `RootPage`/`NotFoundPage`/`generatePageMetadata` types don't allow either.
 * Both are real values at runtime (Next always supplies an object here) —
 * this just narrows the types to match what Payload expects.
 */
export interface RawPageArgs {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function normalizeParams(params: RawPageArgs['params']): Promise<{ segments: string[] }> {
  const resolved = await params;
  return { segments: resolved.segments ?? [] };
}

export async function normalizeSearchParams(searchParams: RawPageArgs['searchParams']): Promise<{ [key: string]: string | string[] }> {
  const resolved = await searchParams;
  const normalized: { [key: string]: string | string[] } = {};
  for (const [key, value] of Object.entries(resolved)) {
    if (value !== undefined) normalized[key] = value;
  }
  return normalized;
}
