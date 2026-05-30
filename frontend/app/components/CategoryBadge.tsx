import Link from "next/link";
import { Category } from "../lib/types";

interface Props {
  category: Category;
  asLink?: boolean;
}

export default function CategoryBadge({ category, asLink = true }: Props) {
  const cls = "text-xs font-medium";

  if (asLink) {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className={cls}
        style={{ color: "var(--fg-3)" }}
      >
        {category.name}
      </Link>
    );
  }

  return (
    <span className={cls} style={{ color: "var(--fg-3)" }}>
      {category.name}
    </span>
  );
}
