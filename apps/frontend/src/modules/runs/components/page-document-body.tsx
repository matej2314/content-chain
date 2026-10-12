import type { ReactNode } from 'react';

type MdBlock =
  | { readonly kind: 'h2'; readonly text: string }
  | { readonly kind: 'h3'; readonly text: string }
  | { readonly kind: 'p'; readonly text: string }
  | { readonly kind: 'ul'; readonly items: readonly string[] };

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

function parseMarkdownBlocks(source: string): readonly MdBlock[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: MdBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? '';
    if (line.trim() === '') {
      index += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ kind: 'h3', text: line.slice(4).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ kind: 'h2', text: line.slice(3).trim() });
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index] ?? '')) {
        items.push((lines[index] ?? '').replace(/^[-*]\s+/, '').trim());
        index += 1;
      }
      blocks.push({ kind: 'ul', items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const current = lines[index] ?? '';
      if (current.trim() === '') break;
      if (
        current.startsWith('## ') ||
        current.startsWith('### ') ||
        /^[-*]\s+/.test(current)
      ) {
        break;
      }
      paragraphLines.push(current);
      index += 1;
    }
    blocks.push({ kind: 'p', text: paragraphLines.join('\n') });
  }

  return blocks;
}

type PageDocumentBodyProps = {
  readonly body: string;
};

export function PageDocumentBody({ body }: PageDocumentBodyProps) {
  const blocks = parseMarkdownBlocks(body);

  return (
    <div className="flex flex-col gap-3 leading-relaxed">
      {blocks.map((block, index) => {
        if (block.kind === 'h2') {
          return (
            <h4 key={`h2-${index}`} className="pt-1 text-sm font-medium">
              {renderInline(block.text)}
            </h4>
          );
        }
        if (block.kind === 'h3') {
          return (
            <h5 key={`h3-${index}`} className="text-sm font-medium">
              {renderInline(block.text)}
            </h5>
          );
        }
        if (block.kind === 'ul') {
          return (
            <ul key={`ul-${index}`} className="list-disc space-y-1 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={`li-${index}-${itemIndex}`}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={`p-${index}`} className="whitespace-pre-wrap">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
