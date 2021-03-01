import { getEntryList } from './getEntryList';

export const getTagList = (): string[] =>
  getEntryList()
    .map((entry) => entry.tags)
    .reduce((a, b) => a.concat(b), [])
    .filter((tag, index, tags) => index === tags.indexOf(tag));
