import Document, { Html, Head, Main, NextScript } from 'next/document';
import { DEFAULT_THEME } from '../styles/DEFAULT_THEME';
import { classNames } from '../utils/classNames';

export default class CustomDocument extends Document {
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
