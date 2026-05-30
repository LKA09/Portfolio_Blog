import Link from "next/link";
import { getFeaturedPosts, getPosts, getCategories } from "./lib/api";
import { formatDateShort } from "./lib/api";

export default async function HomePage() {
  const [recent, categories] = await Promise.all([
    getPosts({ size: 10, sort: "latest" }),
    getCategories(),
  ]);

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-14">

      {/* 인트로 */}
      <section className="mb-14">
        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-2)" }}>
          개발하면서 배운 것들, 풀었던 문제들, 만들고 있는 것들을 씁니다.
        </p>
      </section>

      <div className="flex gap-12">
        {/* 글 목록 */}
        <section className="flex-1 min-w-0">
          <h2 className="text-xs font-medium mb-5 uppercase tracking-widest" style={{ color: "var(--fg-3)" }}>
            최근 글
          </h2>

          <div>
            {recent.content.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="flex gap-5 py-4 group"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span
                  className="text-xs tabular-nums shrink-0 mt-0.5 w-20"
                  style={{ color: "var(--fg-3)" }}
                >
                  {formatDateShort(post.publishedAt)}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-sm font-medium leading-snug group-hover:underline"
                    style={{ color: "var(--fg)" }}
                  >
                    {post.title}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--fg-3)" }}>
                    {post.category.name} · {post.readingTime}분
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/posts"
            className="inline-block mt-6 text-sm underline underline-offset-4"
            style={{ color: "var(--fg-2)" }}
          >
            모든 글 보기 →
          </Link>
        </section>

        {/* 카테고리 (좁은 사이드) */}
        <aside className="hidden sm:block w-28 shrink-0">
          <h2 className="text-xs font-medium mb-5 uppercase tracking-widest" style={{ color: "var(--fg-3)" }}>
            카테고리
          </h2>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex items-center justify-between group"
              >
                <span
                  className="text-sm group-hover:underline"
                  style={{ color: "var(--fg-2)" }}
                >
                  {cat.name}
                </span>
                <span className="text-xs" style={{ color: "var(--fg-3)" }}>
                  {cat.postCount}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
