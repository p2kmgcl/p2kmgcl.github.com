import glob from 'glob';
import type { Entry } from '../types/Entry';
import { getEntry } from './getEntry';
import { basename } from 'path';
import pkg from '../package.json';

export const getEntryList = (tag?: string): Entry[] => {
  return glob
    .sync(`./${pkg.config.blogSlug}/**/*.md`)
    .map((fileName) => getEntry(basename(fileName, '.md')))
    .filter((entry) => process.env.NODE_ENV === 'development' || !entry.draft)
    .filter((entry) => !tag || entry.tags.includes(tag))
    .sort((a, b) => b.date - a.date);
};
