import Link from "next/link";
import { getAllTopicMeta } from "@/lib/content";

export default function HomePage() {
  const topics = getAllTopicMeta();

  return (
    <div className="mx-auto max-w-4xl px-12 py-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-500">
        Chemistry Book
      </p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Chemistry, Chapter by Chapter
      </h1>
      <p className="mb-12 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        Interactive chemistry, taught in plain language and connected to
        Physics, Biology, Mathematics, Environmental Science, Industry, and
        Everyday Life — from IGCSE through A-Level.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-2 flex flex-wrap gap-1.5">
              {topic.levels.map((level) => (
                <span
                  key={level}
                  className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                >
                  {level}
                </span>
              ))}
            </div>
            <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {topic.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{topic.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
