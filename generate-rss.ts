import { getTagList } from './utils/getTagList';
import { getEntryList } from './utils/getEntryList';
import * as path from 'path';
import * as fs from 'fs';
import pkg from './package.json';

const BUILD_DATE = new Date().toISOString();

[
  {
    id: 'all',
    location: '/',
    title: 'Tesera',
    entryList: getEntryList().slice(0, 10),
  },
  ...getTagList().map((tag) => ({
    location: `/tag/${tag}/`,
    id: tag.toLowerCase().split(' ').join('-'),
    title: `Tesera#${tag}`,
    entryList: getEntryList(tag).slice(0, 10),
  })),
].forEach(({ id, location, title, entryList }) => {
  const fileName = `feed-${id}.xml`;
  const href = `https://${pkg.name}/tesera${location}`;
  const source = `https://${pkg.name}/feed-${id}.xml`;

  fs.writeFileSync(
    path.join(__dirname, 'build', 'app', fileName),
    `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0"
        xmlns:atom="http://www.w3.org/2005/Atom"
        xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
      >
        <channel>
          <title>${title}</title>
          <description>${pkg.description}</description>
          <sy:updatePeriod>monthly</sy:updatePeriod>
          <sy:updateFrequency>1</sy:updateFrequency>
          <link>${href}</link>
          <atom:link href="${href}" rel="self" type="application/rss+xml" />
          <lastBuildDate>${BUILD_DATE}</lastBuildDate>
        </channel>

        ${entryList
          .map((entry) => {
            const date = new Date(entry.date).toISOString();
            const href = `https://${pkg.name}/tesera/entry/${entry.slug}/`;

            return `
              <item>
                <title>${entry.title}</title>
                <description>${entry.summary}</description>
                <pubDate>${date}</pubDate>
                ${entry.tags
                  .map((tag) => `<category>${tag}</category>`)
                  .join('')}
                <link>${href}</link>
                <guid isPermaLink="true">${href}</guid>
                <source url="${source}">${title}</source>
                <author>${pkg.author.email} (${pkg.author.name})</author>
              </item>`;
          })
          .join('')}
      </rss>`,
  );
});
