---
type: post
draft: false
title: Moviendo el foco
language: es
date: 2022-07-27
emoji: 🎯
mood: Contento por haber aprendido cosas nuevas de accesibilidad.
tags: []
summary: >
  Tenemos un botón que abre cierra un menú lateral, y lo lógico sería que al
  tabular en el botón el foco sale al menú que se ha abierto. Sin embargo, ambos
  elementos están en lugares separados del DOM, así que el orden de los
  elementos no sigue ese patrón.
---

### Primera solución (fallida)

> Jugando con valores de `tabindex > 0` puestos de forma dinámica, hacer que el
> foco salte correctamente entre estos elementos como se espera.

Si fueran los dos únicos elementos de la página podría ser una buena solución,
pero como no es el caso, calcular qué índices son los correctos solo daría lugar
a problemas.

### Segunda solución (fallida)

> Mover el foco manualmente cuando se hace _blur_ en el botón.

Al intentar implementar esta solución me he encontrado dos problemas: el primero
es que el menú que se abre no es focuseable, entonces tendría que añadirle un
`tabindex="-1"` (bien vía JS o en el HTML) para después hacer foco en el
elemento. Si implementara esta solución, estaría bien lanzar un mensaje
`aria-live="assertive"` informando de que vamos a mover el foco.

El segundo problema es que esta navegación se hace de forma automática al sacar
el foco el botón, lo cual puede ser molesto si lo que se quiere hacer es moverse
por los distintos botones en lugar de saltar al menú abierto.

### Tercera solución

> Poner un enlace a continuación del botón, que solo sea visible al hacer foco
> con el teclado, y que permita mover el foco (opcionalmente) al menú.

Como suele ocurrir con temas de accesibilidad, resulta que apoyarse más en el
marcado HTML que en comportamientos personalizados por JavaScript es la solución
más sencilla y más resultona.

Resulta que podemos plantar un enlace justo después del botón que abre/cierra el
menú, y hacer que este enlace:

1. Solo exista si el menú está abierto (con JavaScript).
1. Apunte al menú (`href="#menu"`).
1. Solo sea visible al hacer foco.

> Resulta que cuando un elemento tiene un atributo `id`, se puede hacer foco
> sobre el mismo de esta forma, sin necesidad de utilizar `tabindex`.

De esta manera el usuario se encontrará un enlace con el cual puede navegar
cómodamente al menú que acaba de abrirse, pero además puede ignorarlo y seguir
con la navegación principal si así lo desea. La implementación es mucho más
sencilla y la funcionalidad es la misma (o incluso mejor) que en el caso
anterior.

### Cosas pendientes

1. En este caso concreto, el menú que se abre es uno de los sistemas de
   navegación principales del sitio, así que tendría sentido crear una menú de
   navegación accesible que incluya varios enlaces. Véase este
   [ejemplo de Marcos](https://codepen.io/marcoscv/pen/owjKBw) o la
   [tabla de contenidos de la web de ayuda de apple](https://support.apple.com/es-co/guide/voiceover/unac048/mac).
2. Una vez que se ha navegado al menú, es difícil mover el foco de nuevo al
   botón que lo abre/cierra, quizás tendría sentido añadir un enlace de vuelta o
   dar algún otro mecanismo para salir de esta zona.

```html
<main id="wrapper">
  <aside aria-hidden="true" id="asideMenu">
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </aside>

  <section id="content">
    <header>
      <nav id="mainMenu">
        <button id="toggleAsideMenuButton" type="button">
          Toggle aside menu
        </button>
        <a aria-hidden="true" class="focus-only" href="#asideMenu">
          Skip to aside menu
        </a>
        <button id="sayHiButton" type="button">Say hi</button>
      </nav>
    </header>
  </section>
</main>

<style>
  [aria-hidden='true'] {
    display: none;
  }

  .focus-only {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }

  .focus-only:focus,
  .focus-only:focus-within {
    opacity: initial;
    position: initial;
    pointer-events: initial;
  }

  #wrapper {
    display: flex;
    height: 100vh;
  }

  #content {
    flex-grow: 1;
  }

  #mainMenu {
    background-color: lightblue;
    padding: 1em;
  }

  #asideMenu {
    background-color: antiquewhite;
    padding: 0 2em 0 0;
  }
</style>

<script type="module">
  document
    .getElementById('toggleAsideMenuButton')
    .addEventListener('click', (event) => {
      const asideMenu = document.getElementById('asideMenu');
      const asideMenuLink = event.target.nextElementSibling;

      if (asideMenu.hasAttribute('aria-hidden')) {
        asideMenu.removeAttribute('aria-hidden');
        asideMenuLink.removeAttribute('aria-hidden');
      } else {
        asideMenu.setAttribute('aria-hidden', 'true');
        asideMenuLink.setAttribute('aria-hidden', 'true');
      }
    });

  document.getElementById('sayHiButton').addEventListener('click', () => {
    alert('Hi!');
  });
</script>
```
