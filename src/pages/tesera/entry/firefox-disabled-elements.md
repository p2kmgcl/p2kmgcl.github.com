---
layout: '../../../layouts/EntryPost.astro'
tags: [post]
title: Disabled input's click event is not fired in Firefox
language: en
pubDate: 2021-09-14
emoji: 🖱️
mood: Tired but excited, as usual.
summary: >
  Firefox does not have the same behavior than other browsers when we speak about
  disabled elements. Here is how this can be result can be equalized.
---

Unlike other browsers (like chrome), Firefox doesn't trigger `click` event or bubble it to parent elements, if a HTML tag is disabled.

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

### Workarounds

1. Consider using `readonly` instead of `disabled` to some input elements, which may make sense depending on the use case.
2. With some extra HTML and CSS, surround the input with a `div` and the `::after` pseudoelement so it propagates clicks to parent nodes.

```html
<div class="input-wrapper input-wrapper--disabled">
  <input disabled placeholder="Click here" type="text" />
  <div>
    <style>
      .input-wrapper {
        position: relative;
      }

      .input-wrapper--disabled::after {
        content: '';
        position: absolute;
        inset: 0;
      }
    </style>

    <script>
      document.body.addEventListener('click', () => {
        alert('Body clicked!');
      });
    </script>
  </div>
</div>
```

### Extra links

- [Inset CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/inset), which is a logical property, and shorthand for top/right/bottom/left.
