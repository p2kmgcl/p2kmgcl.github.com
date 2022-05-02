import type { EntryDefinition, Post } from '../../../types/Entry';
import { getProperty, getString, getValue } from '../../../utils/get';
import { BaseEntryDefinition } from '../BaseEntryDefinition';
import marked from 'marked';

export const PostDefinition: EntryDefinition<Post> = {
  parse(slug, data, content) {
    return {
      ...BaseEntryDefinition.parse(slug, data, content, {
        showTypeAsTag: true,
      }),

      summary: getProperty(data, 'summary', getString),
      content: marked(getString(content), { gfm: true }),
      type: getProperty(data, 'type', getValue, 'post' as const),
      mood: getProperty(data, 'mood', getString),
    };
  },

  getEntryListItemComponent: () => import('./PostEntryListItem'),
  getEntryComponent: () => import('./PostEntry'),
};
