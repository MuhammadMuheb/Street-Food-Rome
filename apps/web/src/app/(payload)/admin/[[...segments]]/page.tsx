/**
 * apps/web/src/app/(payload)/admin/[[...segments]]/page.tsx — catch-all
 * admin panel route.
 */
import type { Metadata } from 'next';
import config from '@italy-tours/cms/payload.config';
import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '@italy-tours/cms/importMap';
import { normalizeParams, normalizeSearchParams, type RawPageArgs } from '../normalizePayloadArgs';

export function generateMetadata({ params, searchParams }: RawPageArgs): Promise<Metadata> {
  return generatePageMetadata({ config, params: normalizeParams(params), searchParams: normalizeSearchParams(searchParams) });
}

export default function Page({ params, searchParams }: RawPageArgs) {
  return RootPage({ config, params: normalizeParams(params), searchParams: normalizeSearchParams(searchParams), importMap });
}
