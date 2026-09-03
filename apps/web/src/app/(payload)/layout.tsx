/**
 * apps/web/src/app/(payload)/layout.tsx — root layout for Payload's admin
 * panel, mounted at /admin inside the same Next.js app that serves every
 * tenant site. Route-group-scoped so it doesn't wrap (site)'s tenant pages.
 */
import config from '@italy-tours/cms/payload.config';
import { importMap } from '@italy-tours/cms/importMap';
import '@payloadcms/next/css';
import type { ServerFunctionClient } from 'payload';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import type { ReactNode } from 'react';

const serverFunction: ServerFunctionClient = async (args) => {
  'use server';
  return handleServerFunctions({ ...args, config, importMap });
};

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
