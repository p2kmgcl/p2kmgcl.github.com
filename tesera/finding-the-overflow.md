---
type: post
draft: false
title: Finding overflow
language: en
date: 2022-06-16
emoji: 📏
mood: Tired but excited, as usual.
cover:
  alt: Aerial view of water overflowing into a dock.
  origin: https://unsplash.com/photos/Q-lzt8Uz4Eo
  url: /uploads/water-overflowing-into-a-dock.jpg
tags: []
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

It is not a final solution, but might do the trick or at least highlight some
areas if you have a huge DOM tree to explore.

### Update 2022-06-16

I have updated the script to try multiple solutions for each element, and also
scoping the search to an specific DOM node:

```js
(async function (selector) {
  const parent = document.querySelector(selector);
  const hasOverflow = () => parent.offsetHeight < parent.scrollHeight;
  const waitFrame = () => new Promise((r) => requestAnimationFrame(r));

  if (!hasOverflow()) {
    console.log('there is no overflow');
    return;
  }

  const elements = Array.from(parent.querySelectorAll('*'));
  const fixes = [];

  const testApplyProps = (props, testValue) => (node) => {
    const prevValues = new Map();

    for (const prop of props) {
      prevValues.set(prop, node.style[prop]);
      node.style[prop] = `${testValue} !important`;
    }

    return () => {
      for (const prop of props) {
        node.style[prop] = prevValues.get(prop);
      }
    };
  };

  const tests = [
    {
      label: 'Set overflow to hidden',
      attach: testApplyProps(['overflow', 'overflowX', 'overflowY'], 'hidden'),
    },
    {
      label: 'Set position to static',
      attach: testApplyProps(['position'], 'static'),
    },
    {
      label: 'Set margin to 0',
      attach: testApplyProps(
        ['margin', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom'],
        '0',
      ),
    },
    {
      label: 'Set display to none',
      attach: testApplyProps(['display'], 'none'),
    },
    {
      label: 'Remove classes from element',
      attach: (node) => {
        let classes = [];

        if (node.classList) {
          classes = [...node.classList];

          for (const className of classes) {
            node.classList.remove(className);
          }
        }

        return () => {
          for (const className of classes) {
            node.classList.add(className);
          }
        };
      },
    },
    {
      label: 'Remove node from tree',
      attach: (node) => {
        const { parentNode, nextSibling } = node;
        parentNode.removeChild(node);

        return () => {
          if (nextSibling) {
            parentNode.insertBefore(node, nextSibling);
          } else {
            parentNode.appendChild(node);
          }
        };
      },
    },
  ];

  for (const element of elements) {
    console.clear();

    console.log(
      `${Math.ceil(
        ((elements.indexOf(element) + 1) / elements.length) * 100,
      )}%`,
    );

    for (const test of tests) {
      const detach = test.attach(element);
      await waitFrame();

      if (!hasOverflow()) {
        fixes.push({
          testLabel: test.label,
          element,
        });
      }

      detach();
      await waitFrame();
    }
  }

  fixes.forEach((fix) => {
    console.log(fix.testLabel, fix.element);
  });
})('body');
```
