import Link from "next/link";
import { PostSummary } from "../lib/types";
import { formatDateShort } from "../lib/api";

interface Props {
  post: PostSummary;
  variant?: "default" | "featured" | "compact";
}

export default function PostCard({ post, variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        className="block group py-3 post-card"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <p
          className="text-sm font-medium group-hover:underline leading-snug mb-1"
          style={{ color: "var(--fg)" }}
        >
          {post.title}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="inline-block text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
          >
            {post.category.name}
          </span>
          <span className="text-xs" style={{ color: "var(--fg-3)" }}>
            {formatDateShort(post.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block group py-5 post-card"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
        <span
          className="inline-block text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
        >
          {post.category.name}
        </span>
        <span className="text-xs tabular-nums" style={{ color: "var(--fg-3)" }}>
          {formatDateShort(post.publishedAt)}
        </span>
        <span className="text-xs" style={{ color: "var(--fg-3)" }}>
          · {post.readingTime}분
        </span>
      </div>
      <h2
        className="font-semibold text-base leading-snug group-hover:underline mb-2"
        style={{ color: "var(--fg)" }}
      >
        {post.title}
      </h2>
      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--fg-2)" }}>
        {post.excerpt}
      </p>
    </Link>
  );
}
