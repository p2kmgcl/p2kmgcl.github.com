import type { CheatSheet, EntryDefinition } from '../../../types/Entry';
import { getProperty, getString, getValue } from '../../../utils/get';
import { BaseEntryDefinition } from '../BaseEntryDefinition';
import marked from 'marked';

export const CheatSheetDefinition: EntryDefinition<CheatSheet> = {
  parse(slug, data, content) {
    return {
      ...BaseEntryDefinition.parse(slug, data, content),
      content: marked(getString(content), { gfm: true }),
      type: getProperty(data, 'type', getValue, 'cheat-sheet' as const),
    };
  },

  getEntryListItemComponent: () => import('./CheatSheetEntryListItem'),
  getEntryComponent: () => import('./CheatSheetEntry'),
};
