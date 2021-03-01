import { FC } from 'react';
import { Heading } from './HTMLElements';
import { classNames } from '../utils/classNames';
import { useTheme } from '../styles/ThemeContext';

export const MainTitle: FC<JSX.IntrinsicElements['h1']> = (props) => (
  <Heading
    {...props}
    className={classNames(props.className, useTheme().mainTitle)}
  />
);
