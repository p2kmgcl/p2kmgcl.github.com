import rss from '@astrojs/rss';
import pkg from '../../package.json';

export async function get({
  params: { tag },
  props: { label },
}: {
  params: { tag: string };
  props: { label: string };
}) {
  const getEntryList = await import.meta.glob('./tesera/entry/**/*');

  const entryList: any[] = await Promise.all(
    Object.values(getEntryList).map((getEntry) => getEntry()),
  );

  return rss({
    title:
      tag === 'all'
        ? pkg.author.name
        : `${pkg.config.blogName}${pkg.config.blogTagSeparator}${label} | ${pkg.author.name}`,
    description:
      tag === 'all'
        ? `${pkg.description}.`
        : `${pkg.description} (entries with "${label}" tag).`,
    site:
      tag === 'all'
        ? import.meta.env.SITE
        : `${import.meta.env.SITE}${pkg.config.blogSlug}/${
            pkg.config.blogTagSlug
          }/${tag}`,
    items: entryList
      .filter(
        ({ frontmatter: { tags } }) => tag === 'all' || tags.includes(tag),
      )
      .map((entry) => ({
        link: entry.url,
        title: entry.frontmatter.title,
        pubDate: entry.frontmatter.pubDate,
        description: entry.frontmatter.summary,
      })),
  });
}

export async function getStaticPaths() {
  const getPageList = await import.meta.glob('./tesera/tag/**/*');

  const pageList = await Promise.all(
    Object.values(getPageList).map((getPage) => getPage()),
  );

  return [{ params: { tag: 'all' }, props: {} }].concat(
    pageList.map((page: any) => ({
      params: { tag: page.tag },
      props: { label: page.label },
    })),
  );
}
