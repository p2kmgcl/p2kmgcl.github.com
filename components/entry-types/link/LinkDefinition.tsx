import type { EntryDefinition, Link } from '../../../types/Entry';
import { getProperty, getString, getValue } from '../../../utils/get';
import { BaseEntryDefinition } from '../BaseEntryDefinition';

export const LinkDefinition: EntryDefinition<Link> = {
  parse(slug, data, content) {
    return {
      ...BaseEntryDefinition.parse(slug, data, content),
      summary: getProperty(data, 'summary', getString),
      type: getProperty(data, 'type', getValue, 'link' as const),
      origin: getProperty(data, 'origin', getString),
      url: getProperty(data, 'origin', getString),
    };
  },

  getEntryListItemComponent: () => import('./LinkEntryListItem'),
};
