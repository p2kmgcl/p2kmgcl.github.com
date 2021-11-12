import { getEntryList } from '../../../utils/getEntryList';
import { getEntryDefinition } from '../../../utils/getEntryDefinition';
import { StaticProps } from '../../../utils/getStaticProps';
import { useMemo } from 'react';
import { EntryDefinition } from '../../../types/Entry';
export { getStaticProps } from '../../../utils/getStaticProps';

type Paths = {
  params: {
    slug: string;
  };
};

export default function TeseraEntry({
  entryList,
  params: { slug },
}: Paths & StaticProps) {
  const [entry, EntryComponent] = useMemo(() => {
    const entry = entryList.find((entry) => entry.slug === slug);
    const entryDefinition = getEntryDefinition(
      entry?.type,
    ) as EntryDefinition<any>;
    if (!entryDefinition.Entry) throw new Error('No entry component found');
    return [entry, entryDefinition.Entry];
  }, [entryList, slug]);

  return <EntryComponent entry={entry} />;
}

export function getStaticPaths(): {
  paths: Paths[];
  fallback: false;
} {
  return {
    paths: getEntryList()
      .map((teseraEntry) => {
        try {
          const { Entry: EntryComponent } = getEntryDefinition(
            teseraEntry.type,
          );

          if (!EntryComponent) return null;
          return { params: { slug: teseraEntry.slug } };
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean) as Paths[],
    fallback: false,
  };
}
