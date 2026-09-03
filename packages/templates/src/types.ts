/**
 * packages/templates/src/types.ts — the normalized props every template
 * layout receives. apps/web's renderDispatch maps a Payload `Pages` doc (plus
 * its site and featured tours) into this shape before handing off — templates
 * never see raw CMS doc shapes, matching how packages/ui's blocks work.
 */
import type { ReactElement } from 'react';
import type { TourCardData } from '@italy-tours/ui';
import type { SiteNiche } from '@italy-tours/config';

export interface TemplateSite {
  slug: string;
  niche: SiteNiche;
}

export interface TemplateFaq {
  question: string;
  answer: string;
}

export interface TemplateAuthor {
  name: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

export interface TemplatePageData {
  title: string;
  heroImageUrl?: string | null;
  bodyHtml?: string | null;
  faqs: TemplateFaq[];
  tours: TourCardData[];
  author?: TemplateAuthor | null;
}

export interface TemplateComponentProps {
  site: TemplateSite;
  page: TemplatePageData;
}

export type TemplateComponent = (props: TemplateComponentProps) => ReactElement;

export interface TemplateEntry {
  key: string;
  displayName: string;
  Home: TemplateComponent;
  MoneyPage: TemplateComponent;
  About: TemplateComponent;
  Contact: TemplateComponent;
  /** Payload `pages` block slugs the admin UI / Redirect Site Factory should constrain this template's Page.body to. */
  blockLibrary: string[];
}
