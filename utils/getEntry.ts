import fs from 'fs';
import grayMatter from 'gray-matter';
import { Entry } from '../types/Entry';
import pkg from '../package.json';
import { parseMarkdown } from './parseMarkdown';

type EntryData = Omit<Entry, 'content' | 'slug' | 'url'>;
type Checker = (v: any) => boolean;

const isDate: Checker = (v) => v && v instanceof Date;
const isBoolean: Checker = (v) => typeof v === 'boolean';
const isString: Checker = (v) => v && typeof v === 'string';
const isShape = (checkers: Record<string, Checker>) => (v: any) =>
  v &&
  typeof v === 'object' &&
  Object.entries(checkers).every(([key, check]) => check(v[key]));
const isArrayOf = (check: Checker) => (v: any) =>
  Array.isArray(v) && v.every(check);

const dataChecks: Record<keyof EntryData, Checker> = {
  draft: isBoolean,
  cover: isShape({ url: isString, alt: isString }),
  emoji: isString,
  language: isString,
  date: isDate,
  title: isString,
  mood: isString,
  summary: isString,
  tags: isArrayOf(isString),
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

  if (!content) {
    throw new Error(`Invalid entry "${slug}"`);
  }

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
