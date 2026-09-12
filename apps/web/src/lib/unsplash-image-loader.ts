import type { ImageLoaderProps } from 'next/image';

/**
 * Custom next/image loader for this site's images.
 *
 * Every image on this site is hotlinked from images.unsplash.com — confirmed
 * by auditing every TourDoc.imageUrl, BlogPostDoc.coverImageUrl, and
 * PageDoc.heroImageUrl live in Firestore, plus every hardcoded image URL in
 * source. It's the only host in use.
 *
 * Next's default loader proxies every image through this app's own server
 * (`/_next/image`), re-fetching the original from Unsplash and re-encoding
 * it for every unique width/quality combination. Under concurrent page
 * load that proxy intermittently timed out fetching from Unsplash,
 * producing 500s on `/_next/image` and a server-side `TimeoutError`.
 *
 * Unsplash's own CDN supports the same resize/format/quality transforms via
 * URL query params (the same "Dynamically Resizable Images" API
 * unsplash.com's own site uses), and is a globally-distributed CDN — far
 * more reliable for this traffic than round-tripping it through a single
 * Next.js server. Returning a direct, correctly-sized Unsplash URL here
 * removes this app's server from the image-serving path entirely for these
 * images: no proxy, no re-encoding, no timeout surface on our side.
 *
 * If a URL from an unexpected host is ever passed in, fall back to
 * returning it unmodified rather than guessing at param support.
 */
export default function unsplashImageLoader({ src, width, quality }: ImageLoaderProps): string {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }

  if (url.hostname !== 'images.unsplash.com') {
    return src;
  }

  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  url.searchParams.set('auto', 'format'); // Unsplash picks WebP/AVIF when the client supports it
  url.searchParams.set('fit', 'crop');

  return url.toString();
}
