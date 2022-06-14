import Meta from '../../../components/Meta';
import { getEntryList } from '../../../utils/getEntryList';
import { getTagList } from '../../../utils/getTagList';
import { TagListItem } from '../../../components/TagListItem';
import { EntryList } from '../../../components/EntryList';
import { H2, Section } from '../../../components/HTMLElements';
import pkg from '../../../package.json';
import { Entry } from '../../../types/Entry';
import { GlobalPageProps } from '../../../types/GlobalPageProps';

type PageProps = {
  entryList: Entry[];
};

type Paths = {
  params: {
    tag: string;
  };
};

export default function TeseraTag(props: Paths & PageProps) {
  return (
    <Section>
      <Meta
        title={`${pkg.config.blogName}${pkg.config.blogTagSeparator}${props.params.tag}`}
      />

      <H2>
        <TagListItem tag={props.params.tag} renderAsLink={false} />
      </H2>

      <EntryList entryList={props.entryList} />
    </Section>
  );
}

TeseraTag.displayName = 'TeseraTag';

export async function getStaticProps({
  params,
}: {
  params: Paths['params'];
}): Promise<{
  props: GlobalPageProps & PageProps;
}> {
  return {
    props: {
      entryList: getEntryList(params.tag).map((entry) => ({
        ...entry,
        content: '',
      })),
      tagList: getTagList(getEntryList()),
    },
  };
}

export function getStaticPaths(): {
  paths: Paths[];
  fallback: false;
} {
  return {
    paths: getTagList(getEntryList()).map((tag) => ({
      params: { tag },
    })),
    fallback: false,
  };
}
