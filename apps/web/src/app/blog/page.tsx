import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts, SITE_DOMAIN } from '@/lib/firestore';
import { InnerHero } from '@/components/InnerHero';
import { SafeImage } from '@/components/SafeImage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on Rome street food — how to order, what to look for, and how the classics actually differ.',
  alternates: { canonical: `https://${SITE_DOMAIN}/blog` },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <InnerHero
        eyebrow="Street Food Rome Blog"
        title="Notes on Rome Street Food"
        subtitle="How to order, what to look for, and how the classics actually differ — written from experience, not a template."
        breadcrumb={{ label: 'Home', href: '/' }}
      />

      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#f4f4f4]">
                  {post.coverImageUrl ? (
                    <SafeImage
                      src={post.coverImageUrl}
                      alt={post.title}
                      fill
                      sizes="(min-width: 640px) 460px, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#9aa0a5]">
                  {formatDate(post.publishedAt)}
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold text-[#1a1a1a]">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5c6166]">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
