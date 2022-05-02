import { getEntryList } from '../../../utils/getEntryList';
import { StaticProps } from '../../../utils/getStaticProps';
import { useMemo } from 'react';
import entryToComponent, {
  NullComponent,
} from '../../../utils/entryToComponent';
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
    if (!entry) throw new Error(`Entry "${slug}" not found`);
    return [entry, entryToComponent(entry, 'getEntryComponent')];
  }, [entryList, slug]);

  return <EntryComponent entry={entry} />;
}

TeseraEntry.displayName = 'TeseraEntry';

export function getStaticPaths(): {
  paths: Paths[];
  fallback: false;
} {
  return {
    paths: getEntryList()
      .map((teseraEntry) => {
        const EntryComponent = entryToComponent(
          teseraEntry,
          'getEntryComponent',
        );

        if (EntryComponent === NullComponent) {
          return null;
        }

        return {
          params: {
            slug: teseraEntry.slug,
          },
        };
      })
      .filter(Boolean) as Paths[],
    fallback: false,
  };
}
