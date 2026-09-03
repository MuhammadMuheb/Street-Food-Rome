/**
 * packages/ui/src/layout/Header.tsx — site nav header. `navLinks` is passed
 * in rather than derived here — a hero site's page tree and a template's
 * nav are configured differently, this component only renders the result.
 */
import { Container } from '../primitives/Container';

export interface HeaderNavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  siteName: string;
  navLinks?: HeaderNavLink[];
}

export function Header({ siteName, navLinks = [] }: HeaderProps) {
  return (
    <header className="border-b border-foreground/10 bg-background">
      <Container className="flex items-center justify-between py-4">
        <a href="/" className="font-heading text-lg font-bold text-foreground">
          {siteName}
        </a>
        {navLinks.length > 0 ? (
          <nav>
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm font-medium text-foreground/80 hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
