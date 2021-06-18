import { FC } from 'react';
import { Anchor } from './Anchor';
import { useTheme } from '../styles/ThemeContext';
import { classNames } from '../utils/classNames';
import pkg from '../package.json';

export const TagListItem: FC<{ tag: string }> = ({ tag }) => {
  const theme = useTheme();

  return (
    <Anchor
      className={classNames(theme.tagListItem)}
      href={`/${pkg.config.blogSlug}/${pkg.config.blogTagSlug}/${tag}`}
    >
      {pkg.config.blogTagSeparator}
      {tag}
    </Anchor>
  );
};
