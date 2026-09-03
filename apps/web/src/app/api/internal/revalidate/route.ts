/**
 * POST /api/internal/revalidate — ISR webhook fired by `afterChangePublishRevalidate`
 * (cms/src/hooks/afterChangePublishRevalidate.ts) whenever a Site or Page is published.
 * Body: { secret: string; tags: string[] }
 */
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const runtime = 'nodejs';

interface RevalidateBody {
  secret: string;
  tags: string[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as Partial<RevalidateBody>;

  if (!body.secret || body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid revalidation secret' }, { status: 401 });
  }

  if (!Array.isArray(body.tags) || body.tags.length === 0) {
    return NextResponse.json({ error: 'Missing "tags" array' }, { status: 400 });
  }

  for (const tag of body.tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: true, tags: body.tags });
}
