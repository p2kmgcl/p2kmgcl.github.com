import { CheatSheetDefinition } from '../components/entry-types/cheat-sheet/CheatSheetDefinition';
import { LinkDefinition } from '../components/entry-types/link/LinkDefinition';
import { PostDefinition } from '../components/entry-types/post/PostDefinition';

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
