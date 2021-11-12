import type { Entry, EntryDefinition } from '../../types/Entry';
import {
  getArray,
  getBoolean,
  getDate,
  getProperty,
  getString,
} from '../../utils/get';
import pkg from '../../package.json';

export const BaseEntryDefinition: EntryDefinition<Entry> = {
  parse(slug, data) {
    return {
      date: getProperty(data, 'date', getDate),
      draft: getProperty(data, 'draft', getBoolean),
      emoji: getProperty(data, 'emoji', getString),
      language: getProperty(data, 'language', getString),
      slug: getString(slug),
      summary: getProperty(data, 'summary', getString),
      tags: [
        getProperty(data, 'type', getString),
        ...getProperty(data, 'tags', getArray, getString),
      ],
      title: getProperty(data, 'title', getString),
      type: 'entry',
      url: `/${pkg.config.blogSlug}/${pkg.config.blogEntrySlug}/${slug}/`,
    };
  },
};
