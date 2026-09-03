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
import type { ReactElement } from 'react';
import { notFound } from 'next/navigation';
import { getTemplate } from '@italy-tours/templates';
import type { TemplateComponentProps, TemplateSite } from '@italy-tours/templates';
import type { PageType } from '@italy-tours/config';
import type { CurrentSite } from './resolveSite';
import { fetchPageData } from './fetchPageData';

export interface HeroSiteProps extends TemplateComponentProps {
  pageType: PageType;
  /** The requested Pages.slug — "home" needs this since there's no dedicated PageType for it. */
  slug: string;
}

export type HeroSiteComponent = (props: HeroSiteProps) => ReactElement;

async function loadHeroComponent(slug: string): Promise<HeroSiteComponent | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- webpack context import, resolved per hero folder
    const mod = await import(`../sites/${slug}/index.tsx`);
    return typeof mod.default === 'function' ? (mod.default as HeroSiteComponent) : null;
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

export async function renderDispatch(site: CurrentSite, slug: string): Promise<ReactElement> {
  const fetched = await fetchPageData(site, slug);
  if (!fetched) notFound();

  const templateSite: TemplateSite = { slug: site.slug, niche: site.niche };
  const props: HeroSiteProps = { site: templateSite, page: fetched.page, pageType: fetched.pageType, slug };

  if (site.type === 'hero') {
    const HeroSite = await loadHeroComponent(site.slug);
    if (!HeroSite) {
      return (
        <main>
          Hero site component not found for slug &quot;{site.slug}&quot;.
        </main>
      );
    }
    return <HeroSite {...props} />;
  }

  // slug === 'home' pages use the template's Home layout; everything else
  // (money/support/about/legal) uses the type-appropriate layout.
  const template = site.templateKey ? getTemplate(site.templateKey) : undefined;
  if (!template) {
    return (
      <main>
        Template &quot;{site.templateKey}&quot; is not implemented yet.
      </main>
    );
  }

  const Layout = slug === 'home' ? template.Home : pickTemplateLayout(site.templateKey, fetched.pageType) ?? template.MoneyPage;
  return <Layout {...props} />;
}
