"use client";

import { useState, type ReactNode } from "react";

export function AnswerToggle({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/20">
      <button
        onClick={() => setShow((s) => !s)}
        className="text-sm font-semibold text-amber-800 dark:text-amber-300"
      >
        {show ? "Hide answers ▲" : "Show answers ▼"}
      </button>
      {show && <div className="mt-4">{children}</div>}
    </div>
  );
}
