import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { DEFAULT_THEME } from '../styles/DEFAULT_THEME';
import { classNames } from '../utils/classNames';
import { getTagList } from '../utils/getTagList';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const tagList = await getTagList();

    return { ...initialProps, tagList };
  }

  render() {
    return (
      <Html className={classNames(DEFAULT_THEME.html)} lang="en">
        <Head />
        <body className={classNames(DEFAULT_THEME.body)}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
