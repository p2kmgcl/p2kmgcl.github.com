---
draft: true
title: Finding overflow
language: en
date: 2021-09-13
emoji: 📏
mood: Tired but excited.
tags:
  - snippet
summary: >
  Scripts that tries hidding every element on the page, one by one, and checks
  if this fixes overflow issues on documentElement. Returns a promise which
  resolves into an array with elements that might be causing the overflow.
---

```js
Array.from(document.querySelectorAll('*'))
  .map(
    (element) => () =>
      new Promise((resolve, reject) => {
        const previousDisplay = element.style.display;

        element.style.display = 'none';

        requestAnimationFrame(() => {
          resolve({
            element,
            causesOverflow:
              document.documentElement.getBoundingClientRect().width ===
              document.documentElement.scrollWidth,
          });

          element.style.display = previousDisplay;
        });
      }),
  )
  .reduce(
    (promise, getNextPromise) =>
      promise.then((overflowElements) =>
        getNextPromise().then((result) =>
          result.causesOverflow
            ? [...overflowElements, result.element]
            : overflowElements,
        ),
      ),
    Promise.resolve([]),
  )
  .then(console.log);
```
