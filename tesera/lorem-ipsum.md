---
title: Lorem ipsum dolor sit amet, consectetur adipiscing elit
language: en
draft: true
date: 1991-01-01
mood: Testing a theme, or something else that should appear as a mood
tags: [ipsum]
summary: "
  This is how things should work, or at least how we think they should.
  That's the programmer paradox: do not expect thing to behave as you
  prefer, because they won't, unless you don't want to.
"
---

Integer sed dignissim magna. Nunc sagittis massa eu ligula pharetra imperdiet.
Sed metus nisi, pretium et aliquam non, vehicula nec velit. Fusce non
libero scelerisque, consequat ligula sit amet, varius quam. Donec elementum
et ante eget faucibus. Sed _convallis ex ut_ diam porttitor convallis.
Praesent quis massa et orci semper varius quis nec velit. Nam turpis nulla,
tristique a elementum at, efficitur vel magna. Ut porttitor quis lorem eget
commodo. Curabitur lobortis aliquet tortor **eget tempus**. Vestibulum venenatis
vestibulum urna, sit amet iaculis felis convallis id. Morbi elementum
ullamcorper sapien, nec egestas nunc ullamcorper ut. In nulla sem, dictum
vel dictum non, luctus a lectus.

> Sed malesuada odio eros. Vivamus tristique tristique leo, vel finibus magna
> posuere eget. Nunc vitae auctor erat. Nullam suscipit sapien in velit
> tincidunt, non lacinia diam tincidunt. Integer tincidunt sed est quis
> tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
> Suspendisse bibendum turpis vel dignissim congue.

```javascript
function loadCSSTheme() {
  const theme = getCSSTheme();

  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = theme;

  linkElement.addEventListener('load', () => {
    document.body.style.transition = 'opacity ease 500ms';

    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.overflow = 'auto';

      const handleTransitionEnd = () => {
        document.body.removeEventListener('transitionend', handleTransitionEnd);
        document.body.style.transition = '';
      };

      document.body.addEventListener('transitionend', handleTransitionEnd);
    }, 100);
  });

  linkElement.addEventListener('error', () => {
    if (theme !== DEFAULT_THEME) {
      loadCSSTheme(DEFAULT_THEME);
    }
  });

  document.head.appendChild(linkElement);
}
```

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character `change forces` new list start:
    - Ac tristique libero volutpat at
    * Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

Ordered:

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

---

## Ferro femina

Hoc magni nocte enim non sinuataque, Atque, gens. Sed abit herbarum
[epulis](http://vota.com/in-puer), ad cepit et feror, adicit! Cura vertitur, deo
fuit, _abstuleris suum_ gramina videntur praeterita: quidem alma, dum quod non
et.

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg 'The Stormtroopocat')
