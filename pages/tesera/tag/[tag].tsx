import Meta from '../../../components/Meta';
import { getEntryList } from '../../../utils/getEntryList';
import { getTagList } from '../../../utils/getTagList';
import { TagListItem } from '../../../components/TagListItem';
import { EntryList } from '../../../components/EntryList';
import { H2, Section } from '../../../components/HTMLElements';
import pkg from '../../../package.json';
import type { StaticProps } from '../../../utils/getStaticProps';
import { useMemo } from 'react';
export { getStaticProps } from '../../../utils/getStaticProps';

type Paths = {
  params: {
    tag: string;
  };
};

export default function TeseraTag(props: Paths & StaticProps) {
  const filteredEntryList = useMemo(
    () =>
      props.entryList.filter((entry) => entry.tags.includes(props.params.tag)),
    [props.params.tag, props.entryList],
  );

  return (
    <Section>
      <Meta
        title={`${pkg.config.blogName}${pkg.config.blogTagSeparator}${props.params.tag}`}
      />

      <H2>
        <TagListItem tag={props.params.tag} renderAsLink={false} />
      </H2>

      <EntryList entryList={filteredEntryList} />
    </Section>
  );
}

TeseraTag.displayName = 'TeseraTag';

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
