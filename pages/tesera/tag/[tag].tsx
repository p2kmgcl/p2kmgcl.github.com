import Meta from '../../../components/Meta';
import { getEntryList } from '../../../utils/getEntryList';
import { getTagList } from '../../../utils/getTagList';
import { TagListItem } from '../../../components/TagListItem';
import { EntryList } from '../../../components/EntryList';
import { Anchor } from '../../../components/Anchor';
import { H2, Section } from '../../../components/HTMLElements';
import pkg from '../../../package.json';
import type { StaticProps } from '../../../utils/getStaticProps';
import { useMemo } from 'react';
import { useTheme } from '../../../components/ThemeContext';
export { getStaticProps } from '../../../utils/getStaticProps';

type Paths = {
  params: {
    tag: string;
  };
};

export default function Index(props: Paths & StaticProps) {
  const filteredEntryList = useMemo(
    () =>
      props.entryList.filter((entry) => entry.tags.includes(props.params.tag)),
    [props.params.tag, props.entryList],
  );

  return (
    <Section className={useTheme().teseraTagPage}>
      <Meta
        title={`${pkg.config.blogName}${pkg.config.blogTagSeparator}${props.params.tag}`}
      />

      <H2>
        <Anchor href={`/${pkg.config.blogSlug}`}>{pkg.config.blogName}</Anchor>
        <TagListItem tag={props.params.tag} />
      </H2>

      <EntryList entryList={filteredEntryList} />
    </Section>
  );
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
