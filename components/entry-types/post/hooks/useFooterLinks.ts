import pkg from '../../../../package.json';
import { Post } from '../../../../types/Entry';

export function useFooterLinks(entry: Post) {
  const twitterLink =
    'https://twitter.com/intent/tweet?' +
    `text=${encodeURIComponent(entry.title)}` +
    `&url=${encodeURIComponent(entry.url)}` +
    `&hashtags=${entry.tags.join(',')}` +
    `&via=${pkg.author.username}`;

  const linkedInLink =
    'https://www.linkedin.com/sharing/share-offsite/?' +
    `url=${encodeURIComponent(entry.url)}`;

  const githubLink =
    `${pkg.repository.url}/blob/main/` +
    pkg.config.blogSlug +
    `/${entry.slug}.md`;

  return { twitterLink, linkedInLink, githubLink };
}
