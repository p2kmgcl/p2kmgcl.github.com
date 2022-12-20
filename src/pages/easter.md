---
layout: '../layouts/EntryRaw.astro'
title: Easter
tags: []
---

<style>
  body {
    display: grid;
    place-items: center;
    padding: 2rem;
  }

  @media(prefers-color-scheme: dark) {
    body {
      color: #f1f1f1;
      background: #111;
    }

    a, a:visited {
      color: #aaf;
    }
  }

  body > a {
    position: absolute;
    top: 1em;
    left: 1em;
  }

  p {
    font-size: 2rem;
    max-width: 40rem;
    margin: 1em auto;
  }
</style>

Use the [browser console][1], use the themes.<br />
[Themes][2] are nice, **[CSS][3] is awesome.**

Thanks to [CSS Zen Garden][4]</a> and [Víctor Rivas][5] (2010) for inspiring this.

Theme manager has been now _activated_.
Look for this icon (🔀) to enjoy themes.

<script type="module">
  localStorage.setItem('theme-manager-enabled', true);
</script>

[1]: https://en.wikipedia.org/wiki/Web_development_tools
[2]: https://en.wikipedia.org/wiki/Skin_(computing)
[3]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS
[4]: http://www.csszengarden.com/
[5]: https://vrivas.es
