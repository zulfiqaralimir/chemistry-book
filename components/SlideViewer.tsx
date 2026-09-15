"use client";

import { useEffect, useState } from "react";
import type { Slide } from "@/lib/slides";

export function SlideViewer({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  if (!slide) return null;

  return (
    <div>
      <div className="mx-auto flex min-h-[360px] max-w-2xl flex-col justify-center rounded-xl border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-500">
          Slide {index + 1} of {slides.length}
        </p>
        <h3 className="mb-5 text-2xl font-bold text-slate-900 dark:text-slate-100">
          {slide.title}
        </h3>
        {slide.formula && (
          <p className="mb-5 rounded-md bg-teal-50 px-4 py-3 text-center font-mono text-lg text-teal-800 dark:bg-teal-950/40 dark:text-teal-300">
            {slide.formula}
          </p>
        )}
        {slide.bullets && (
          <ul className="ml-5 list-disc space-y-2 text-slate-700 dark:text-slate-300">
            {slide.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
        {slide.note && (
          <p className="mt-5 text-sm italic text-slate-500 dark:text-slate-400">{slide.note}</p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
        >
          ← Previous
        </button>
        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-teal-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setIndex((i) => Math.min(i + 1, slides.length - 1))}
          disabled={index === slides.length - 1}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
