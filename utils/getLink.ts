import fs from 'fs';
import pkg from '../package.json';
import { Link } from '../types/Link';

type Checker = (v: any) => boolean;
const isDate: Checker = (v) => isString(v) && !isNaN(new Date(v).getTime());
const isString: Checker = (v) => v && typeof v === 'string';

const REQUIRED_PROPERTIES: Array<keyof Link> = [
  'emoji',
  'language',
  'date',
  'title',
  'url',
];

const dataChecks: Record<keyof Omit<Link, 'slug'>, Checker> = {
  emoji: isString,
  language: isString,
  date: isDate,
  title: isString,
  summary: isString,
  url: isString,
};

export const getLink = (slug: string) => {
  const rawLink = JSON.parse(
    fs.readFileSync(`./${pkg.config.blogSlug}/${slug}.json`, 'utf-8'),
  ) as Record<string, any>;

  Object.entries(dataChecks).forEach(([key, check]) => {
    if (!check(rawLink[key])) {
      if (REQUIRED_PROPERTIES.includes(key as keyof Link)) {
        throw new Error(
          `error  - Invalid or missing required property ${key} in entry ${slug}`,
        );
      } else {
        console.warn(
          `warn  - Invalid or missing optional property ${key} in entry ${slug}`,
        );
      }
    }
  });

  Object.keys(rawLink)
    .filter((key) => !(key in dataChecks))
    .forEach((key) => {
      throw new Error(`Unknown property "${key}" in ${slug}`);
    });

  return {
    ...rawLink,
    date: new Date(rawLink.date).getTime(),
    slug,
  } as Link;
};
