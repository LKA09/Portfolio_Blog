import type { Metadata } from "next";

export const metadata: Metadata = { title: "소개" };

const STACK = [
  { label: "주력", items: "Java · Spring Boot · JPA · MySQL" },
  { label: "프론트", items: "React · Next.js · TypeScript · Tailwind" },
  { label: "도구", items: "Git · IntelliJ · VS Code" },
];

const PROJECTS = [
  {
    name: "포트폴리오 블로그",
    period: "2026",
    desc: "Next.js 16 + Spring Boot로 만든 개인 블로그. 마크다운 기반 글 작성, 카테고리 필터, 다크 모드.",
    link: null as string | null,
  },
  {
    name: "공공데이터 시간표 앱",
    period: "2025",
    desc: "NEIS 공공 API를 활용한 학교 시간표 조회 서비스. Next.js App Router 기반.",
    link: null as string | null,
  },
  {
    name: "Eco-map",
    period: "2025",
    desc: "환경 관련 정보를 지도 위에 시각화하는 웹 서비스.",
    link: null as string | null,
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-14">

      {/* 소개 */}
      <section className="mb-14">
        <h1 className="text-lg font-semibold mb-5">소개</h1>
        <p className="text-sm leading-[1.9]" style={{ color: "var(--fg-2)" }}>
          안녕하세요, 김가빈입니다.<br />
          Java와 Spring Boot로 백엔드를, React와 Next.js로 프론트엔드를 만들고 있습니다.<br />
          알고리즘 문제 풀기를 좋아하고, 배운 것을 글로 정리하는 습관을 들이고 있습니다.
        </p>
        <div className="flex gap-5 mt-6">
          <a
            href="https://github.com/Lka09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-3 transition-opacity hover:opacity-60"
            style={{ color: "var(--fg)" }}
          >
            GitHub
          </a>
          <a
            href="mailto:gbin8498@gmail.com"
            className="text-sm underline underline-offset-3 transition-opacity hover:opacity-60"
            style={{ color: "var(--fg)" }}
          >
            이메일
          </a>
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="mb-14" style={{ borderTop: "1px solid var(--border)" }}>
        <h2 className="text-xs font-medium mt-8 mb-6 uppercase tracking-widest" style={{ color: "var(--fg-3)" }}>
          기술 스택
        </h2>
        <div className="space-y-4">
          {STACK.map(({ label, items }) => (
            <div key={label} className="flex gap-6 text-sm">
              <span className="w-14 shrink-0" style={{ color: "var(--fg-3)" }}>{label}</span>
              <span style={{ color: "var(--fg-2)" }}>{items}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 프로젝트 */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <h2 className="text-xs font-medium mt-8 mb-6 uppercase tracking-widest" style={{ color: "var(--fg-3)" }}>
          프로젝트
        </h2>
        <div>
          {PROJECTS.map((proj) => (
            <div
              key={proj.name}
              className="py-5"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                  {proj.name}
                </span>
                <span className="text-xs ml-4 shrink-0" style={{ color: "var(--fg-3)" }}>
                  {proj.period}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-2)" }}>
                {proj.desc}
              </p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs mt-2 inline-block underline underline-offset-3 transition-opacity hover:opacity-60"
                  style={{ color: "var(--fg-3)" }}
                >
                  보러가기 →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
