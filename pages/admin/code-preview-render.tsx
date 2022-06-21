import { FC } from 'react';
import { HTMLPreview } from '../../components/entry-types/post/components/HTMLPreview';
import { useCodePreviewData } from '../../components/entry-types/post/hooks/useCodePreviewData';

export type RunContext = {
  code: string;
  language: string;

  dependencies: Array<{
    language: string;
    code: string;
  }>;
};

export const PREVIEW_COMPONENTS: Record<string, FC<RunContext>> = {
  html: HTMLPreview,
};

export default function CodePreviewRender() {
  const data = useCodePreviewData();
  const Component = PREVIEW_COMPONENTS[data?.language || ''];
  return data && Component ? <Component {...data} /> : null;
}

CodePreviewRender.displayName = 'CodePreviewRender';
CodePreviewRender.rawContent = true;
