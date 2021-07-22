import { readFileSync } from 'fs';
import glob from 'glob';
import pkg from '../package.json';
import { Snippet } from '../types/Snippet';

const BASE_PATH = `./public/${pkg.config.snippetListSlug}/`;

export const getSnippetList = (): Snippet[] =>
  glob.sync(`${BASE_PATH}**/*`).map((path) => {
    return {
      path: path.replace(BASE_PATH, '').split('/'),
      content: readFileSync(path, 'utf-8'),
    };
  });
