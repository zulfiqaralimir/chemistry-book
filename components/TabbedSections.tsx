"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";

export interface TabSection {
  key: string;
  label: string;
  content: ReactNode;
}

interface Controlled {
  active: string;
  onChange: (key: string) => void;
}

export function TabbedSections({
  sections,
  size = "lg",
  controlled,
}: {
  sections: TabSection[];
  size?: "lg" | "sm";
  controlled?: Controlled;
}) {
  const [internalActive, setInternalActive] = useState(sections[0]?.key);
  const active = controlled ? controlled.active : internalActive;
  const setActive = controlled ? controlled.onChange : setInternalActive;

  return (
    <div>
      <div
        role="tablist"
        className={clsx(
          "flex flex-wrap gap-1 border-b border-slate-200 dark:border-slate-800",
          size === "lg" ? "mb-8" : "mb-5"
        )}
      >
        {sections.map((s) => (
          <button
            key={s.key}
            role="tab"
            aria-selected={active === s.key}
            onClick={() => setActive(s.key)}
            className={clsx(
              "rounded-t-md px-4 py-2 font-medium transition-colors",
              size === "lg" ? "text-sm" : "text-xs",
              active === s.key
                ? "border-b-2 border-teal-600 text-teal-700 dark:border-teal-400 dark:text-teal-300"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      {sections.map((s) => (
        <div key={s.key} hidden={active !== s.key}>
          {s.content}
        </div>
      ))}
    </div>
  );
}
