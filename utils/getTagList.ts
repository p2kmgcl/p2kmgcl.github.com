import { Entry } from '../types/Entry';

export const getTagList = (entryList: Entry[]): string[] =>
  entryList
    .map((entry) => entry.tags)
    .reduce((a, b) => a.concat(b), [])
    .filter((tag, index, tags) => index === tags.indexOf(tag));
