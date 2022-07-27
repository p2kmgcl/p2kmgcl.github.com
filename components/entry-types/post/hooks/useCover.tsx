import { Post } from '../../../../types/Entry';
import { Anchor } from '../../../Anchor';
import { Figure, Image } from '../../../HTMLElements';

export function useCover(entry: Post) {
  let cover = null;

  if (entry.cover) {
    cover = (
      <Figure>
        <Image
          alt={entry.cover.alt}
          src={entry.cover.url}
          width={1280}
          height={720}
        />
      </Figure>
    );

    if (entry.cover.origin) {
      cover = (
        <Anchor href={entry.cover.origin} target="_blank">
          {cover}
        </Anchor>
      );
    }
  }

  return cover;
}
