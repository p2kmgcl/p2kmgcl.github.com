---
type: post
title: useKonami.js
language: en
draft: false
date: 2021-07-28
mood: En silencio
emoji: 🎮
tags: [experiment]
summary: >
  Executes given callback when Konami Code has been typed by users before a
  given timeout has expired.
---

```js
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

export const useKonami = (callback: () => void, timeout = 3000) => {
  useEffect(() => {
    let code = '';
    let clearCodeTimeoutId: NodeJS.Timeout;

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

      clearCodeTimeoutId = setTimeout(clearCode, timeout);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(clearCodeTimeoutId);
    };
  }, [callback, timeout]);
};
```
