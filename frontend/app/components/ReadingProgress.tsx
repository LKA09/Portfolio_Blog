"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full z-[60] h-[3px]"
      style={{ background: "transparent" }}
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: "var(--accent)",
          transition: "width 0.08s linear",
        }}
      />
    </div>
  );
}
