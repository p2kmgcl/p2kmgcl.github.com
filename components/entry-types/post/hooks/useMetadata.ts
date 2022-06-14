import { Post } from '../../../../types/Entry';
import pkg from '../../../../package.json';
import { useMemo } from 'react';

export function useMetadata(entry: Post) {
  return useMemo(() => {
    const date = new Date(entry.date).toISOString();
    const ogTags = entry.tags.map((tag): [string, string] => ['og:tag', tag]);

    const ogCover = entry.cover
      ? [
          ['og:image', `https://${pkg.name}${entry.cover.url}`],
          ['og:image:alt', entry.cover.alt],
        ]
      : [];

    const metaTags = [
      ['twitter:card', 'summary'],
      ['twitter:title', entry.title],
      ['twitter:description', entry.summary || ''],
      ['twitter:site', `@${pkg.author.username}`],
      ['twitter:creator', `@${pkg.author.username}`],

      ['og:type', 'article'],
      ['og:locale', entry.language],
      ['og:url', entry.url],
      ['og:title', entry.title],
      ['og:description', entry.summary || ''],
      ['og:created_time', date],
      ['og:published_time', date],
      ['og:modified_time', date],
      ['og:article:author', `https://${pkg.name}`],
      ['og:article:author:first_name', pkg.author.firstName],
      ['og:article:author:last_name', pkg.author.familyName],
      ['og:article:author:username', pkg.author.username],
      ...ogTags,
      ...ogCover,

      ['title', entry.title],
      ['description', entry.summary || ''],
      ['author', pkg.author.name],
    ] as const;

    const metaScript = {
      '@context': 'http://schema.org',
      '@type': 'NewsArticle',
      image: entry.cover ? [entry.cover.url] : [],
      url: entry.url,
      dateCreated: date,
      datePublished: date,
      dateModified: date,
      headline: entry.title,
      name: entry.title,
      description: entry.summary || '',
      identifier: entry.slug,
      author: {
        '@type': 'Person',
        name: pkg.author.name,
        url: `https://${pkg.name}`,
      },
      creator: [pkg.author.name],
    };

    return [metaTags, JSON.stringify(metaScript)] as const;
  }, [entry]);
}
