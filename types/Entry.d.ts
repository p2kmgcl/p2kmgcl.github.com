import type { FC, LazyExoticComponent } from 'react';

export interface EntryDefinition<
  T extends Entry,
  R extends Record<string, any> = {},
> {
  parse: (
    slug: string,
    data: Record<string, unknown>,
    content: string | undefined,
    options: R = {},
  ) => T;

  getEntryListItemComponent?: () => Promise<{ default: FC<{ entry: T }> }>;
  getEntryComponent?: () => Promise<{ default: FC<{ entry: T }> }>;
}

export interface Entry {
  type: string;
  draft: boolean;
  language: string;
  date: number;
  title: string;
  emoji: string;
  tags: string[];
  slug: string;
  url: string;
}

export interface CheatSheet extends Entry {
  type: 'cheat-sheet';
  content: string;
}

export interface Post extends Entry {
  type: 'post';
  mood: string;
  content: string;
  summary: string;
  cover?: {
    url: string;
    alt: string;
    origin?: string;
  };
}

export interface Link extends Entry {
  type: 'link';
  origin: string;
  summary: string;
}
