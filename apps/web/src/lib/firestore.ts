/**
 * apps/web/src/lib/firestore.ts — Firebase Admin SDK singleton + typed reads
 * for streetfoodrome.com. Single-site now (no more multi-tenant hostname
 * resolution) — everything queries this one domain's data directly.
 *
 * Credentials come from three env vars (FIREBASE_PROJECT_ID/CLIENT_EMAIL/
 * PRIVATE_KEY), not the service-account JSON file directly: that file is
 * git-ignored and never present in a Vercel deployment bundle, so the same
 * three env vars work identically in local dev and in Vercel's dashboard.
 */
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

export const SITE_DOMAIN = 'streetfoodrome.com';

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
  if (!dbInstance) dbInstance = getFirestore(loadApp());
  return dbInstance;
}

export interface TourDoc {
  title: string;
  slug: string;
  partner: string;
  partnerProductId: string;
  affiliateUrl: string;
  priceBand: string | null;
  duration: string | null;
  city: string;
  niche: string[];
  imageUrl: string | null;
  firstHandNotes: string | null;
  /** Rome neighbourhood this tour is set in (e.g. "trastevere"), for cross-linking with /neighborhoods/{slug}.
   *  Not yet populated on most existing Firestore docs — reads default this to null. */
  neighborhood: string | null;
}

export interface PageFaq {
  question: string;
  answer: string;
}

export interface PageDoc {
  slug: string;
  title: string;
  type: 'money' | 'support' | 'about' | 'legal' | 'category' | 'guide';
  bodyHtml: string | null;
  heroImageUrl: string | null;
  authorId: string | null;
  faqs: PageFaq[];
  featuredTourSlugs: string[];
  metaTitle: string;
  metaDesc: string;
  schemaType?: string[];
  updatedAt?: string;
}

export interface AuthorDoc {
  name: string;
  bio: string | null;
  avatarUrl: string | null;
}

export interface BlogPostDoc {
  slug: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
  coverImageUrl: string | null;
  publishedAt: string;
  metaTitle: string;
  metaDesc: string;
  /** One of the 5 blog taxonomy slugs (food-guides, neighborhood-guides, practical-tips,
   *  itineraries, seasonal-events). Not yet populated on existing docs — defaults to null. */
  categorySlug: string | null;
  /** One of the LANDMARKS slugs in lib/tours.ts (e.g. "trevi-fountain"), for
   *  linking a landmark mention on the homepage to a real post about it.
   *  Not yet populated on existing docs — defaults to null. */
  landmarkSlug: string | null;
  /** `authors` collection doc id — for a byline via getAuthor(). Not yet
   *  populated on existing docs — defaults to null. */
  authorId: string | null;
}

function normalizeTour(data: FirebaseFirestore.DocumentData): TourDoc {
  return { neighborhood: null, ...data } as TourDoc;
}

function normalizeBlogPost(data: FirebaseFirestore.DocumentData): BlogPostDoc {
  return { categorySlug: null, landmarkSlug: null, authorId: null, ...data } as BlogPostDoc;
}

export async function getAllTours(): Promise<TourDoc[]> {
  const snap = await getDb().collection('tours').get();
  return snap.docs.map((doc) => normalizeTour(doc.data()));
}

export async function getTourBySlug(slug: string): Promise<TourDoc | null> {
  const snap = await getDb().collection('tours').doc(slug).get();
  return snap.exists ? normalizeTour(snap.data()!) : null;
}

export async function getPageDoc(slug: string): Promise<PageDoc | null> {
  const snap = await getDb().collection('sites').doc(SITE_DOMAIN).collection('pages').doc(slug).get();
  return snap.exists ? (snap.data() as PageDoc) : null;
}

export async function listPageDocs(): Promise<PageDoc[]> {
  const snap = await getDb().collection('sites').doc(SITE_DOMAIN).collection('pages').get();
  return snap.docs.map((doc) => doc.data() as PageDoc);
}

export async function getAuthor(id: string): Promise<AuthorDoc | null> {
  const snap = await getDb().collection('authors').doc(id).get();
  return snap.exists ? (snap.data() as AuthorDoc) : null;
}

export async function getAllBlogPosts(): Promise<BlogPostDoc[]> {
  const snap = await getDb().collection('blogPosts').orderBy('publishedAt', 'desc').get();
  return snap.docs.map((doc) => normalizeBlogPost(doc.data()));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDoc | null> {
  const snap = await getDb().collection('blogPosts').doc(slug).get();
  return snap.exists ? normalizeBlogPost(snap.data()!) : null;
}
