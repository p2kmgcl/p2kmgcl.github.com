import glob from 'glob';
import path from 'path';
import fs from 'fs';
import jsdom from 'jsdom';
import pkg from './package.json';

const BASE_PATH = 'build/app';
const BUILD_DATE = new Date().toISOString();
const TITLE_SUFFIX = `${pkg.config.titleSeparator}${pkg.author.name}`;

const BLOG_ENTRY_REGEXP = new RegExp(
  `^${BASE_PATH}/${pkg.config.blogSlug}/${pkg.config.blogEntrySlug}/[^/]+/index.html$`,
);

const BLOG_TAG_REGEXP = new RegExp(
  `^${BASE_PATH}/${pkg.config.blogSlug}/${pkg.config.blogTagSlug}/[^/]+/index.html$`,
);

const pageList = glob
  .sync(`${BASE_PATH}/**/*.html`)
  .filter(
    (filePath) =>
      !filePath.endsWith('/404.html') &&
      !BLOG_ENTRY_REGEXP.test(filePath) &&
      !BLOG_TAG_REGEXP.test(filePath),
  )
  .map((filePath) => {
    const content = new jsdom.JSDOM(fs.readFileSync(filePath, 'utf-8'));
    const title = content.window.document.title;

    const description = Array.from<HTMLMetaElement>(
      content.window.document.querySelectorAll('meta'),
    ).find((meta) => meta.name === 'description')?.content;

    if (!title) {
      console.warn(`Page title not found for "${filePath}", file ignored`);
      return null;
    } else {
      const cleanTitle = title.endsWith(TITLE_SUFFIX)
        ? title.substr(0, title.length - TITLE_SUFFIX.length)
        : title;

      const cleanURL = (
        filePath.endsWith('/index.html')
          ? filePath.replace(/\/index\.html$/, '/')
          : filePath
      ).replace(new RegExp(`^${BASE_PATH}`), '');

      return {
        title: cleanTitle,
        url: cleanURL,
        description,
      };
    }
  })
  .filter(<T>(page: T | null): page is T => page !== null);

fs.writeFileSync(
  path.join(__dirname, 'build', 'app', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0"
        xmlns:atom="http://www.w3.org/2005/Atom"
        xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
      >
        <channel>
          <title>${pkg.author.name}</title>
          <description>${pkg.description}</description>
          <sy:updatePeriod>yearly</sy:updatePeriod>
          <sy:updateFrequency>1</sy:updateFrequency>
          <link>${pkg.author.url}/sitemap.xml</link>
          <atom:link href="${
            pkg.author.url
          }/sitemap.xml" rel="self" type="application/rss+xml" />
          <lastBuildDate>${BUILD_DATE}</lastBuildDate>
        </channel>

        ${pageList
          .map((page) => {
            const title = page.title;
            const href = `https://${pkg.name}${page.url}`;
            const description = page.description;

            return `
              <item>
                <title>${title}</title>
                ${
                  description ? `<description>${description}</description>` : ''
                }
                <link>${href}</link>
                <guid isPermaLink="true">${href}</guid>
                <source url="${href}">${title}</source>
                <author>${pkg.author.email} (${pkg.author.name})</author>
              </item>`;
          })
          .join('')}
      </rss>`,
);
