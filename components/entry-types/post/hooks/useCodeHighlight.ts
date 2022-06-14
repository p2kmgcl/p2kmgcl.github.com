import { MutableRefObject, useEffect, useState } from 'react';
import { loadPrism } from '../../../../utils/loadPrism';

export function useCodeHighlight(
  contentRef: MutableRefObject<HTMLDivElement | null>,
) {
  const [prismModule, setPrismModule] = useState<any>(null);

  useEffect(() => {
    if (globalThis.location && contentRef.current) {
      loadPrism().then(setPrismModule);
    }
  }, [contentRef]);

  useEffect(() => {
    if (prismModule) {
      const codeElementList = Array.from(
        document.querySelectorAll('pre > code[class^=language-]'),
      ) as HTMLElement[];

      for (const codeElement of codeElementList) {
        prismModule.default.highlightElement(codeElement);
      }
    }
  }, [prismModule]);
}
