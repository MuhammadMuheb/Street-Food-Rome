/**
 * packages/firebase/src/pages.ts — Firestore-backed per-site page content (M2).
 *
 * Subcollection sites/{domain}/pages/{slug} — a Page only ever belongs to
 * one Site, so nesting it under the Site doc needs no relationship field
 * (Payload's `pages.site` relationship) at all.
 */
import { getDb } from './client';

export interface PageFaqDoc {
  question: string;
  answer: string;
}

export interface PageDoc {
  slug: string;
  title: string;
  type: 'money' | 'support' | 'about' | 'legal';
  bodyHtml: string | null;
  heroImageUrl: string | null;
  authorId: string | null;
  faqs: PageFaqDoc[];
  featuredTourSlugs: string[];
  metaTitle: string;
  metaDesc: string;
  schemaType?: string[];
  updatedAt?: string;
}

function pagesCollection(domain: string) {
  return getDb().collection('sites').doc(domain).collection('pages');
}

export async function getPageDoc(domain: string, slug: string): Promise<PageDoc | null> {
  const snap = await pagesCollection(domain).doc(slug).get();
  if (!snap.exists) return null;
  return snap.data() as PageDoc;
}

export async function listPageDocs(domain: string): Promise<PageDoc[]> {
  const snap = await pagesCollection(domain).get();
  return snap.docs.map((doc) => doc.data() as PageDoc);
}
