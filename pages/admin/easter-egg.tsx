import Head from 'next/head';
import { Anchor } from '../../components/Anchor';
import { Article } from '../../components/HTMLElements';

const styles = `
article {
  font-size: 32px;
  max-width: 42ch;
  margin: 2em auto;
}
`;

export default function EasterEgg() {
  return (
    <>
      <Head>
        <style>{styles}</style>
      </Head>
      <Article>
        <p>
          Use the <Anchor href="/#search">search button</Anchor>, use the
          themes.{' '}
          <Anchor href="https://en.wikipedia.org/wiki/Skin_(computing)">
            Themes
          </Anchor>{' '}
          are nice,{' '}
          <strong>
            <Anchor href="https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS">
              CSS
            </Anchor>{' '}
            is awesome.
          </strong>
        </p>
        <p>
          Thanks to{' '}
          <Anchor href="http://www.csszengarden.com/">CSS Zen Garden</Anchor>{' '}
          and <Anchor href="https://vrivas.es">Víctor Rivas</Anchor> (2010) for
          inspiring this.
        </p>
      </Article>
    </>
  );
}

EasterEgg.rawContent = true;
