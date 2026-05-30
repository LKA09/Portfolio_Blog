import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-32 text-center">
      <p className="text-xs mb-4 uppercase tracking-widest" style={{ color: "var(--fg-3)" }}>
        404
      </p>
      <h1 className="text-xl font-semibold mb-3" style={{ color: "var(--fg)" }}>
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--fg-2)" }}>
        요청하신 페이지가 없거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="text-sm underline underline-offset-3 transition-opacity hover:opacity-60"
        style={{ color: "var(--fg)" }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
