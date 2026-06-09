import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPost, getPosts, formatDate } from "../../lib/api";
import MarkdownRenderer from "../../components/MarkdownRenderer";
import ReadingProgress from "../../components/ReadingProgress";

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
    <>
      <ReadingProgress />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 pt-10 pb-24">

        {/* 뒤로 */}
        <Link
          href="/posts"
          className="inline-flex items-center gap-1.5 text-xs mb-12 transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--fg-3)" }}
        >
          <span>←</span>
          <span>글 목록</span>
        </Link>

        {/* 포스트 헤더 */}
        <header className="mb-12 max-w-2xl">
          {/* 메타 뱃지 */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span
              className="inline-block text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
            >
              {post.category.name}
            </span>
            <span className="text-xs" style={{ color: "var(--fg-3)" }}>
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-xs" style={{ color: "var(--fg-3)" }}>
              · {post.readingTime}분 읽기
            </span>
          </div>

          {/* 제목 */}
          <h1
            className="text-3xl sm:text-4xl font-bold leading-[1.25] tracking-tight mb-6"
            style={{ color: "var(--fg)" }}
          >
            {post.title}
          </h1>

          {/* 요약 */}
          <p
            className="text-base leading-[1.8] pl-4"
            style={{
              color: "var(--fg-2)",
              borderLeft: "3px solid var(--accent)",
            }}
          >
            {post.excerpt}
          </p>

          {/* 저자 인라인 */}
          <div className="flex items-center gap-3 mt-8">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: "var(--accent)", color: "#111" }}
            >
              {post.author.name[0]}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                {post.author.name}
              </p>
              <p className="text-xs" style={{ color: "var(--fg-3)" }}>
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>
        </header>

        {/* 구분선 */}
        <div className="mb-12" style={{ borderTop: "1px solid var(--border)" }} />

        {/* 본문 */}
        <article className="prose max-w-2xl">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* 저자 카드 */}
        <div className="max-w-2xl mt-20">
          <div
            className="rounded-xl p-6 flex items-start gap-5"
            style={{ background: "var(--hover)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shrink-0"
              style={{ background: "var(--accent)", color: "#111" }}
            >
              {post.author.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: "var(--fg)" }}>
                {post.author.name}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-2)" }}>
                {post.author.bio}
              </p>
            </div>
          </div>
        </div>

        {/* 하단 네비게이션 */}
        <div className="max-w-2xl mt-10 pt-8 flex justify-between items-center" style={{ borderTop: "1px solid var(--border)" }}>
          <Link
            href="/posts"
            className="text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--fg-3)" }}
          >
            ← 다른 글 보기
          </Link>
          <Link
            href="/"
            className="text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--fg-3)" }}
          >
            홈으로
          </Link>
        </div>

      </div>
    </>
  );
}
