import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug, SITE_DOMAIN } from '@/lib/firestore';
import { SafeImage } from '@/components/SafeImage';

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/blog/${post.slug}` },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-[#f9fafa] py-10 sm:py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          <nav className="text-sm text-[#9aa0a5]">
            <Link href="/blog" className="hover:text-[#ff0022]">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#5c6166]">{post.title}</span>
          </nav>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-[#9aa0a5]">{formatDate(post.publishedAt)}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          {post.coverImageUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#f4f4f4]">
              <SafeImage src={post.coverImageUrl} alt={post.title} fill priority sizes="720px" className="object-cover" />
            </div>
          ) : null}

          <div className="rich-content mt-8" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
        </div>
      </section>
    </>
  );
}
