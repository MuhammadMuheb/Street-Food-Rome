/**
 * apps/web/src/app/(payload)/api/[...slug]/route.ts — Payload's REST API
 * (used internally by the admin panel; also a general Payload REST API if
 * ever needed beyond the app's own /api/internal routes).
 */
import config from '@italy-tours/cms/payload.config';
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes';

export const GET = REST_GET(config);
export const POST = REST_POST(config);
export const DELETE = REST_DELETE(config);
export const PATCH = REST_PATCH(config);
export const PUT = REST_PUT(config);
export const OPTIONS = REST_OPTIONS(config);
