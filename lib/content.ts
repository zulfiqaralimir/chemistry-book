import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "topics");

export type Level = "IGCSE" | "O-Level" | "A-Level" | "Advanced";

export interface TopicMeta {
  slug: string;
  title: string;
  summary: string;
  levels: Level[];
  order: number;
  heroImage?: string;
}

export interface ApplicationLayer {
  key: "physics" | "biology" | "mathematics" | "environmental-science" | "industry" | "everyday-life";
  label: string;
}

export interface WorksheetTier {
  key: "foundation" | "extended" | "advanced";
  label: string;
}

export const APPLICATION_LAYERS: ApplicationLayer[] = [
  { key: "physics", label: "Physics" },
  { key: "biology", label: "Biology" },
  { key: "mathematics", label: "Mathematics" },
  { key: "environmental-science", label: "Environmental Science" },
  { key: "industry", label: "Industry" },
  { key: "everyday-life", label: "Everyday Life" },
];

export const WORKSHEET_TIERS: WorksheetTier[] = [
  { key: "foundation", label: "Foundation" },
  { key: "extended", label: "Extended" },
  { key: "advanced", label: "Advanced" },
];

export function getTopicSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((entry) => fs.statSync(path.join(CONTENT_DIR, entry)).isDirectory());
}

export function getTopicMeta(slug: string): TopicMeta {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, slug, "meta.json"), "utf-8");
  return JSON.parse(raw) as TopicMeta;
}

export function getAllTopicMeta(): TopicMeta[] {
  return getTopicSlugs()
    .map(getTopicMeta)
    .sort((a, b) => a.order - b.order);
}

export function getDiagramFiles(slug: string): string[] {
  const dir = path.join(CONTENT_DIR, slug, "diagrams");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".svg"))
    .sort();
}

export function topicHasApplication(slug: string, key: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, slug, "applications", `${key}.mdx`));
}

export function topicHasWorksheetTier(slug: string, key: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, slug, "worksheets", `${key}.mdx`));
}

export function topicHasAnswers(slug: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, slug, "worksheets", "answers.mdx"));
}
