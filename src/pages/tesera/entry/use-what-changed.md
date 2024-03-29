---
layout: '../../../layouts/EntryPost.astro'
tags: [post]
title: useWhatChanged.js
language: en
pubDate: 2021-04-27
emoji: 🔁
mood: Listening to lofi music while wondering how to improve the Page Editor
summary: >
  Logs to the browser console a list of changed values used in a useEffect-like
  hook.
---

```js
import * as React from 'https://unpkg.com/react@18/umd/react.production.min.js';
const { useEffect } = React;

export const useWhatChanged = (name, deps) => {
  const depsRef = useRef({ ...deps });

  useEffect(() => {
    const diff = [];
    let showDiff = false;

    Object.entries(deps).forEach(([key, value]) => {
      if (value !== depsRef.current[key]) {
        showDiff = true;
      }

      diff.push({
        name: key,
        previous: depsRef.current[key],
        current: value,
        areEqual: value === depsRef.current[key],
      });
    });

    if (showDiff) {
      console.log(name);
      console.table(diff);
    }
  }, Object.values(deps));
};
```
