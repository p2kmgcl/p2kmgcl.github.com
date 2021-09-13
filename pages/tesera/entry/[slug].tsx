import { Entry } from '../../../types/Entry';
import { getEntryList } from '../../../utils/getEntryList';
import { getEntry } from '../../../utils/getEntry';
import { useTheme } from '../../../styles/ThemeContext';
import { Time } from '../../../components/Time';
import { TagList } from '../../../components/TagList';
import Meta from '../../../components/Meta';
import {
  Article,
  Figure,
  Footer,
  H2,
  Header,
  Image,
  Paragraph,
  Section,
} from '../../../components/HTMLElements';
import { RawDOM } from '../../../components/RawDOM';
import { classNames } from '../../../utils/classNames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { loadPrism } from '../../../utils/loadPrism';
import Head from 'next/head';
import pkg from '../../../package.json';
import { Emoji } from '../../../components/Emoji';
import { Anchor } from '../../../components/Anchor';

type Params = {
  params: {
    slug: string;
  };
};

type Props = {
  entry: Entry;
};

let nextIframeId = 0;

export default function TeseraEntry({ entry }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const [prismModule, setPrismModule] = useState<any>(null);

  useEffect(() => {
    if (process.browser && contentRef.current) {
      loadPrism().then(setPrismModule);
    }
  }, []);

  useEffect(() => {
    if (!process.browser || !contentRef.current || !prismModule) {
      return;
    }
    const codeElementList = Array.from(
      document.querySelectorAll('pre > code[class^=language-]'),
    ) as HTMLElement[];

    const iframeMap: Map<string, HTMLIFrameElement> = new Map();

    const resizeIframe = (iframe: HTMLIFrameElement) => {
      if (iframe.contentWindow) {
        const { borderBottomWidth, borderTopWidth } =
          window.getComputedStyle(iframe);

        const { height } =
          iframe.contentWindow.document.documentElement.getBoundingClientRect();

        iframe.style.height =
          height +
          parseInt(borderBottomWidth || '0', 10) +
          parseInt(borderTopWidth || '0', 10) +
          'px';

        iframe.style.opacity = '1';
      }
    };

    const handleMessage = (event: MessageEvent) => {
      let parsedData: null | {
        type: 'sampleContentRendered';
        id: string;
        content: string;
      } = null;

      try {
        parsedData = JSON.parse(event.data);
      } catch (_) {}

      if (parsedData?.type !== 'sampleContentRendered') {
        return;
      }

      console.log(parsedData);
      const iframe = iframeMap.get(parsedData.id);
      if (iframe) resizeIframe(iframe);
    };

    for (const codeElement of codeElementList) {
      const code = codeElement.innerText;
      const preElement = codeElement.parentElement as HTMLElement;
      const wrapperElement = preElement.parentElement;

      if (wrapperElement && codeElement.classList.contains('language-html')) {
        const iframeId = (nextIframeId++).toString();
        const iframe = document.createElement('iframe');
        iframe.style.transition = 'height ease 0.3s, opacity ease 0.3s 0.3s';
        iframe.style.height = '0px';
        iframe.style.opacity = '0';
        iframe.src = '/admin/sample/';

        iframe.addEventListener('load', () => {
          iframe.contentWindow?.postMessage(
            JSON.stringify({
              type: 'sampleContent',
              content: code,
              id: iframeId,
            }),
            '*',
          );
        });

        if (preElement.nextElementSibling) {
          wrapperElement.insertBefore(iframe, preElement.nextElementSibling);
        } else {
          wrapperElement.appendChild(iframe);
        }

        iframeMap.set(iframeId, iframe);
      }

      prismModule.default.highlightElement(codeElement);
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [entry.content, prismModule]);

  useEffect(() => {
    if (process.browser && contentRef.current) {
      contentRef.current.querySelectorAll('a').forEach((anchor) => {
        anchor.classList.add(theme.anchor);
      });
    }
  }, [theme, entry.content]);

  const [metaTags, metaScript] = useMemo(() => {
    const date = new Date(entry.date).toISOString();
    const ogTags = entry.tags.map((tag): [string, string] => ['og:tag', tag]);

    const ogCover = entry.cover
      ? [
          ['og:image', `https://${pkg.name}${entry.cover.url}`],
          ['og:image:alt', entry.cover.alt],
        ]
      : [];

    const metaTags = [
      ['twitter:card', 'summary'],
      ['twitter:title', entry.title],
      ['twitter:description', entry.summary || ''],
      ['twitter:site', `@${pkg.author.username}`],
      ['twitter:creator', `@${pkg.author.username}`],

      ['og:type', 'article'],
      ['og:locale', entry.language],
      ['og:url', entry.url],
      ['og:title', entry.title],
      ['og:description', entry.summary || ''],
      ['og:created_time', date],
      ['og:published_time', date],
      ['og:modified_time', date],
      ['og:article:author', `https://${pkg.name}`],
      ['og:article:author:first_name', pkg.author.firstName],
      ['og:article:author:last_name', pkg.author.familyName],
      ['og:article:author:username', pkg.author.username],
      ...ogTags,
      ...ogCover,

      ['title', entry.title],
      ['description', entry.summary || ''],
      ['author', pkg.author.name],
    ] as const;

    const metaScript = {
      '@context': 'http://schema.org',
      '@type': 'NewsArticle',
      image: entry.cover ? [entry.cover.url] : [],
      url: entry.url,
      dateCreated: date,
      datePublished: date,
      dateModified: date,
      headline: entry.title,
      name: entry.title,
      description: entry.summary || '',
      identifier: entry.slug,
      author: {
        '@type': 'Person',
        name: pkg.author.name,
        url: `https://${pkg.name}`,
      },
      creator: [pkg.author.name],
    };

    return [metaTags, JSON.stringify(metaScript)];
  }, [entry]);

  const twitterLink =
    'https://twitter.com/intent/tweet?' +
    `text=${encodeURIComponent(entry.title)}` +
    `&url=${encodeURIComponent(entry.url)}` +
    `&hashtags=${entry.tags.join(',')}` +
    `&via=${pkg.author.username}`;

  const linkedInLink =
    'https://www.linkedin.com/sharing/share-offsite/?' +
    `url=${encodeURIComponent(entry.url)}`;

  const githubLink =
    `${pkg.repository.url}/blob/main/` +
    pkg.config.blogSlug +
    `/${entry.slug}.md`;

  const editLink =
    `https://${pkg.name}/admin/#/collections/${pkg.config.blogSlug}/` +
    pkg.config.blogEntriesSlug +
    `/${entry.slug}`;

  let cover = null;

  if (entry.cover) {
    cover = (
      <Figure>
        <Image src={entry.cover.url} alt={entry.cover.alt} />
      </Figure>
    );

    if (entry.cover.origin) {
      cover = (
        <Anchor href={entry.cover.origin} target="_blank">
          {cover}
        </Anchor>
      );
    }
  }

  return (
    <Article className={theme.teseraEntryPage}>
      <Meta title={entry.title} description={entry.summary || ''} />

      <Head>
        {metaTags.map(([property, content]) => (
          <meta
            key={`${property}-${content}`}
            property={property}
            content={content}
          />
        ))}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: metaScript }}
        />

        <link rel="canonical" href={entry.url} />
      </Head>

      <Header>
        <H2 lang={entry.language}>{entry.title}</H2>

        <Time dateTime={entry.date} />

        <Paragraph lang={entry.language}>
          <Emoji>{entry.emoji}</Emoji>
          <span>{entry.mood}</span>
        </Paragraph>

        <TagList tags={entry.tags} />

        {entry.summary ? (
          <Section aria-label="TL;DR">
            <Paragraph lang={entry.language}>{entry.summary}</Paragraph>
          </Section>
        ) : null}

        {cover}
      </Header>

      <div className={classNames(theme.entryContent)} ref={contentRef}>
        <RawDOM html={entry.content} elementProps={{ lang: entry.language }} />
      </div>

      <Footer>
        <nav
          className={theme.entryFooterNavigation}
          data-entry-title={entry.title}
          data-entry-emoji={entry.emoji}
        >
          <Anchor href={twitterLink} target="_blank">
            <Emoji>🕊️</Emoji>
            Share on Twitter
          </Anchor>
          <Anchor href={linkedInLink} target="_blank">
            <Emoji>🎩</Emoji>
            <span>Share on LinkedIn</span>
          </Anchor>
          <Anchor href={githubLink} target="_blank">
            <Emoji>👾</Emoji>
            <span>View on GitHub</span>
          </Anchor>
          <Anchor href={editLink} target="_blank">
            <Emoji>📝</Emoji>
            <span>Edit</span>
          </Anchor>
        </nav>
      </Footer>
    </Article>
  );
}

export async function getStaticPaths(): Promise<{
  paths: Params[];
  fallback: false;
}> {
  return {
    paths: getEntryList().map((teseraEntry) => {
      return {
        params: {
          slug: teseraEntry.slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: Params): Promise<{ props: Props }> {
  return {
    props: {
      entry: getEntry(params.slug),
    },
  };
}
