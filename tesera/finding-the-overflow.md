---
draft: false
title: Finding overflow
language: en
date: 2021-10-06
emoji: 📏
mood: Tired but excited, as usual.
cover:
  alt: Aerial view of water overflowing into a dock
  origin: https://unsplash.com/photos/Q-lzt8Uz4Eo
  url: /uploads/water-overflowing-into-a-dock.jpg
tags:
  - blog
summary: >
  Discovering which element or elements are causing overflow is not an easy
  task. This is my odyssey looking for a 1-pixel-width element and fixing the
  issue.
---

When I first saw this I tought it was caused by some random element positioned
anywhere, just because this was only happening then using a `RTL` language, but
it wasn't. Normally if you add some CSS shadow or outline (which do not alter
the size of any element) everywhere you will find some missleading element. This
is some code
[suggested in stackoverflow](https://stackoverflow.com/questions/31458477/find-element-that-is-causing-the-showing-of-horizontal-scrollbar-in-google-chrom):

```css
* {
  outline: 1px solid #f00 !important;
}
```

That might highlight elements that are completely off viewport but, what happens
if you only have some 1 pixel scroll? That would be almost not noticeable unless
you review the page with a microscope.

So I started inspecting the DOM, and checking if hidding any element with a
`display:none` property did anything, but the page I was trying to fix was not
precisely small, and I cannot check every element on the page (_technically_ I
could, but it would take me a lot of time).

https://css-tricks.com/findingfixing-unintended-body-overflow/

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

It is not a final solution, but might do the trick or at least highlight some areas
if you have a huge DOM tree to explore.
