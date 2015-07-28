---
title: Soluciones para columnas con CSS
---

Un post muy cortito para aquellos que quieran crear un texto en HTML con varias columnas. Dejo dos soluciones sencillas.

## Si te da igual qué tiene cada columna

Si lo único que quieres es distribuir el texto en varias columnas y no te importa demasiado o no es importante el dónde se produce el salto de columna (a lo texto periodístico), utiliza este pequeño añadido que tiene css para estructurar el texto.

    article {
        text-align:     justify;
        max-width:      800px;
        margin:         auto;
        column-count:   3;
        column-gap:     25px;
    }

## Si el contenido exacto es importante

Si por el contrario te interesa poner un contenido concreto en cada columna lo mejor es separarlo en bloques distintos (además semánticamente es lo más lógico). Para esto crea una clase columna y aplícasela a cada una de ellas.

    body {
      text-align:   center;
    }
    .columna {
      text-align:       left;
      display:          inline-block;
      vertical-align:   top;

      /* Espaciado pensado para 4 columnas */
      width:    20%;
      padding:  1%;
      margin:   5% 0.5%;

      /* Cada uno trata el overflow como quiere ^^ */
      overflow: hidden;
    }

 - Enlace ejemplo 1 ~ [Demostración en jsBin](http://jsbin.com/ezayem/edit#html,live)
 - Enlace ejemplo 2 ~ [Demostración en jsBin](http://jsbin.com/epejen/2/edit#html,live)
 - Imagen ~ [Wallbase](http://wallbase.cc/wallpaper/1671149)
