import { useEffect, useRef } from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { classNames } from '../../utils/classNames';

export default function AdminSample() {
  const theme = useTheme();
  const entryContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let parsedData: null | { type: 'sampleContent'; content: string } = null;

      try {
        parsedData = JSON.parse(event.data);
      } catch (_) {}

      if (
        parsedData &&
        parsedData.type === 'sampleContent' &&
        entryContentRef.current
      ) {
        entryContentRef.current.innerHTML = parsedData.content;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={classNames(theme.teseraEntryPage)}>
      <div className={classNames(theme.entryContent)} ref={entryContentRef} />
    </div>
  );
}

AdminSample.rawContent = true;
