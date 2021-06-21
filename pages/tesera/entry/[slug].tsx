import { Entry } from '../../../types/Entry';
import { getEntryList } from '../../../utils/getEntryList';
import { getEntry } from '../../../utils/getEntry';
import { useTheme } from '../../../styles/ThemeContext';
import { Time } from '../../../components/Time';
import { TagList } from '../../../components/TagList';
import Meta from '../../../components/Meta';
import {
  Article,
  Header,
  Paragraph,
  Section,
} from '../../../components/HTMLElements';
import { RawDOM } from '../../../components/RawDOM';
import { MainTitle } from '../../../components/MainTitle';
import { classNames } from '../../../utils/classNames';
import { useEffect, useRef, useState } from 'react';

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
      if (!window.Prism) {
        // @ts-ignore
        window.Prism = { manual: true };
      }

      import('prismjs').then((PrismModule) => {
        setPrismModule(PrismModule);
      });
    }
  }, []);

  useEffect(() => {
    if (process.browser && contentRef.current && prismModule) {
      prismModule.default.highlightAllUnder(contentRef.current);
    }
  }, [entry.content, prismModule]);

  return (
    <Article className={theme.teseraEntryPage}>
      <Meta title={entry.title} description={entry.summary} />

      <Header>
        <MainTitle lang={entry.language}>{entry.title}</MainTitle>
        <Time dateTime={entry.date} />
        <Paragraph lang={entry.language}>{entry.mood}</Paragraph>
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
