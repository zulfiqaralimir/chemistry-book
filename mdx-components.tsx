import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100" {...props} />
    ),
    h2: (props) => (
      <h2 className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100" {...props} />
    ),
    p: (props) => (
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300" {...props} />
    ),
    ul: (props) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-slate-700 dark:text-slate-300" {...props} />
    ),
    ol: (props) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-slate-700 dark:text-slate-300" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="mb-4 border-l-4 border-indigo-400 bg-indigo-50 py-2 pl-4 italic text-slate-700 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-slate-300"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700 dark:bg-slate-800 dark:text-indigo-300"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mb-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900"
        {...props}
      />
    ),
    table: (props) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th className="border-b border-slate-300 px-3 py-2 font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-100" {...props} />
    ),
    td: (props) => (
      <td className="border-b border-slate-100 px-3 py-2 text-slate-700 dark:border-slate-800 dark:text-slate-300" {...props} />
    ),
    hr: (props) => <hr className="my-8 border-slate-200 dark:border-slate-800" {...props} />,
    a: (props) => (
      <a className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-500 dark:text-indigo-400" {...props} />
    ),
    strong: (props) => <strong className="font-semibold text-slate-900 dark:text-slate-100" {...props} />,
    mark: (props) => (
      <mark
        className="rounded bg-amber-200 px-1 py-0.5 text-slate-900 dark:bg-amber-500/30 dark:text-amber-100"
        {...props}
      />
    ),
    ...components,
  };
}
