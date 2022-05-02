import type { FC } from 'react';
import type { Entry } from '../types/Entry';
import { useTheme } from './ThemeContext';
import React from 'react';
import entryToComponent from '../utils/entryToComponent';

export const EntryList: FC<{ entryList: Entry[] }> = ({ entryList }) => (
  <div className={useTheme().entryList}>
    {entryList.map((entry) => {
      const Component = entryToComponent(entry, 'getEntryListItemComponent');
      return <Component key={entry.slug} entry={entry} />;
    })}
  </div>
);
