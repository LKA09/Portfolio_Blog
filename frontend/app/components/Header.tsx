"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/posts", label: "글" },
  { href: "/categories", label: "카테고리" },
  { href: "/about", label: "소개" },
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
      <div className="max-w-4xl mx-auto px-5 sm:px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ color: "var(--fg)" }}
        >
          <span
            className="inline-block w-2 h-2 rounded-sm shrink-0"
            style={{ background: "var(--accent)" }}
          />
          <span className="text-sm font-bold tracking-tight">Lka09</span>
        </Link>

        {/* 데스크탑 */}
        <nav className="hidden sm:flex items-center gap-6">
          {NAV.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="relative text-sm pb-0.5 transition-colors"
                style={{ color: active ? "var(--accent)" : "var(--fg-3)" }}
              >
                {label}
                {active && (
                  <span
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                )}
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
