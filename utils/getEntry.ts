import fs from 'fs';
import grayMatter from 'gray-matter';
import { Entry } from '../types/Entry';
import pkg from '../package.json';
import { parseMarkdown } from './parseMarkdown';

type EntryData = Omit<Entry, 'content' | 'slug' | 'url'>;

const dataChecks: Record<keyof EntryData, (v: any) => boolean> = {
  draft: (v: any) => typeof v === 'boolean',
  emoji: (v: any) => v && typeof v === 'string',
  language: (v: any) => v && typeof v === 'string',
  date: (v: any) => v && v instanceof Date,
  title: (v: any) => v && typeof v === 'string',
  mood: (v: any) => v && typeof v === 'string',
  summary: (v: any) => v && typeof v === 'string',
  tags: (v: any) =>
    Array.isArray(v) && v.every((p) => p && typeof p === 'string'),
};

const cachedEntries = new Map<string, Entry>();

export const getEntry = (slug: string) => {
  let cachedEntry = cachedEntries.get(slug);
  if (cachedEntry) return cachedEntry;

  const rawContent = fs.readFileSync(
    `./${pkg.config.blogSlug}/${slug}.md`,
    'utf-8',
  );
  const { data, content } = grayMatter(rawContent) as unknown as {
    data: EntryData;
    content: string;
  };

  Object.entries(dataChecks).forEach(([key, check]) => {
    // @ts-ignore
    if (!check(data[key])) {
      console.warn(
        `warn  - Invalid or missing property ${key} in entry ${slug}`,
      );
    }
  });

  Object.keys(data)
    .filter((key) => !(key in dataChecks))
    .forEach((key) => {
      throw new Error(`Unknown property "${key}" in ${slug}`);
    });

  cachedEntry = {
    ...data,
    slug,
    content: parseMarkdown(content),
    date: new Date(data.date).getTime(),
    url: `https://${pkg.name}/${pkg.config.blogSlug}/${pkg.config.blogEntrySlug}/${slug}/`,
  };

  cachedEntries.set(slug, cachedEntry);
  return cachedEntry;
};
