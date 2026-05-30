"use client";

import { useEffect, useState, useCallback } from "react";
import { getPosts, getCategories } from "../lib/api";
import { PostSummary, Category } from "../lib/types";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

const SORT_OPTIONS = [
  { value: "latest",  label: "최신순" },
  { value: "oldest",  label: "오래된순" },
  { value: "popular", label: "인기순" },
] as const;

export default function PostsPage() {
  const [posts, setPosts]       = useState<PostSummary[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal]       = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading]   = useState(true);

  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort]         = useState<"latest" | "oldest" | "popular">("latest");
  const [page, setPage]         = useState(0);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [res, cats] = await Promise.all([
        getPosts({ page, size: 8, category: category || undefined, search: search || undefined, sort }),
        categories.length === 0 ? getCategories() : Promise.resolve(null),
      ]);
      setPosts(res.content);
      setTotal(res.totalElements);
      setTotalPages(res.totalPages);
      if (cats) setCategories(cats);
    } finally {
      setLoading(false);
    }
  }, [page, category, search, sort, categories.length]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleSearch   = (v: string) => { setSearch(v);   setPage(0); };
  const handleCategory = (v: string) => { setCategory(v); setPage(0); };
  const handleSort     = (v: "latest" | "oldest" | "popular") => { setSort(v); setPage(0); };

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-14">
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="text-lg font-semibold">글</h1>
        <span className="text-sm" style={{ color: "var(--fg-3)" }}>{total}편</span>
      </div>

      {/* 검색 */}
      <input
        type="search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="검색..."
        className="w-full text-sm py-2 mb-8 outline-none bg-transparent"
        style={{
          borderBottom: "1px solid var(--border)",
          color: "var(--fg)",
        }}
      />

      {/* 필터 행 */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        {/* 카테고리 */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleCategory("")}
            className="text-xs transition-colors"
            style={{ color: category === "" ? "var(--fg)" : "var(--fg-3)" }}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.slug)}
              className="text-xs transition-colors"
              style={{ color: category === cat.slug ? "var(--fg)" : "var(--fg-3)" }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 정렬 */}
        <div className="flex gap-3">
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleSort(value)}
              className="text-xs transition-colors"
              style={{ color: sort === value ? "var(--fg)" : "var(--fg-3)" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 목록 */}
      {loading ? (
        <div className="space-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="py-5 animate-pulse"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="h-3 w-24 rounded mb-3" style={{ background: "var(--border)" }} />
              <div className="h-4 w-2/3 rounded mb-2" style={{ background: "var(--border)" }} />
              <div className="h-3 w-full rounded" style={{ background: "var(--border)" }} />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="py-20 text-center text-sm" style={{ color: "var(--fg-3)" }}>
          검색 결과가 없습니다.
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
