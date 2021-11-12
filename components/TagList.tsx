import type { FC } from 'react';
import { Nav } from './HTMLElements';
import { TagListItem } from './TagListItem';

export const TagList: FC<{ tags: string[] }> = ({ tags }) => (
  <Nav aria-label="Entry tags" className="tag-list">
    {tags.map((tag) => (
      <TagListItem key={tag} tag={tag} />
    ))}
  </Nav>
);
