import { Entry } from '../types/Entry';
import { getEntryList } from './getEntryList';
import { getTagList } from './getTagList';

export interface StaticProps {
  entryList: Entry[];
  tagList: string[];
}

export const getStaticProps = async () => {
  const entryList = await getEntryList();
  const tagList = await getTagList(entryList);

  return {
    props: {
      entryList,
      tagList,
    },
  };
};
