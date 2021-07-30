import { Entry } from '../../../types/Entry';
import { getEntryList } from '../../../utils/getEntryList';
import { getEntry } from '../../../utils/getEntry';
import { useTheme } from '../../../styles/ThemeContext';
import { Time } from '../../../components/Time';
import { TagList } from '../../../components/TagList';
import Meta from '../../../components/Meta';
import {
  Article,
  H2,
  Header,
  Paragraph,
  Section,
} from '../../../components/HTMLElements';
import { RawDOM } from '../../../components/RawDOM';
import { classNames } from '../../../utils/classNames';
import { useEffect, useRef, useState } from 'react';
import { loadPrism } from '../../../utils/loadPrism';
import Head from 'next/head';
import pkg from '../../../package.json';
import { Emoji } from '../../../components/Emoji';

type Params = {
  params: {
    slug: string;
  };
};

type Props = {
  entry: Entry;
};

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
    if (process.browser && contentRef.current && prismModule) {
      const resizeIntervalIds: NodeJS.Timeout[] = [];

      const codeElementList = Array.from(
        document.querySelectorAll('pre > code[class^=language-]'),
      ) as HTMLElement[];

      for (const codeElement of codeElementList) {
        const code = codeElement.innerText;
        const preElement = codeElement.parentElement as HTMLElement;
        const wrapperElement = preElement.parentElement;

        if (wrapperElement && codeElement.classList.contains('language-html')) {
          const iframe = document.createElement('iframe');
          iframe.src = '/admin/sample/';

          iframe.addEventListener('load', () => {
            iframe.contentWindow?.postMessage(
              JSON.stringify({
                type: 'sampleContent',
                content: code,
              }),
              '*',
            );
          });

          resizeIntervalIds.push(
            setInterval(() => {
              if (iframe.contentWindow) {
                iframe.style.height =
                  iframe.contentWindow.document.documentElement.scrollHeight +
                  'px';
              }
            }, 1000),
          );

          if (preElement.nextElementSibling) {
            wrapperElement.insertBefore(iframe, preElement.nextElementSibling);
          } else {
            wrapperElement.appendChild(iframe);
          }
        }

        prismModule.default.highlightElement(codeElement);
      }

      return () => {
        resizeIntervalIds.forEach((intervalId) => {
          clearInterval(intervalId);
        });
      };
    }
  }, [entry.content, prismModule]);

  useEffect(() => {
    if (process.browser && contentRef.current) {
      contentRef.current.querySelectorAll('a').forEach((anchor) => {
        anchor.classList.add(theme.anchor);
      });
    }
  }, [theme, entry.content]);

  return (
    <Article className={theme.teseraEntryPage}>
      <Meta title={entry.title} description={entry.summary} />

      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={pkg.author.twitter} />
        <meta name="twitter:creator" content={pkg.author.twitter} />
        <meta name="og:locale" content={entry.language} />
        <meta name="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://${pkg.name}/${pkg.config.blogSlug}/${pkg.config.blogEntrySlug}/${entry.slug}/`}
        />
        <meta property="og:title" content={entry.title} />
        <meta property="og:description" content={entry.summary} />
      </Head>

      <Header>
        <H2 lang={entry.language}>{entry.title}</H2>
        <Time dateTime={entry.date} />
        <Paragraph lang={entry.language}>
          <Emoji>{entry.emoji}</Emoji>
          <span>{entry.mood}</span>
        </Paragraph>
        <TagList tags={entry.tags} />

        <Section aria-label="TL;DR">
          <Paragraph lang={entry.language}>{entry.summary}</Paragraph>
        </Section>
      </Header>

      <div className={classNames(theme.entryContent)} ref={contentRef}>
        <RawDOM html={entry.content} elementProps={{ lang: entry.language }} />
      </div>
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
