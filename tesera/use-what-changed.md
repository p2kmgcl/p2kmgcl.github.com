---
title: useWhatChanged.js
language: en
draft: false
date: 2021-04-27
mood: Listening to lofi music while wondering how to improve the Page Editor
tags: [snippet]
summary: 'Logs to the browser console a list of changed values used in a
  useEffect-like hook.'
---

```js
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
