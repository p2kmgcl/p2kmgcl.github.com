import { useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
].join('');

export const useKonami = (callback: () => void) => {
  useEffect(() => {
    let code = '';
    let clearCodeTimeoutId = null;

    const clearCode = () => {
      code = '';
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      clearTimeout(clearCodeTimeoutId);

      code += event.code;

      if (!KONAMI_CODE.startsWith(code)) {
        code = '';
      }

      if (code === KONAMI_CODE) {
        callback();
      }

      clearCodeTimeoutId = setTimeout(clearCode, 3000);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(clearCodeTimeoutId);
    };
  }, [callback]);
};
