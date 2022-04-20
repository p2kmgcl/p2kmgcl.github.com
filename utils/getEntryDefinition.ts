import { CheatSheetDefinition } from '../components/entry-types/CheatSheetDefinition';
import { LinkDefinition } from '../components/entry-types/LinkDefinition';
import { PostDefinition } from '../components/entry-types/PostDefinition';

export function getEntryDefinition(entryType: unknown) {
  if (entryType === 'post') {
    return PostDefinition;
  } else if (entryType === 'link') {
    return LinkDefinition;
  } else if (entryType === 'cheat-sheet') {
    return CheatSheetDefinition;
  }

  throw new Error(`Invalid entry type "${entryType}"`);
}
