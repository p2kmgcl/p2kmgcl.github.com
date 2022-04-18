import type { FC } from 'react';
import { Nav } from './HTMLElements';
import { TagListItem } from './TagListItem';
import { useTheme } from './ThemeContext';

export const TagList: FC<{ tags: string[] }> = ({ tags }) => (
  <Nav aria-label="Entry tags" className={useTheme().tagList}>
    {tags.map((tag) => (
      <TagListItem key={tag} tag={tag} />
    ))}
  </Nav>
);
