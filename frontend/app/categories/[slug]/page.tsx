import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCategory, getPosts } from "../../lib/api";
import PostCard from "../../components/PostCard";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategory(slug);
  if (!cat) return { title: "카테고리를 찾을 수 없습니다" };
  return { title: cat.name };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [cat, posts] = await Promise.all([
    getCategory(slug),
    getPosts({ category: slug, size: 50 }),
  ]);
  if (!cat) notFound();

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-14">
      <Link
        href="/categories"
        className="text-xs mb-8 inline-block transition-opacity hover:opacity-60"
        style={{ color: "var(--fg-3)" }}
      >
        ← 카테고리
      </Link>

      <div className="flex items-baseline justify-between mb-10">
        <h1 className="text-lg font-semibold">{cat.name}</h1>
        <span className="text-sm" style={{ color: "var(--fg-3)" }}>
          {posts.totalElements}편
        </span>
      </div>

      {posts.content.length === 0 ? (
        <p className="text-sm py-10" style={{ color: "var(--fg-3)" }}>
          아직 글이 없습니다.
        </p>
      ) : (
        posts.content.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
