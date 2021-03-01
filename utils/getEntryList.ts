import glob from 'glob';
import { Entry } from '../types/Entry';
import { getEntry } from './getEntry';
import { basename } from 'path';

export const getEntryList = (tag?: string): Entry[] =>
  glob
    .sync(`./tesera/**/*.md`)
    .map((fileName) => getEntry(basename(fileName, '.md')))
    .filter((entry) => process.env.NODE_ENV === 'development' || !entry.draft)
    .filter((entry) => !tag || entry.tags.includes(tag))
    .sort((a, b) => b.date - a.date);
