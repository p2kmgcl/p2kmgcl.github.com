---
draft: true
title: Disabled input's click event is not fired in Firefox
language: en
date: 2021-09-13
emoji: 🖱️
mood: Tired but excited, as usual.
tags:
  - til
---

Unlike other browsers (like chrome), Firefox does trigger `click` event or
bubble it to parent elements, if a HTML tag is disabled.

This behavior is intended, and documented in bugzilla:

[bugzilla#218093](https://bugzilla.mozilla.org/show_bug.cgi?id=218093)

So this code won't do anything in Firefox, but it will in Chrome:

```html
<input disabled placeholder="Click here" type="text" />

<script>
  document.body.addEventListener('click', () => {
    alert('Body clicked!');
  });
</script>
```
