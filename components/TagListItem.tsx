import type { FC } from 'react';
import { Anchor } from './Anchor';
import pkg from '../package.json';
import { useTheme } from './ThemeContext';

export const TagListItem: FC<{ tag: string }> = ({ tag }) => (
  <Anchor
    aria-label={`Entries with ${pkg.config.blogTagSeparator}${tag} tag`}
    className={useTheme().tagListItem}
    href={`/${pkg.config.blogSlug}/${pkg.config.blogTagSlug}/${tag}`}
  >
    {pkg.config.blogTagSeparator}
    {tag}
  </Anchor>
);
