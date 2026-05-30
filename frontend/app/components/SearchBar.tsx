"use client";

import { useRef } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "검색..." }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-none outline-none"
        style={{
          background: "transparent",
          borderBottom: "1px solid var(--border)",
          color: "var(--fg)",
        }}
      />
    </div>
  );
}
