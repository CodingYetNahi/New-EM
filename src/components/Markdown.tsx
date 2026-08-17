import { Fragment, type ReactNode } from 'react';

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2,-2)}</strong> : <Fragment key={index}>{part}</Fragment>);
}

export function Markdown({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/);
  return <div className="article-content">{blocks.map((block, index) => {
    const value = block.trim();
    if (value.startsWith('### ')) return <h3 key={index}>{inline(value.slice(4))}</h3>;
    if (value.startsWith('## ')) return <h2 key={index}>{inline(value.slice(3))}</h2>;
    if (value.startsWith('# ')) return <h2 key={index}>{inline(value.slice(2))}</h2>;
    if (value.split('\n').every((line) => line.startsWith('- '))) return <ul key={index}>{value.split('\n').map((line) => <li key={line}>{inline(line.slice(2))}</li>)}</ul>;
    return <p key={index}>{inline(value.replace(/\n/g, ' '))}</p>;
  })}</div>;
}
