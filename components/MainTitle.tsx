import { FC } from 'react';
import { H1 } from './HTMLElements';
import { classNames } from '../utils/classNames';
import { useTheme } from '../styles/ThemeContext';

export const MainTitle: FC<JSX.IntrinsicElements['h1']> = (props) => (
  <H1
    {...props}
    className={classNames(props.className, useTheme().mainTitle)}
  />
);
