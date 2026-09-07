/**
 * packages/firebase/src/client.ts — Firebase Admin SDK singleton.
 *
 * Server-only (Node runtime) — never import this from a client component.
 * Credentials come from three env vars (FIREBASE_PROJECT_ID/CLIENT_EMAIL/
 * PRIVATE_KEY) rather than pointing at the service-account JSON file
 * directly: that file is git-ignored and never present in a Vercel
 * deployment bundle, so the same three env vars work identically in local
 * dev (via infra/env/.env) and in Vercel's dashboard env vars.
 *
 * `getApps().length` guard avoids Next.js dev-mode hot-reload calling
 * `initializeApp` more than once per process, which firebase-admin throws on.
 */
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

function loadApp(): App {
  if (getApps().length > 0) return getApps()[0]!;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials — set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.',
    );
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

let dbInstance: Firestore | null = null;

export function getDb(): Firestore {
  if (!dbInstance) {
    dbInstance = getFirestore(loadApp());
  }
  return dbInstance;
}
