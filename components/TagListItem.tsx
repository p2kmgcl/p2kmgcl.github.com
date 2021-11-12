import type { FC } from 'react';
import { Anchor } from './Anchor';
import pkg from '../package.json';

export const TagListItem: FC<{ tag: string }> = ({ tag }) => (
  <Anchor
    aria-label={`Entries with ${pkg.config.blogTagSeparator}${tag} tag`}
    className="tag-list-item"
    href={`/${pkg.config.blogSlug}/${pkg.config.blogTagSlug}/${tag}`}
  >
    {pkg.config.blogTagSeparator}
    {tag}
  </Anchor>
);
