/**
 * packages/firebase/src/redirects.ts — path-to-URL redirect map, per site.
 *
 * Subcollection sites/{domain}/redirects/{autoId} — queried by `fromPath`
 * equality, same lookup pattern the old Payload-backed findRedirect.ts used
 * (a compound unique index isn't enforceable in Firestore the way Payload's
 * `indexes` config did; whoever adds redirects by hand in the Console is
 * responsible for not creating two docs with the same fromPath).
 */
import { getDb } from './client';

export interface RedirectDoc {
  fromPath: string;
  toUrl: string;
  code: '301' | '302';
}

export async function findRedirectDoc(domain: string, fromPath: string): Promise<RedirectDoc | null> {
  const snap = await getDb()
    .collection('sites')
    .doc(domain)
    .collection('redirects')
    .where('fromPath', '==', fromPath)
    .limit(1)
    .get();

  if (snap.empty) return null;
  return snap.docs[0]!.data() as RedirectDoc;
}
