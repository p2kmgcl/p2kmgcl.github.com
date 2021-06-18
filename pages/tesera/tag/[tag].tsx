import { useTheme } from '../../../styles/ThemeContext';
import Meta from '../../../components/Meta';
import { getEntryList } from '../../../utils/getEntryList';
import { Entry } from '../../../types/Entry';
import { getTagList } from '../../../utils/getTagList';
import { TagListItem } from '../../../components/TagListItem';
import { EntryList } from '../../../components/EntryList';
import { Anchor } from '../../../components/Anchor';
import { Section } from '../../../components/HTMLElements';
import { MainTitle } from '../../../components/MainTitle';
import pkg from '../../../package.json';

type Params = {
  params: {
    tag: string;
  };
};

type Props = {
  tag: string;
  entryList: Entry[];
};

export default function Index(props: Props) {
  const theme = useTheme();

  return (
    <Section className={theme.teseraTagPage}>
      <Meta
        title={`${pkg.config.blogName}${pkg.config.blogTagSeparator}${props.tag}`}
      />

      <MainTitle>
        <Anchor href={`/${pkg.config.blogSlug}`}>{pkg.config.blogName}</Anchor>
        <TagListItem tag={props.tag} />
      </MainTitle>

      <EntryList entryList={props.entryList} />
    </Section>
  );
}

export async function getStaticPaths(): Promise<{
  paths: Params[];
  fallback: false;
}> {
  return {
    paths: getTagList().map((tag) => ({ params: { tag } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: Params): Promise<{ props: Props }> {
  return {
    props: {
      entryList: getEntryList(params.tag),
      tag: params.tag,
    },
  };
}
