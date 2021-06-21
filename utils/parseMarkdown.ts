import marked from 'marked';

export const parseMarkdown = (markdown: string) =>
  marked(markdown, { gfm: true });
