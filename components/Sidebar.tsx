"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TopicMeta } from "@/lib/content";

export function Sidebar({ topics, activeSlug }: { topics: TopicMeta[]; activeSlug: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cb-sidebar-open");
    if (stored !== null) setDesktopOpen(stored === "1");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("cb-sidebar-open", desktopOpen ? "1" : "0");
  }, [desktopOpen, hydrated]);

  useEffect(() => {
    document.documentElement.style.setProperty("--cb-sidebar-w", desktopOpen ? "17rem" : "0rem");
  }, [desktopOpen]);

  return (
    <>
      <header className="no-print fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-900">
        <Link href="/" className="text-lg font-black text-slate-900 dark:text-slate-100">
          Chemistry<span className="text-teal-600 dark:text-teal-400">Book</span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <button
        onClick={() => setDesktopOpen((v) => !v)}
        aria-label={desktopOpen ? "Hide sidebar" : "Show sidebar"}
        title={desktopOpen ? "Hide sidebar" : "Show sidebar"}
        className={`no-print fixed top-4 z-50 hidden h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:border-slate-300 hover:text-slate-900 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-100 ${
          desktopOpen ? "md:left-[16.25rem]" : "md:left-3"
        }`}
      >
        {desktopOpen ? "‹" : "›"}
      </button>

      <aside
        className={`fixed bottom-0 left-0 top-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${desktopOpen ? "md:translate-x-0" : "md:-translate-x-full"}`}
      >
        <div className="border-b border-slate-200 p-6 dark:border-slate-800">
          <Link href="/" className="block">
            <div className="text-xl font-black text-slate-900 dark:text-slate-100">
              Chemistry<span className="text-teal-600 dark:text-teal-400">Book</span>
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Chapter by chapter</div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-6 pb-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Topics
          </div>
          {topics.map((topic) => {
            const isActiveTopic = topic.slug === activeSlug;
            return (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-2 text-sm font-medium transition-colors ${
                  isActiveTopic
                    ? "text-teal-700 dark:text-teal-300"
                    : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                }`}
              >
                {topic.title}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="text-center text-xs text-slate-400 dark:text-slate-500">
            IGCSE · O-Level · A-Level
          </div>
        </div>
      </aside>
    </>
  );
}
