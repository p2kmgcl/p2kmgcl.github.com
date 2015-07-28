---
title: Antes de saludar al mundo
---

Muchas guías empiezan con una típica "presentación" al lenguaje que vamos a aprender con un texto tal que así:

    #include <stdio.h>

    int main(){
        printf("Hola Mundo");
        return 0;
    }

Pero antes de nada hay que preguntar: ¿qué son todas esas letras? ¿qué son esos comandos y por qué se colocan de esa manera? En esta entrada voy a hacer una introducción al lenguaje de programación C y a la programación en general.

## ¿Qué es un lenguaje de programación?

Según la wikipedia:
 > Un lenguaje de programación es un idioma artificial diseñado para expresar computaciones que pueden ser llevadas a cabo por máquinas como las computadoras. Pueden usarse para crear programas que controlen el comportamiento físico y lógico de una máquina, para expresar algoritmos con precisión, o como modo de comunicación humana.1 Está formado por un conjunto de símbolos y reglas sintácticas y semánticas que definen su estructura y el significado de sus elementos y expresiones. Al proceso por el cual se escribe, se prueba, se depura, se compila y se mantiene el código fuente de un programa informático se le llama programación.

Esto es, un lenguaje de programación no es más que una serie de instrucciones que nosotros escribimos y que un ordenador es capaz de ejecutar cuantas veces se quiera.

Es importante que para que un lenguaje sea considerado "de programación" debe poder tener diferentes salidas en función de los parámetros de entrada que se le pase, por ello un lenguaje como HTML no es programado, ya que su función no es procesar datos, sino añadir información semántica a un texto.


## Tipos de lenguajes

### Según su ejecución

En general existen dos tipos de lenguajes de programación: los compilados y los interpretados. (También existen lenguajes semicompilados pero eso es algo que se escapa de la introducción).

Su diferencia reside en qué es lo que tenemos que hacer con el código (véase el de más arriba) una vez que lo tenemos escrito, formando la siguiente clasificación.

#### Compilados

Existen unos programas llamados compiladores que se encargan de traducir la información de nuestro programa al lenguaje de los ordenadores: el sistema de numeración binario. De forma que lo transforma en un ejecutable repleto de unos y ceros que resulta ilegible y no digamos escribible para un ser humano. Este tipo de lenguajes guardan la ventaja de ocupar un espacio mínimo una vez compilados, pero la desventaja de que a no ser que aportemos el código fuente será imposible que otros vean como está hecho. Además para la mayoría de los lenguajes compilados necesitaremos una compilación distinta según el entorno en el que ejecutemos el programa (Windows, MACOS o Linux, 32 o 64 bits, MAC o PC... ).

 > Los que no requieran distintas compilaciones serán llamados multiplataforma.

#### Interpretados

Estos lenguajes precisan de un intérprete que examina su contenido y lo ejecuta linealmente, obteniendo el resultado del programa desde el código fuente.

### Según sus variables

Según la forma en la que el lenguaje *trata* a sus variables, distinguimos entre lenguajes tipados y no tipados. Bien, para comprender está clasificación solo tenéis que saber que una variable no es más que *algo* que guarda un dato (después ahondaremos más en este asunto). Por ejemplo en C:

    int    var1 = 12;
    string var2 = "Hola";

En este ejemplo la variable `var1` tiene en su interior un número entero, el valor `12` y la variable `var2` tiene una cadena de caracteres con el valor `Hola`. Cada una en su declaración (primera vez que escribimos la variable tiene escrito el tipo de variable. Sin embargo en JavaScript:

    var var1 = 12;
    var var2 = "Hola";

No es necesario declarar de qué tipo es nuestra variable, sino que lo interpreta según el valor que tenga. En este ejemplo var1 y var2 siguen siendo de tipos entero y cadena, sólo que no tenemos que declararlo. Además al ejecutar el siguiente código en cada uno de los lenguajes (asignar el valor de var2 a var1):

    var1 = var2;

En C nos daría un error por ser variables de distinto tipo, sin embargo en JavaScript se haría sin problema y var1 pasaría a ser una variable entera con el valor 12.
Aparentemente parece que la forma más sencilla de programar es usando un lenguaje no tipado como JavaScript y olvidarnos del tipo de variable pero existen varias razones por las que podemos apostar por un lenguaje tipado:

 - Organización: este es el tema menos importante pero al leer nuestro código, resulta más fácil que el lenguaje nos "obligue" a ser ordenados con nuestras variables, no cambiando continuamente el tipo de ésta.
 - Optimización: es cierto que un lenguaje no tipado está optimizado para que no existan errores en cuanto a las variables pero, ¿qué ocurre si estamos diseñando un programa para una máquina con pocos recursos? o ¿qué pasa si nuestro programa usa una enorme cantidad de memoria y queremos reducirla todo lo posible? Un lenguaje tipado nos permite usar el tipo de variable que queramos para que estemos usando la memoria precisa para guardarla, mientras que en uno no tipado tendremos que ingeniárnoslas para que las variables se almacenen como queramos.

Además los lenguajes tipados tienen funciones que nos permiten convertir un dato a otro tipo para así poder obtener una nueva variable (NO cambiar el tipo de variable, SÍ crear una nueva).

**Notas interesantes**

 > - C, siendo un lenguaje tipado, nos permite optimizar hasta tal punto que podemos crear variables que usen bloques de memoria del tamaño que nos de la gana (dentro de la disponible), desde un simple bit, hasta cientos o miles de megabytes.
 > - Hay lenguajes que consienten cierta conversión de variables, como la de pasar números enteros a reales (pero no al revés).
 > - En los lenguajes no tipados, ¡cuidado con la declaración de tus variables! una variable `var = 12` será de tipo entero, pero una `var = 12.0` será de tipo real (datos que ocupan el doble de memoria).
