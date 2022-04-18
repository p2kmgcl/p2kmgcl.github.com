---
type: post
title: Visually hidden (sr-only, screen reader only)
language: en
draft: false
date: 2022-04-13
mood: Stressed
tags: [snippet]
emoji: 🫣
summary: >
  Snippet to visually hide elements without losing accessibility.
---

Currently this is a copy of Bootstrap `.sr-only` class, but I might update this
in the future if I find some simpler solution.

```css
.sr-only:not(:focus):not(:focus-within) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

[Bootstrap's visually-hidden.scss](https://github.com/twbs/bootstrap/blob/1df098361cac04217d6a464c80e890c4335ecb5c/scss/mixins/_visually-hidden.scss).
