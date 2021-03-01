import { FC } from 'react';
import { classNames } from '../utils/classNames';
import { useTheme } from '../styles/ThemeContext';

export const RawDOM: FC<{
  html: string;
  elementProps?: JSX.IntrinsicElements['div'];
}> = ({ html, elementProps = {} }) => (
  <div
    {...elementProps}
    className={classNames(useTheme().rawDOM)}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);
