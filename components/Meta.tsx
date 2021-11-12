import Head from 'next/head';
import type { FC } from 'react';
import pkg from '../package.json';

const Meta: FC<{ title?: string; description?: string }> = ({
  title,
  description,
}) => {
  return (
    <Head>
      <title key="title">
        {title
          ? `${title}${pkg.config.titleSeparator}${pkg.author.name}`
          : pkg.author.name}
      </title>
      <meta name="description" content={description || pkg.description} />
    </Head>
  );
};

export default Meta;
