import type { FC } from 'react';

export interface EntryDefinition<T extends Entry> {
  parse: (
    slug: string,
    data: Record<string, unknown>,
    content: string | undefined,
  ) => T;
  EntryListItem?: FC<{ entry: T }>;
  Entry?: FC<{ entry: T }>;
}

export interface Entry {
  type: string;
  draft: boolean;
  language: string;
  date: number;
  title: string;
  emoji: string;
  tags: string[];
  summary: string;
  slug: string;
  url: string;
}

export interface Post extends Entry {
  type: 'post';
  mood: string;
  content: string;
  cover?: {
    url: string;
    alt: string;
    origin?: string;
  };
}

export interface Link extends Entry {
  type: 'link';
  origin: string;
}
