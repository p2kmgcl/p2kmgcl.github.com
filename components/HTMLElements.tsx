import type { FC } from 'react';
import { Theme } from '../types/Theme';
import { classNames } from '../utils/classNames';
import { useTheme } from './ThemeContext';

type AllProps = JSX.IntrinsicElements;

function wrap<Props extends AllProps[keyof AllProps]>(
  TagName: keyof AllProps,
  className: keyof Theme,
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
export const Figure = wrap<AllProps['figure']>('figure', 'figure');
export const Footer = wrap<AllProps['footer']>('footer', 'footer');
export const Header = wrap<AllProps['header']>('header', 'header');
export const H1 = wrap<AllProps['h1']>('h1', 'h1');
export const H2 = wrap<AllProps['h2']>('h2', 'h2');
export const H3 = wrap<AllProps['h3']>('h3', 'h3');
export const Image = wrap<AllProps['img']>('img', 'image');
export const Ul = wrap<AllProps['ul']>('ul', 'ul');
export const Li = wrap<AllProps['li']>('li', 'li');
export const Nav = wrap<AllProps['nav']>('nav', 'nav');
export const Paragraph = wrap<AllProps['p']>('p', 'paragraph');
export const Picture = wrap<AllProps['picture']>('picture', 'picture');
export const Section = wrap<AllProps['section']>('section', 'section');
export const Strong = wrap<AllProps['strong']>('strong', 'strong');
