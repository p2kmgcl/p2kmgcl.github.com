import { useEffect, useMemo, useRef, useState } from 'react';
import { loadPrism } from '../../../utils/loadPrism';
import { Anchor } from '../../Anchor';
import { Emoji } from '../../Emoji';
import {
  Article,
  Figure,
  Footer,
  H2,
  Header,
  Image,
  Nav,
  Paragraph,
  Section,
} from '../../HTMLElements';
import { Time } from '../../Time';
import pkg from '../../../package.json';
import Meta from '../../Meta';
import Head from 'next/head';
import { TagList } from '../../TagList';
import { useTheme } from '../../ThemeContext';
import { classNames } from '../../../utils/classNames';
import { Post } from '../../../types/Entry';

let nextIframeId = 0;

export default function PostEntry({ entry }: { entry: Post }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [prismModule, setPrismModule] = useState<any>(null);
  const theme = useTheme();

  useEffect(() => {
    if (globalThis.location && contentRef.current) {
      loadPrism().then(setPrismModule);
    }
  }, []);

  useEffect(() => {
    if (!globalThis.location || !contentRef.current || !prismModule) {
      return;
    }
    const codeElementList = Array.from(
      document.querySelectorAll('pre > code[class^=language-]'),
    ) as HTMLElement[];

    const contentMap: Map<string, string> = new Map();
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

        iframe.classList.remove('sample-content-hidden');
      }
    };

    const handleMessage = (event: MessageEvent) => {
      let parsedData: null | {
        iframeId: string;
        type: 'sampleContentRendered' | 'sampleContentWaiting';
      } = null;

      try {
        parsedData = JSON.parse(event.data);
      } catch (_) {}

      const iframe = iframeMap.get(parsedData?.iframeId || '');
      if (!iframe) return;

      if (parsedData?.type === 'sampleContentRendered') {
        resizeIframe(iframe);
      } else if (parsedData?.type === 'sampleContentWaiting') {
        const content = contentMap.get(parsedData?.iframeId);
        if (!content) return;

        iframe.contentWindow?.postMessage(
          JSON.stringify({ type: 'sampleContent', content }),
          '*',
        );
      }
    };

    const renderIframe = (
      wrapperElement: HTMLElement,
      preElement: HTMLElement,
      codeElement: HTMLElement,
      iframeId: string,
    ) => {
      const existingIframe = iframeMap.get(iframeId);

      if (existingIframe) {
        existingIframe.contentWindow?.location.reload();
        existingIframe.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        return;
      }

      const iframe = document.createElement('iframe');

      iframe.classList.add('sample-content-hidden');
      iframe.src = `/admin/entry-html-render/?iframeId=${iframeId}`;

      contentMap.set(iframeId, codeElement.innerText);
      iframeMap.set(iframeId, iframe);

      if (preElement.nextElementSibling) {
        wrapperElement.insertBefore(iframe, preElement.nextElementSibling);
      } else {
        wrapperElement.appendChild(iframe);
      }

      iframe.addEventListener(
        'animationend',
        () => {
          iframe.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        },
        { once: true },
      );
    };

    for (const codeElement of codeElementList) {
      const preElement = codeElement.parentElement as HTMLElement;
      const wrapperElement = preElement.parentElement;

      if (
        wrapperElement &&
        codeElement.classList.contains('language-html') &&
        !preElement.dataset.previewReady
      ) {
        const button = document.createElement('button');
        const iframeId = (nextIframeId++).toString();
        preElement.dataset.previewReady = 'true';

        preElement.appendChild(button);
        button.classList.add('data-preview-button');
        button.type = 'button';
        button.textContent = 'Show preview';

        button.addEventListener('click', () => {
          preElement.dataset.previewLoaded = 'true';
          button.textContent = 'Reload preview';
          renderIframe(wrapperElement, preElement, codeElement, iframeId);
        });
      }

      prismModule.default.highlightElement(codeElement);
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [entry.content, prismModule]);

  useEffect(() => {
    if (globalThis.location && contentRef.current) {
      contentRef.current.querySelectorAll('a').forEach((anchor) => {
        anchor.classList.add('anchor');
      });
    }
  }, [entry.content]);

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
    <Article>
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

        <Section aria-label="Mood" className={theme.entryMood}>
          <Paragraph lang={entry.language}>
            <Emoji>{entry.emoji}</Emoji> <span>{entry.mood}</span>
          </Paragraph>
        </Section>

        <TagList tags={entry.tags} />

        {entry.summary ? (
          <Section aria-label="Summary" className={theme.entrySummary}>
            <Paragraph lang={entry.language}>{entry.summary}</Paragraph>
          </Section>
        ) : null}

        {cover}
      </Header>

      <div
        ref={contentRef}
        lang={entry.language}
        className={classNames('tesera-entry-content', theme.entryContent)}
        dangerouslySetInnerHTML={{ __html: entry.content }}
      />

      <Footer>
        <Nav data-entry-title={entry.title} data-entry-emoji={entry.emoji}>
          <Anchor href={twitterLink} target="_blank">
            <Emoji>🕊️</Emoji> <span>Share on Twitter</span>
          </Anchor>
          <Anchor href={linkedInLink} target="_blank">
            <Emoji>🎩</Emoji> <span>Share on LinkedIn</span>
          </Anchor>
          <Anchor href={githubLink} target="_blank">
            <Emoji>👾</Emoji> <span>View on GitHub</span>
          </Anchor>
        </Nav>
      </Footer>
    </Article>
  );
}
