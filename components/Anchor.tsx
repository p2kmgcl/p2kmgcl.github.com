import { FC } from 'react';
import NextLink, { LinkProps } from 'next/link';
import { useTheme } from '../styles/ThemeContext';
import { classNames } from '../utils/classNames';

export const Anchor: FC<LinkProps & JSX.IntrinsicElements['a']> = ({
  children,
  title,
  lang,
  target,
  className: classNameProp,
  ...props
}) => {
  const theme = useTheme();

  return (
    <NextLink {...props}>
      <a
        title={title}
        className={classNames(theme.anchor, classNameProp)}
        lang={lang}
        target={target}
      >
        {children}
      </a>
    </NextLink>
  );
};
