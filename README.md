# Chemistry Book

Interactive chemistry, taught chapter by chapter and cross-linked to Physics,
Biology, Mathematics, Environmental Science, Industry, and Everyday Life —
from IGCSE through A-Level.

Built with Next.js 14 (App Router) + TypeScript + Tailwind, MDX content
(`remark-math`/`rehype-katex` for equations, `remark-gfm` for tables,
`rehype-pretty-code` for syntax highlighting), and a reusable "topic template"
— each topic gets book-style paginated notes, a slide deck, diagrams,
cross-subject applications, and tiered worksheets with hideable answers.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content structure

Each topic lives under `content/topics/<slug>/`:

```
meta.json               # title, summary, levels, ordering
notes.mdx                # book-style chapter notes (paginated via ChapterPager)
slides.json              # slide deck backing the Slides tab
diagrams/*.svg           # diagrams, served via app/topics/[slug]/diagrams/[file]
applications/*.mdx       # cross-subject links: physics, biology, mathematics,
                          # environmental-science, industry, everyday-life
worksheets/*.mdx         # foundation / extended / advanced tiers + answers.mdx
```

`atomic-structure` is the first topic, built end-to-end as the template for
every topic that follows.

## Deploy on Vercel

```bash
vercel
```
