import type { EntryDefinition, Post } from '../../../types/Entry';
import { getProperty, getString, getValue } from '../../../utils/get';
import { BaseEntryDefinition } from '../BaseEntryDefinition';
import { marked } from 'marked';

export const PostDefinition: EntryDefinition<Post> = {
  parse(slug, data, content) {
    let cover: Post['cover'] = undefined;

    if (data.cover && typeof data.cover === 'object') {
      cover = {
        url: getProperty(data.cover, 'url', getString),
        alt: getProperty(data.cover, 'alt', getString),
      };

      if ('origin' in data.cover) {
        cover.origin = getProperty(data.cover, 'origin', getString);
      }
    }

    const post: Post = {
      ...BaseEntryDefinition.parse(slug, data, content, {
        showTypeAsTag: true,
      }),

      summary: getProperty(data, 'summary', getString),
      content: marked.parse(getString(content), { gfm: true }),
      type: getProperty(data, 'type', getValue, 'post' as const),
      mood: getProperty(data, 'mood', getString),
    };

    if (cover) {
      post.cover = cover;
    }

    return post;
  },

  getEntryListItemComponent: () => import('./PostEntryListItem'),
  getEntryComponent: () => import('./PostEntry'),
};
