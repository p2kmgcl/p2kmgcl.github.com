import { FC } from 'react';
import { HTMLPreview } from '../../components/entry-types/post/components/HTMLPreview';
import { JavaScriptPreview } from '../../components/entry-types/post/components/JavaScriptPreview';
import { useCodePreviewData } from '../../components/entry-types/post/hooks/useCodePreviewData';

const PREVIEW_COMPONENTS: Record<string, FC<{ code: string }>> = {
  html: HTMLPreview,
  js: JavaScriptPreview,
  javascript: JavaScriptPreview,
};

export default function CodePreviewRender() {
  const { language, code } = useCodePreviewData();
  const Component = PREVIEW_COMPONENTS[language || ''];
  return code && Component ? <Component code={code} /> : null;
}

CodePreviewRender.displayName = 'CodePreviewRender';
CodePreviewRender.rawContent = true;
