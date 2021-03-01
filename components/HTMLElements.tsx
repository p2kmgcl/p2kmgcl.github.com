import { FC, ReactElement } from 'react';
import { classNames } from '../utils/classNames';
import { useTheme } from '../styles/ThemeContext';

type AllProps = JSX.IntrinsicElements;

function wrap<Props extends AllProps[keyof AllProps]>(
  TagName: keyof AllProps,
  className: keyof ReturnType<typeof useTheme>,
) {
  const Component: FC<Props> = ({ className: classNameProp, ...props }) => (
    // @ts-ignore
    <TagName
      className={classNames(useTheme()[className], classNameProp)}
      {...props}
    />
  );

  Component.displayName = `HTMLElement(${TagName})`;

  return Component;
}

export const Article = wrap<AllProps['article']>('article', 'article');
export const Header = wrap<AllProps['header']>('header', 'header');
export const Heading = wrap<AllProps['h1']>('h1', 'heading');
export const Image = wrap<AllProps['img']>('img', 'image');
export const Paragraph = wrap<AllProps['p']>('p', 'paragraph');
export const Picture = wrap<AllProps['picture']>('picture', 'picture');
export const Section = wrap<AllProps['section']>('section', 'section');
export const Strong = wrap<AllProps['strong']>('strong', 'strong');
