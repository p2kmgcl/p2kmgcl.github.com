---
type: post
title: sumEvents.js
language: en
draft: false
date: 2022-06-15
mood: Waiting for a normal life
emoji: 📆
tags: [post]
summary: >
  I used this tiny script to create my weekly work schedule. It checks for
  iterations of a given event name and sums the total number of hours.
---

Currently it only works on Google Calendar, and probably only when _Spanish_ is
set as main language, but at least it works 🤷. In order to run it, just paste
the script into the browser console and call the returned function.

After that, a small white square should appear on the top left corner of the
screen, being updated every second.

```js
(function () {
  const element = document.createElement('output');
  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.left = '0';
  element.style.zIndex = '99999999';
  element.style.pointerEvents = 'none';
  element.style.color = 'black';
  element.style.background = 'white';

  let intervalId;

  return function (label) {
    clearInterval(intervalId);
    document.body.appendChild(element);

    intervalId = setInterval(() => {
      element.textContent = Array.from(
        document.querySelectorAll('[data-eventid] .ynRLnc'),
      )
        .map((node) => node.textContent)
        .filter((text) => text.includes(label))
        .map((text) =>
          /^de ([0-9]{2}:[0-9]{2}) a ([0-9]{2}:[0-9]{2})/i
            .exec(text)
            .slice(1)
            .map((timeStamp) => {
              const [hours, minutes] = timeStamp
                .split(':')
                .map((n) => Number(n));
              return hours + minutes / 60;
            }),
        )
        .map(([from, to]) => to - from)
        .reduce((a, b) => a + b, 0)
        .toString();
    }, 500);
  };
})()('Event Name');
```
