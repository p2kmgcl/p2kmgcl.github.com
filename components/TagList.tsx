import { FC } from 'react';
import { TagListItem } from './TagListItem';
import { useTheme } from '../styles/ThemeContext';

export const TagList: FC<{ tags: string[] }> = ({ tags }) => {
  const theme = useTheme();

  return (
    <nav className={theme.tagList}>
      {tags.map((tag) => (
        <TagListItem key={tag} tag={tag} />
      ))}
    </nav>
  );
};
