import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "../lib/api";

export const metadata: Metadata = { title: "카테고리" };

export default async function CategoriesPage() {
  const categories = await getCategories();
  const total = categories.reduce((s, c) => s + c.postCount, 0);

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 py-14">
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="text-lg font-semibold">카테고리</h1>
        <span className="text-sm" style={{ color: "var(--fg-3)" }}>글 {total}편</span>
      </div>

      <div>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="flex items-baseline justify-between py-4 group"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div>
              <span
                className="text-sm font-medium group-hover:underline"
                style={{ color: "var(--fg)" }}
              >
                {cat.name}
              </span>
              {cat.description && (
                <p className="text-xs mt-1" style={{ color: "var(--fg-3)" }}>
                  {cat.description}
                </p>
              )}
            </div>
            <span
              className="text-xs ml-4 shrink-0 px-2 py-0.5 rounded-full font-medium tabular-nums"
              style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
            >
              {cat.postCount}편
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
