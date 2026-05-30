"use client";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i);
  const visible = pages.filter((p) => p === 0 || p === totalPages - 1 || Math.abs(p - page) <= 1);

  return (
    <div className="flex items-center gap-1 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="px-3 py-1.5 text-sm disabled:opacity-30"
        style={{ color: "var(--fg-2)" }}
      >
        ←
      </button>

      {visible.map((p, idx) => {
        const prev = visible[idx - 1];
        return (
          <span key={p} className="flex items-center">
            {prev !== undefined && p - prev > 1 && (
              <span className="px-2 text-sm" style={{ color: "var(--fg-3)" }}>…</span>
            )}
            <button
              onClick={() => onPageChange(p)}
              className="w-8 h-8 text-sm rounded"
              style={{
                color: p === page ? "var(--bg)" : "var(--fg-2)",
                background: p === page ? "var(--fg)" : "transparent",
              }}
            >
              {p + 1}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages - 1}
        className="px-3 py-1.5 text-sm disabled:opacity-30"
        style={{ color: "var(--fg-2)" }}
      >
        →
      </button>
    </div>
  );
}
