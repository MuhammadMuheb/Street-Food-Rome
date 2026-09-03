/**
 * apps/web/src/app/(payload)/admin/[[...segments]]/not-found.tsx — admin
 * panel 404 (e.g. a stale bookmark to a deleted document).
 */
import type { Metadata } from 'next';
import config from '@italy-tours/cms/payload.config';
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '@italy-tours/cms/importMap';
import { normalizeParams, normalizeSearchParams, type RawPageArgs } from '../normalizePayloadArgs';

export function generateMetadata({ params, searchParams }: RawPageArgs): Promise<Metadata> {
  return generatePageMetadata({ config, params: normalizeParams(params), searchParams: normalizeSearchParams(searchParams) });
}

export default function NotFound({ params, searchParams }: RawPageArgs) {
  return NotFoundPage({ config, params: normalizeParams(params), searchParams: normalizeSearchParams(searchParams), importMap });
}
