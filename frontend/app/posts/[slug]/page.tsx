import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPost, getPosts, formatDate } from "../../lib/api";
import MarkdownRenderer from "../../components/MarkdownRenderer";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "글을 찾을 수 없습니다" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export async function generateStaticParams() {
  const res = await getPosts({ size: 100 });
  return res.content.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-14">
      {/* 뒤로 */}
      <Link
        href="/posts"
        className="text-xs mb-10 inline-block transition-opacity hover:opacity-60"
        style={{ color: "var(--fg-3)" }}
      >
        ← 글 목록
      </Link>

      {/* 헤더 */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: "var(--fg-3)" }}>
          <span>{post.category.name}</span>
          <span>·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readingTime}분</span>
        </div>

        <h1
          className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight mb-4"
          style={{ color: "var(--fg)" }}
        >
          {post.title}
        </h1>

        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-2)" }}>
          {post.excerpt}
        </p>

        <div className="mt-6" style={{ borderBottom: "1px solid var(--border)" }} />
      </header>

      {/* 본문 */}
      <article className="prose">
        <MarkdownRenderer content={post.content} />
      </article>

      {/* 저자 */}
      <div
        className="mt-16 pt-8 flex items-start gap-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
          style={{ background: "var(--fg)", color: "var(--bg)" }}
        >
          {post.author.name[0]}
        </div>
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--fg)" }}>
            {post.author.name}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--fg-2)" }}>
            {post.author.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
