/**
 * packages/firebase/src/authors.ts — Firestore-backed author boxes (Pages.author).
 *
 * Top-level `authors` collection, doc ID a human-picked slug (e.g.
 * "giulia-romano") rather than an opaque auto-ID — makes it possible to
 * cross-reference an authorId by hand when editing a Page doc directly in
 * the Firebase Console, without needing to look an ID up first.
 */
import { getDb } from './client';

export interface AuthorDoc {
  name: string;
  bio: string | null;
  avatarUrl: string | null;
}

export async function getAuthor(id: string): Promise<AuthorDoc | null> {
  const snap = await getDb().collection('authors').doc(id).get();
  if (!snap.exists) return null;
  return snap.data() as AuthorDoc;
}
