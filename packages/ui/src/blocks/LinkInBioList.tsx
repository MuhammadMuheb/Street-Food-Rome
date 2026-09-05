/**
 * packages/ui/src/blocks/LinkInBioList.tsx — stacked, full-width tappable
 * link rows (Linktree-style), the "link-in-bio" half of an offer page: a
 * single Instagram bio link can point here and fan out to every other
 * destination (tours, other pages, socials) without needing a second link
 * slot. Each row is a large tap target (mobile touch-target minimum) rather
 * than an inline text link.
 *
 * Rows use next/link since these always target the site's own content pages
 * — a genuine external link (e.g. a real Instagram profile) should still be
 * passed here as a normal absolute URL; next/link renders a real <a> for any
 * href it can't client-navigate, so that case degrades correctly on its own.
 */
import Link from 'next/link';
import { Container } from '../primitives/Container';

export interface LinkInBioItem {
  label: string;
  href: string;
  description?: string;
}

export interface LinkInBioListProps {
  heading?: string;
  links: LinkInBioItem[];
}

export function LinkInBioList({ heading, links }: LinkInBioListProps) {
  if (links.length === 0) return null;

  return (
    <Container className="py-8">
      {heading ? <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">{heading}</h2> : null}
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex min-h-[3rem] items-center justify-between gap-3 rounded-site border border-foreground/10 bg-background px-4 py-3 transition-colors hover:border-primary/40"
            >
              <span>
                <span className="block font-medium text-foreground">{link.label}</span>
                {link.description ? <span className="block text-sm text-foreground/60">{link.description}</span> : null}
              </span>
              <span aria-hidden className="text-foreground/40">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
