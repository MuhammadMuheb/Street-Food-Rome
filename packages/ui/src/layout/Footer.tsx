/**
 * packages/ui/src/layout/Footer.tsx — site footer, always carrying the
 * affiliate-relationship disclosure line (every page links out through
 * cloaked affiliate URLs — this is the standing transparency notice).
 */
import { Container } from '../primitives/Container';

export interface FooterProps {
  siteName: string;
  disclosure?: string;
}

const DEFAULT_DISCLOSURE =
  'We earn a commission when you book through links on this site, at no extra cost to you.';

export function Footer({ siteName, disclosure = DEFAULT_DISCLOSURE }: FooterProps) {
  return (
    <footer className="border-t border-foreground/10 bg-background py-10 text-sm text-foreground/60">
      <Container className="flex flex-col gap-2">
        <p>{disclosure}</p>
        <p>
          © {new Date().getFullYear()} {siteName}
        </p>
      </Container>
    </footer>
  );
}
