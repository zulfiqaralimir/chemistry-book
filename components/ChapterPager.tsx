"use client";

import { useEffect, useRef, useState } from "react";

const BOUNDARY_TAGS = new Set(["H2", "H3"]);

function applyPage(el: HTMLDivElement, starts: number[], pageIndex: number) {
  const kids = Array.from(el.children) as HTMLElement[];
  const start = starts[pageIndex] ?? 0;
  const end = starts[pageIndex + 1] ?? kids.length;
  kids.forEach((child, i) => {
    child.style.display = i >= start && i < end ? "" : "none";
    // The leading heading of each page doesn't need the large gap that
    // separates chapters in continuous scroll — but keep the horizontal
    // divider line itself, just tighter, so a fresh page still visibly
    // opens with one.
    if (BOUNDARY_TAGS.has(child.tagName)) {
      if (i === start) {
        child.style.marginTop = "0";
        child.style.paddingTop = "0.5rem";
      } else {
        child.style.marginTop = "";
        child.style.paddingTop = "";
      }
    }
  });
}

export function ChapterPager({
  children,
  storageKey = "chapter-pager",
}: {
  children: React.ReactNode;
  storageKey?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [pageStarts, setPageStarts] = useState<number[]>([0]);
  const [titles, setTitles] = useState<string[]>(["Overview"]);
  const [index, setIndex] = useState(0);
  const busyRef = useRef(false);
  const fullKey = `book-pager:${storageKey}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const starts: number[] = [0];
    const heads: string[] = ["Overview"];
    kids.forEach((child, i) => {
      if (i !== 0 && BOUNDARY_TAGS.has(child.tagName)) {
        starts.push(i);
        heads.push((child.textContent || "").trim());
      }
    });

    // Restore whatever page the reader was last on, so a refresh doesn't
    // send them all the way back to the start.
    let restored = 0;
    try {
      const saved = window.localStorage.getItem(fullKey);
      const parsed = saved === null ? NaN : Number(saved);
      if (Number.isInteger(parsed) && parsed >= 0 && parsed < starts.length) {
        restored = parsed;
      }
    } catch {
      // localStorage unavailable (private browsing, etc.) — just start at 0.
    }

    applyPage(el, starts, restored);
    setPageStarts(starts);
    setTitles(heads);
    setIndex(restored);
    setReady(true);
  }, [fullKey]);

  function goTo(next: number) {
    const el = containerRef.current;
    if (!el || busyRef.current || next < 0 || next >= pageStarts.length || next === index) return;
    busyRef.current = true;
    const dir = next > index ? 1 : -1;

    el.style.transition = "opacity 160ms ease, transform 160ms ease";
    el.style.opacity = "0";
    el.style.transform = `translateX(${dir * -24}px)`;

    window.setTimeout(() => {
      applyPage(el, pageStarts, next);
      setIndex(next);
      try {
        window.localStorage.setItem(fullKey, String(next));
      } catch {
        // ignore
      }

      el.style.transition = "none";
      el.style.transform = `translateX(${dir * 24}px)`;
      void el.offsetHeight; // force reflow so the next transition actually animates
      el.style.transition = "opacity 220ms ease, transform 220ms ease";
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";

      el.scrollIntoView({ block: "start", behavior: "smooth" });
      window.setTimeout(() => {
        busyRef.current = false;
      }, 230);
    }, 160);
  }

  const total = pageStarts.length;

  return (
    <div>
      {ready && total > 1 && <PagerNav index={index} total={total} titles={titles} onGo={goTo} />}
      <div ref={containerRef} className="book-notes" style={{ willChange: "transform, opacity" }}>
        {children}
      </div>
      {ready && total > 1 && <PagerNav index={index} total={total} titles={titles} onGo={goTo} />}
    </div>
  );
}

function PagerNav({
  index,
  total,
  titles,
  onGo,
}: {
  index: number;
  total: number;
  titles: string[];
  onGo: (next: number) => void;
}) {
  return (
    <div className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
      <button
        onClick={() => onGo(index - 1)}
        disabled={index === 0}
        className="rounded-full bg-teal-600 px-3 py-1.5 font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Previous
      </button>
      <select
        value={index}
        onChange={(e) => onGo(Number(e.target.value))}
        aria-label="Jump to Chapter or Section"
        className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
      >
        {titles.map((t, i) => (
          <option key={i} value={i}>
            {`${i + 1}. ${t}`}
          </option>
        ))}
      </select>
      <button
        onClick={() => onGo(index + 1)}
        disabled={index === total - 1}
        className="rounded-full bg-teal-600 px-3 py-1.5 font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  );
}
