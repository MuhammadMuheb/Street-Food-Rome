import { notFound } from 'next/navigation';
import { getPageDoc } from '@/lib/firestore';
import { InnerHero } from './InnerHero';

export async function PageDocContent({ slug }: { slug: string }) {
  const page = await getPageDoc(slug);
  if (!page) notFound();

  return (
    <>
      <InnerHero title={page.title} breadcrumb={{ label: 'Home', href: '/' }} />
      <section className="py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          {page.bodyHtml ? <div className="rich-content" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} /> : null}
        </div>
      </section>
    </>
  );
}
