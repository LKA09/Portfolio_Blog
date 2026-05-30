"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mt-0 mb-6 tracking-tight" style={{ color: "var(--fg)" }}>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mt-10 mb-4 tracking-tight" style={{ color: "var(--fg)" }}>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-bold mt-8 mb-3" style={{ color: "var(--fg)" }}>
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-5 leading-[1.85]" style={{ color: "var(--fg)" }}>
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-5 mb-5 space-y-1" style={{ color: "var(--fg)" }}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-5 mb-5 space-y-1" style={{ color: "var(--fg)" }}>
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote
            className="pl-5 my-6 italic"
            style={{
              borderLeft: "2px solid var(--fg)",
              color: "var(--fg-2)",
            }}
          >
            {children}
          </blockquote>
        ),
        code({ className, children }) {
          const isBlock = !!className;
          if (!isBlock) {
            return (
              <code
                className="text-[0.875em] px-1.5 py-0.5 rounded font-mono"
                style={{
                  background: "var(--code-bg)",
                  color: "var(--fg)",
                  border: "1px solid var(--border)",
                }}
              >
                {children}
              </code>
            );
          }
          return <code className="font-mono text-sm">{children}</code>;
        },
        pre: ({ children }) => (
          <pre
            className="p-5 rounded overflow-x-auto mb-5 text-sm leading-relaxed font-mono"
            style={{ background: "#1a1a1a", color: "#e8e8e8" }}
          >
            {children}
          </pre>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="underline underline-offset-3 transition-opacity hover:opacity-60"
            style={{ color: "var(--fg)" }}
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-5">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th
            className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide"
            style={{ borderBottom: "2px solid var(--fg)", color: "var(--fg)" }}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            className="px-3 py-2 text-sm"
            style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
          >
            {children}
          </td>
        ),
        hr: () => <hr className="my-10" style={{ borderColor: "var(--border)" }} />,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
