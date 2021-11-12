import type { FC } from 'react';
import type { Entry, EntryDefinition } from '../types/Entry';
import { getEntryDefinition } from '../utils/getEntryDefinition';

export const EntryList: FC<{ entryList: Entry[] }> = ({ entryList }) => (
  <div className="entry-list">
    {entryList.map((entry) => {
      try {
        const definition = getEntryDefinition(
          entry.type,
        ) as EntryDefinition<any>;

        if (!definition.EntryListItem) {
          return null;
        }

        return <definition.EntryListItem key={entry.slug} entry={entry} />;
      } catch (error) {
        return null;
      }
    })}
  </div>
);
