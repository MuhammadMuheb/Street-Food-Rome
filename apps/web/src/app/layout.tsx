import type { Metadata } from 'next';
import { Fraunces, Playfair_Display, Public_Sans } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
});

// Second serif, distinct from Fraunces — used only for the media-mentions
// row so each masthead-style name reads as its own distinct publication,
// not a uniform list.
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://streetfoodrome.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Street Food Rome | Authentic Rome Food Tours & Street Food Guide",
    template: '%s | Street Food Rome',
  },
  description:
    "A first-hand guide to Rome's street food from a 12-year resident — honest neighbourhood, market, and tour recommendations, no tourist traps.",
  openGraph: {
    type: 'website',
    siteName: 'Street Food Rome',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable} ${playfairDisplay.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
