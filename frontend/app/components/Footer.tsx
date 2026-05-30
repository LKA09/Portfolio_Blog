export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-8 flex items-center justify-between">
        <span className="text-xs" style={{ color: "var(--fg-3)" }}>
          © {new Date().getFullYear()} 김가빈
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Lka09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors hover:text-[var(--fg)]"
            style={{ color: "var(--fg-3)" }}
          >
            GitHub
          </a>
          <a
            href="mailto:gbin8498@gmail.com"
            className="text-xs transition-colors hover:text-[var(--fg)]"
            style={{ color: "var(--fg-3)" }}
          >
            이메일
          </a>
        </div>
      </div>
    </footer>
  );
}
