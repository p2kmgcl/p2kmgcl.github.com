import { getEntryList } from '../../../utils/getEntryList';
import entryToComponent, {
  NullComponent,
} from '../../../utils/entryToComponent';
import { Entry } from '../../../types/Entry';
import { GlobalPageProps } from '../../../types/GlobalPageProps';
import { getTagList } from '../../../utils/getTagList';

type PageProps = {
  entry: Entry;
};

type Paths = {
  params: {
    slug: string;
  };
};

export default function TeseraEntry({
  entry,
  params: { slug },
}: Paths & GlobalPageProps & PageProps) {
  const EntryComponent = entryToComponent(entry, 'getEntryComponent');
  return <EntryComponent entry={entry} />;
}

TeseraEntry.displayName = 'TeseraEntry';

export async function getStaticProps({
  params,
}: {
  params: Paths['params'];
}): Promise<{
  props: GlobalPageProps & PageProps;
}> {
  const entryList = getEntryList();
  const entry = entryList.find((entry) => entry.slug === params.slug) as Entry;

  return {
    props: {
      entry,
      mainWrapperProps: {
        ['data-entry-type']: entry.type,

        ...Object.fromEntries(
          entry.tags
            .filter((tag) => tag !== entry.type)
            .map((tag) => [`data-entry-tag-${tag}`, '']),
        ),
      },
      tagList: getTagList(entryList),
    },
  };
}

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
