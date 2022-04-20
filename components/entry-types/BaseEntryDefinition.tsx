import type { Entry, EntryDefinition } from '../../types/Entry';
import {
  getArray,
  getBoolean,
  getDate,
  getProperty,
  getString,
} from '../../utils/get';
import pkg from '../../package.json';

export const BaseEntryDefinition: EntryDefinition<
  Entry,
  { showTypeAsTag: boolean }
> = {
  parse(slug, data, _content, { showTypeAsTag } = { showTypeAsTag: false }) {
    const tags = getProperty(data, 'tags', getArray, getString);

    if (!tags.length && showTypeAsTag) {
      tags.push(getProperty(data, 'type', getString));
    }

    return {
      date: getProperty(data, 'date', getDate),
      draft: getProperty(data, 'draft', getBoolean),
      emoji: getProperty(data, 'emoji', getString),
      language: getProperty(data, 'language', getString),
      slug: getString(slug),
      tags,
      title: getProperty(data, 'title', getString),
      type: 'entry',
      url: `/${pkg.config.blogSlug}/${pkg.config.blogEntrySlug}/${slug}/`,
    };
  },
};
