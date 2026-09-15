import fs from "node:fs";
import path from "node:path";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string; file: string } }
) {
  const safeSlug = path.basename(params.slug);
  const safeFile = path.basename(params.file);

  if (!safeFile.endsWith(".svg")) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "content",
    "topics",
    safeSlug,
    "diagrams",
    safeFile
  );

  if (!fs.existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  const svg = fs.readFileSync(filePath, "utf-8");

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
