import type { BlogPost } from '../types/content';

const files = import.meta.glob('../../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function stringArray(value: unknown): string[] { return Array.isArray(value) ? value.map(String) : []; }

function parseFrontMatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match?.[1]) return { data: {}, content: raw };
  const data: Record<string, unknown> = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':'); if (separator < 1) continue;
    const key = line.slice(0, separator).trim(); const value = line.slice(separator + 1).trim();
    if (value === 'true' || value === 'false') data[key] = value === 'true';
    else if (value.startsWith('[') && value.endsWith(']')) data[key] = value.slice(1, -1).split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
    else data[key] = value.replace(/^['"]|['"]$/g, '');
  }
  return { data, content: match[2] ?? '' };
}

export const blogPosts: BlogPost[] = Object.values(files).map((raw) => {
  const { data, content } = parseFrontMatter(raw);
  return {
    title:String(data.title ?? ''), slug:String(data.slug ?? ''), description:String(data.description ?? ''),
    date:String(data.date ?? ''), updated:data.updated ? String(data.updated) : undefined, author:String(data.author ?? 'ExpressMock Editorial'),
    category:String(data.category ?? 'Preparation'), tags:stringArray(data.tags), featuredImage:data.featuredImage ? String(data.featuredImage) : undefined,
    published:data.published === true, featured:data.featured === true, body:content.trim(),
  };
}).filter((post) => post.published && post.slug).sort((a,b) => b.date.localeCompare(a.date));

export const blogCategories = ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))];

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-IN', { day:'numeric', month:'long', year:'numeric', timeZone:'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
