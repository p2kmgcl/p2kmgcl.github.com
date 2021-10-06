import glob from 'glob';
import { basename } from 'path';
import pkg from '../package.json';
import { Link } from '../types/Link';
import { getLink } from './getLink';

export const getLinkList = (): Link[] =>
  glob
    .sync(`./${pkg.config.blogSlug}/**/*.json`)
    .map((fileName) => getLink(basename(fileName, '.json')))
    .sort((a, b) => b.date - a.date);
