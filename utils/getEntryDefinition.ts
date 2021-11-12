import { LinkDefinition } from '../components/entry-types/LinkDefinition';
import { PostDefinition } from '../components/entry-types/PostDefinition';

export function getEntryDefinition(entryType: unknown) {
  if (entryType === 'post') {
    return PostDefinition;
  } else if (entryType === 'link') {
    return LinkDefinition;
  }

  throw new Error(`Invalid entry type "${entryType}"`);
}
