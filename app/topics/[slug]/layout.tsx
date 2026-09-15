import type { ReactNode } from "react";
import { getAllTopicMeta } from "@/lib/content";
import { TopicNavProvider } from "@/components/TopicNavContext";
import { Sidebar } from "@/components/Sidebar";

export default function TopicLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const topics = getAllTopicMeta();

  return (
    <TopicNavProvider defaultSection="notes">
      <div className="bg-white dark:bg-slate-950">
        <Sidebar topics={topics} activeSlug={params.slug} />
        <main className="h-screen overflow-y-auto pt-14 transition-[margin-left] duration-300 md:ml-[var(--cb-sidebar-w,17rem)] md:pt-0">
          {children}
        </main>
      </div>
    </TopicNavProvider>
  );
}
