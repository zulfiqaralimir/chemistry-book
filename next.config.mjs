import createMDX from "@next/mdx";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
// Side-effect import: registers the \ce{} macro (mhchem) on KaTeX so
// notes.mdx can write real chemical equations, e.g. $\ce{2H2 + O2 -> 2H2O}$.
import "katex/contrib/mhchem";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeKatex,
      [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
    ],
  },
});

export default withMDX(nextConfig);
