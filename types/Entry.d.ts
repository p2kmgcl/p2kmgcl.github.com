export interface Entry {
  content: string;
  draft: boolean;
  cover: {
    url: string;
    alt: string;
    origin?: string;
  };
  language: string;
  date: number;
  title: string;
  mood: string;
  emoji: string;
  tags: string[];
  summary: string;
  slug: string;
  url: string;
}
