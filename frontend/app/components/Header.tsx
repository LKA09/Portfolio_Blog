"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/posts",      label: "글" },
  { href: "/categories", label: "카테고리" },
  { href: "/about",      label: "소개" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight"
          style={{ color: "var(--fg)" }}
        >
          김가빈
        </Link>

        {/* 데스크탑 */}
        <nav className="hidden sm:flex items-center gap-5">
          {NAV.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="text-sm transition-colors"
                style={{ color: active ? "var(--fg)" : "var(--fg-3)" }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* 모바일 */}
        <button
          className="sm:hidden text-sm"
          style={{ color: "var(--fg-3)" }}
          onClick={() => setOpen(!open)}
        >
          {open ? "닫기" : "메뉴"}
        </button>
      </div>

      {open && (
        <nav
          className="sm:hidden flex flex-col px-5 pb-4 gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm pt-3"
              style={{ color: "var(--fg-2)" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
