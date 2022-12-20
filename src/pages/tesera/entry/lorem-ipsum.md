---
layout: '../../../layouts/EntryPost.astro'
tags: [post]
title: Lorem ipsum dolor sit amet, consectetur adipiscing elit
language: en
pubDate: 1991-01-01
emoji: 🧪
cover:
  url: /uploads/man-wearing-black-and-white-stripe-shirt-looking-at-white-printer-papers-on-the-wall.jpg
  alt: Sample image.
mood: Testing a theme, or something else
summary: >
  This is how things should work, or at least how we think they should. That's
  the programmer paradox: do not expect thing to behave as you prefer, because
  they won't, unless you don't want to.
---

<p style="background:white;color:rebeccapurple">
  <span lang="es">
    Por favor, no pulses el botón, no es realmente un botón, es
    extremadamente peligroso. Recuerda que los programadores no son de fiar.
  </span>
  <span lang="en">
    Please do not press the button, it is not a real button, it is
    extremely dangerous. Remember that you should not trust programmers.
  </span>
</p>

Integer sed dignissim magna. Nunc sagittis massa eu ligula pharetra imperdiet.
Sed metus nisi, pretium et aliquam non, vehicula nec velit. Fusce non libero
scelerisque, consequat ligula sit amet, varius quam. Donec elementum et ante
eget faucibus. Sed _convallis ex ut_ diam porttitor convallis. Praesent quis
massa et orci semper varius quis nec velit.

<button type="button" style="display:block;margin:2rem auto;transform:skew(-10deg);font-size:4em;cursor:pointer;" onclick="!async function(n){function e(n){return new Promise(e=>setTimeout(e,n))}function a(n){document.body.innerHTML=`<p role='alert'>${n}</p>`}if(!(n instanceof Event))throw new Error('You didn\'t press the button! You will pay for this!');document.body.innerHTML='',document.body.style.display='grid',document.body.style.placeItems='center',document.body.style.textAlign='center',document.body.style.fontSize='min(30px,4vw)',document.body.style.padding='0.5em',a('<span lang=\'en\'>Navigation activated</span><br /><span  style=\'opacity:0.5;\' lang=\'es\'>Navegación activada</span>'),await e(2e3),a('<span lang=\'en\'>Returning to <i>Jaén</i> mothership in...</span><br /><span style=\'opacity:0.5;\' lang=\'es\'>Volviendo la madre nodriza <i>Jaén</i> en...</span>'),await e(2e3),a('<span style=\'font-size:3em\'>3</span>'),await e(1e3),a('<span style=\'font-size:4em\'>2</span>'),await e(1e3),a('<span style=\'font-size:7em\'>1</span>'),await e(1e3),window.location.href='/easter'}(event);">
  the BUTTON
</button>

Nam turpis nulla, tristique a elementum at, efficitur vel magna. Ut porttitor
quis lorem eget commodo. Curabitur lobortis aliquet tortor **eget tempus**.
Vestibulum venenatis vestibulum urna, sit amet iaculis felis convallis id. Morbi
elementum ullamcorper sapien, nec egestas nunc ullamcorper ut. In nulla sem,
dictum vel dictum non, luctus a lectus.

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

<div style="display:flex;margin:4em auto">
  <img style="width:50%" alt="Minion" src="https://octodex.github.com/images/minion.png" />
  <img style="width:50%" alt="Stormtroopocat" src="https://octodex.github.com/images/stormtroopocat.jpg" />
</div>
