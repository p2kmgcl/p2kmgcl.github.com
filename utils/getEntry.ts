import fs from 'fs';
import grayMatter from 'gray-matter';
import pkg from '../package.json';
import { getEntryDefinition } from './getEntryDefinition';

export const getEntry = (slug: string) => {
  const rawContent = fs.readFileSync(
    `./${pkg.config.blogSlug}/${slug}.md`,
    'utf-8',
  );
  const { data, content } = grayMatter(rawContent) as unknown as {
    data: Record<string, unknown>;
    content: string | undefined;
  };

  try {
    const entryDefinition = getEntryDefinition(data.type);
    return entryDefinition.parse(slug, data, content);
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(`Invalid entry "${slug}": ${error.message}`);
    } else {
      throw new Error(`Invalid entry "${slug}"`);
    }
  }
};
