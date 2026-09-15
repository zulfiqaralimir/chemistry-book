interface DiagramProps {
  slug: string;
  src: string;
  alt: string;
}

export function Diagram({ slug, src, alt }: DiagramProps) {
  return (
    <figure className="my-6 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/topics/${slug}/diagrams/${src}`} alt={alt} className="mx-auto max-h-72 max-w-full" />
      <figcaption className="mt-3 text-center text-lg text-slate-500 dark:text-slate-400">{alt}</figcaption>
    </figure>
  );
}
