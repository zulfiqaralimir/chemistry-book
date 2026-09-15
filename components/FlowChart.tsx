function wrapLabel(label: string): string[] {
  if (label.length <= 20) return [label];
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > 20 && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function FlowChart({ steps }: { steps: string[] }) {
  const boxWidth = 280;
  const gap = 40;
  const lineHeight = 24;
  const wrapped = steps.map(wrapLabel);
  const heights = wrapped.map((lines) => Math.max(60, lines.length * lineHeight + 30));
  const tops: number[] = [];
  let cursor = 8;
  heights.forEach((h) => {
    tops.push(cursor);
    cursor += h + gap;
  });
  const totalHeight = cursor - gap + 8;
  const width = boxWidth + 40;
  const cx = width / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${totalHeight}`}
      className="mx-auto my-4 block max-w-sm"
      role="img"
      aria-label={steps.join(" then ")}
    >
      <defs>
        <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#64748b" />
        </marker>
      </defs>
      {tops.map((top, i) =>
        i < tops.length - 1 ? (
          <line
            key={`arrow-${i}`}
            x1={cx}
            y1={top + heights[i]}
            x2={cx}
            y2={tops[i + 1]}
            stroke="#64748b"
            strokeWidth={2}
            markerEnd="url(#flowArrow)"
          />
        ) : null
      )}
      {tops.map((top, i) => (
        <g key={`box-${i}`}>
          <rect
            x={20}
            y={top}
            width={boxWidth}
            height={heights[i]}
            rx={10}
            fill="#ccfbf1"
            stroke="#0d9488"
            strokeWidth={1.5}
          />
          {wrapped[i].map((line, li) => (
            <text
              key={li}
              x={cx}
              y={top + heights[i] / 2 + (li - (wrapped[i].length - 1) / 2) * lineHeight + 5}
              textAnchor="middle"
              fontSize={18}
              fontWeight={800}
              fill="#1e293b"
              fontFamily="system-ui, sans-serif"
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}
