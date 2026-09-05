/**
 * apps/web/src/site-resolver/renderDispatch.tsx — hero vs. template render
 * switch (blueprint §5.3).
 *
 * `type === 'hero'` dynamically imports the default export from
 * `src/sites/<slug>` — a single component that switches on `pageType`
 * itself. `type === 'redirect'` looks up the component keyed by
 * `templateKey` in `packages/templates/src/registry.ts` and picks the
 * matching layout (Home/MoneyPage/About/Contact) before rendering it.
 */
import type { ReactElement, ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getTemplate } from '@italy-tours/templates';
import type { TemplateComponentProps, TemplateSite } from '@italy-tours/templates';
import type { PageType } from '@italy-tours/config';
import { Header, Footer, type HeaderNavLink } from '@italy-tours/ui';
import type { CurrentSite } from './resolveSite';
import { fetchPageData } from './fetchPageData';

// Pages that intentionally render with no nav/footer chrome — a conversion-
// focused landing page (e.g. an Instagram bio-link offer) wants the visitor
// looking only at its own CTA, not browsing the rest of the site.
const CHROME_EXEMPT_SLUGS = new Set(['instagram']);

const DEFAULT_NAV_LINKS: HeaderNavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/**
 * A hero's own nav/brand config, exported as `nav` alongside its default
 * component from src/sites/<slug>/index.tsx — kept there (not in a static
 * map here) so it loads lazily with the rest of that hero's bespoke module,
 * same as its default export already does, instead of bundling every hero's
 * logo into this shared dispatcher regardless of which one is rendering.
 */
export interface HeroNavConfig {
  siteName: string;
  navLinks: HeaderNavLink[];
  logo?: ReactNode;
  showThemeToggle?: boolean;
}

function humanizeSlug(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ');
}

function withChrome(
  content: ReactElement,
  slug: string,
  siteName: string,
  navLinks: HeaderNavLink[],
  logo?: ReactNode,
  showThemeToggle?: boolean,
): ReactElement {
  if (CHROME_EXEMPT_SLUGS.has(slug)) return content;
  return (
    <>
      <Header siteName={siteName} logo={logo} navLinks={navLinks} showThemeToggle={showThemeToggle} />
      {content}
      <Footer siteName={siteName} />
    </>
  );
}

export interface HeroSiteProps extends TemplateComponentProps {
  pageType: PageType;
  /** The requested Pages.slug — "home" needs this since there's no dedicated PageType for it. */
  slug: string;
}

export type HeroSiteComponent = (props: HeroSiteProps) => ReactElement;

interface LoadedHeroModule {
  component: HeroSiteComponent;
  nav: HeroNavConfig | null;
}

async function loadHeroModule(slug: string): Promise<LoadedHeroModule | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- webpack context import, resolved per hero folder
    const mod = await import(`../sites/${slug}/index.tsx`);
    if (typeof mod.default !== 'function') return null;
    return { component: mod.default as HeroSiteComponent, nav: (mod.nav as HeroNavConfig | undefined) ?? null };
  } catch {
    return null;
  }
}

function pickTemplateLayout(templateKey: string | null, pageType: PageType) {
  if (!templateKey) return null;
  const template = getTemplate(templateKey);
  if (!template) return null;

  const layouts: Record<PageType, typeof template.Home> = {
    money: template.MoneyPage,
    support: template.MoneyPage,
    about: template.About,
    legal: template.Contact,
  };
  return layouts[pageType] ?? template.MoneyPage;
}

export interface DispatchResult {
  content: ReactElement;
  pageType: PageType;
  page: TemplateComponentProps['page'];
}

export async function renderDispatch(site: CurrentSite, slug: string): Promise<DispatchResult> {
  const fetched = await fetchPageData(site, slug);
  if (!fetched) notFound();

  const templateSite: TemplateSite = { slug: site.slug, niche: site.niche };
  const props: HeroSiteProps = { site: templateSite, page: fetched.page, pageType: fetched.pageType, slug };

  let content: ReactElement;

  if (site.type === 'hero') {
    const loaded = await loadHeroModule(site.slug);
    if (!loaded) {
      content = (
        <main>
          Hero site component not found for slug &quot;{site.slug}&quot;.
        </main>
      );
    } else {
      const nav = loaded.nav ?? { siteName: humanizeSlug(site.slug), navLinks: DEFAULT_NAV_LINKS };
      const HeroSite = loaded.component;
      content = withChrome(<HeroSite {...props} />, slug, nav.siteName, nav.navLinks, nav.logo, nav.showThemeToggle);
    }
  } else {
    // slug === 'home' pages use the template's Home layout; everything else
    // (money/support/about/legal) uses the type-appropriate layout.
    const template = site.templateKey ? getTemplate(site.templateKey) : undefined;
    if (!template) {
      content = (
        <main>
          Template &quot;{site.templateKey}&quot; is not implemented yet.
        </main>
      );
    } else {
      const Layout = slug === 'home' ? template.Home : pickTemplateLayout(site.templateKey, fetched.pageType) ?? template.MoneyPage;
      const siteName = site.domain || humanizeSlug(site.slug);
      content = withChrome(<Layout {...props} />, slug, siteName, DEFAULT_NAV_LINKS);
    }
  }

  return { content, pageType: fetched.pageType, page: fetched.page };
}
