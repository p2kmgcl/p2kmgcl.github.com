import type { FC } from 'react';
import { Li, Nav, Ul } from './HTMLElements';
import { TagListItem } from './TagListItem';
import { useTheme } from './ThemeContext';

export const TagList: FC<{ tags: string[] }> = ({ tags }) => (
  <Nav aria-label="Entry tags" className={useTheme().tagList}>
    <Ul>
      {tags.map((tag) => (
        <Li key={tag}>
          <TagListItem tag={tag} />
        </Li>
      ))}
    </Ul>
  </Nav>
);
