import { notFound } from "next/navigation";
import {
  APPLICATION_LAYERS,
  WORKSHEET_TIERS,
  getDiagramFiles,
  getTopicMeta,
  getTopicSlugs,
} from "@/lib/content";
import type { SlideDeck } from "@/lib/slides";
import { Diagram } from "@/components/Diagram";
import { TabbedSections } from "@/components/TabbedSections";
import { ActiveSectionContent } from "@/components/ActiveSectionContent";
import { SlideViewer } from "@/components/SlideViewer";
import { AnswerToggle } from "@/components/AnswerToggle";
import { ChapterPager } from "@/components/ChapterPager";
import { FlowChart } from "@/components/FlowChart";

export function generateStaticParams() {
  return getTopicSlugs().map((slug) => ({ slug }));
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!getTopicSlugs().includes(slug)) {
    notFound();
  }

  const meta = getTopicMeta(slug);
  const diagramComponents = {
    Diagram: (props: { src: string; alt: string }) => <Diagram slug={slug} {...props} />,
    Flow: (props: { steps: string[] }) => <FlowChart {...props} />,
  };

  const NotesMDX = (await import(`@/content/topics/${slug}/notes.mdx`)).default;
  const slideDeck: SlideDeck = (await import(`@/content/topics/${slug}/slides.json`)).default;
  const diagrams = getDiagramFiles(slug);

  const applicationSections = await Promise.all(
    APPLICATION_LAYERS.map(async (layer) => {
      const Mod = (await import(`@/content/topics/${slug}/applications/${layer.key}.mdx`)).default;
      return { key: layer.key, label: layer.label, content: <Mod /> };
    })
  );

  const worksheetSections = await Promise.all(
    WORKSHEET_TIERS.map(async (tier) => {
      const Mod = (await import(`@/content/topics/${slug}/worksheets/${tier.key}.mdx`)).default;
      return { key: tier.key, label: tier.label, content: <Mod /> };
    })
  );

  const AnswersMDX = (await import(`@/content/topics/${slug}/worksheets/answers.mdx`)).default;

  const sections = [
    {
      key: "notes",
      label: "Notes",
      content: (
        <div className="mx-auto max-w-3xl">
          <ChapterPager storageKey={slug}>
            <NotesMDX components={diagramComponents} />
          </ChapterPager>
        </div>
      ),
    },
    {
      key: "slides",
      label: "Slides",
      content: <SlideViewer slides={slideDeck.slides} />,
    },
    {
      key: "diagrams",
      label: "Diagrams",
      content: (
        <div className="grid gap-6 sm:grid-cols-2">
          {diagrams.map((file) => (
            <Diagram key={file} slug={slug} src={file} alt={file.replace(/\.svg$/, "").replace(/-/g, " ")} />
          ))}
        </div>
      ),
    },
    {
      key: "applications",
      label: "Applications",
      content: <TabbedSections sections={applicationSections} size="sm" />,
    },
    {
      key: "worksheets",
      label: "Worksheets",
      content: (
        <div>
          <TabbedSections sections={worksheetSections} size="sm" />
          <AnswerToggle>
            <AnswersMDX />
          </AnswerToggle>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
      <div className="mb-2 flex flex-wrap gap-2">
        {meta.levels.map((level) => (
          <span
            key={level}
            className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-950/50 dark:text-teal-300"
          >
            {level}
          </span>
        ))}
      </div>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {meta.title}
      </h1>
      {meta.heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.heroImage}
          alt={`${meta.title} — ${meta.summary}`}
          className="mb-6 w-full rounded-xl border border-slate-200 shadow-sm dark:border-slate-800"
        />
      )}
      <p className="mb-10 max-w-3xl text-lg text-slate-600 dark:text-slate-400">{meta.summary}</p>

      <ActiveSectionContent sections={sections} />
    </div>
  );
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const meta = getTopicMeta(params.slug);
    return { title: `${meta.title} — Chemistry Book`, description: meta.summary };
  } catch {
    return {};
  }
}
