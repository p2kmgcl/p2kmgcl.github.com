import { FC, useMemo } from 'react';
import NextLink, { LinkProps } from 'next/link';
import { classNames } from '../utils/classNames';
import pkg from '../package.json';

export const Anchor: FC<LinkProps & JSX.IntrinsicElements['a']> = ({
  children,
  title,
  lang,
  target,
  className,
  ...props
}) => {
  const isExternal = useMemo(() => {
    if (!props.href) return false;

    try {
      const url = new URL(props.href);
      return url.origin !== pkg.name;
    } catch (error) {
      return false;
    }
  }, [props.href]);

  return (
    <NextLink {...props}>
      <a
        aria-label={props['aria-label']}
        title={title}
        className={classNames('anchor', className, {
          'anchor--external': isExternal,
        })}
        lang={lang}
        target={target}
      >
        {children}
      </a>
    </NextLink>
  );
};
