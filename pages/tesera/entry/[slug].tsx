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
  Heading,
  Paragraph,
  Section,
} from '../../../components/HTMLElements';
import { RawDOM } from '../../../components/RawDOM';
import { MainTitle } from '../../../components/MainTitle';
import { classNames } from '../../../utils/classNames';

type Params = {
  params: {
    slug: string;
  };
};

type Props = {
  entry: Entry;
};

export default function TeseraEntry({ entry }: Props) {
  const theme = useTheme();

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

      <div className={classNames(theme.entryContent)}>
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
