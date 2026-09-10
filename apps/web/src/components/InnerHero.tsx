import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
}

interface InnerHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: Breadcrumb;
}

export function InnerHero({ eyebrow, title, subtitle, breadcrumb }: InnerHeroProps) {
  return (
    <section className="bg-[#f9fafa] py-14 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-6 text-center sm:px-14">
        {breadcrumb ? (
          <nav className="mb-3 text-sm text-[#9aa0a5]">
            <Link href={breadcrumb.href} className="hover:text-[#ff0022]">
              {breadcrumb.label}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#5c6166]">{title}</span>
          </nav>
        ) : null}
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9aa0a5]">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#5c6166]">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
