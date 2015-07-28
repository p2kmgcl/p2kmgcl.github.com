---
title: Búsqueda Binaria Iterativa
---

## Datos

 - Eficiencia logarítmica.
 - Comprueba el elemento de la mitad del conjunto, si no es el buscado, se deshace de la mitad del vector y busca nuevamente en la mitad.
 - El conjunto de datos tiene que estar ordenado
 - Adecuado para conjuntos grandes de elementos

## Algoritmo

    Función Búsqueda_Binaria (x:Telemento; A:Tconjunto, tam:Entero): Tposicion;
    Variables
        bajo, alto, mitad: Entero;
    Inicio
        bajo<-A[1];
        alto<-tam;
        encontrado<-falso;
        Mientras (bajo<=alto) hacer
            mitad<-pos_central(A, bajo, alto);
            Si x==A[mitad] Entonces
                Devolver mitad;
            Si_No
                Si x<A[mitad] Entonces
                    alto<-mitad-1
                Si_No
                    bajo<-mitad+1
                Fin_Si
            Fin_Si
        Fin_Mientras
    Fin.


## Implementación en C (enteros)

    /**
     * @brief Funcion de búsqueda binaria iterativa para enteros
     * @param a Elemento a buscar
     * @param vector Vector de elementos donde buscar (ha de
     *  estar ordenado)
     * @param tamv Número de elementos del vector
     * @return Devuelve la posición del elemento si lo
     *  encuentra, -1 si no.
     */
    int busqueda_Binaria(int *a, int *vector, int tamv){
        int bajo = 0;        //< Posición más baja para buscar
        int alto = tamv - 1; //< Posición más alta para buscar
        int mitad;           //< Mitad del vector
        int encontrado = 0;  //< Se pone a uno si se encuentra
                             //< el elemento

        while(bajo <= alto && !encontrado) {
            mitad = (alto + bajo) / 2;

            if (a == vector[mitad]) {
                encontrado = 1;
            } else if (a < vector[mitad]) {
                alto = mitad - 1;
            } else {
                bajo = mitad + 1;
            }
        }

        return (encontrado) ? mitad : -1;
    }

## Implementación en C (genérico)

    /**
     * @brief Funcion de búsqueda binaria iterativa genérica
     * @param a Elemento a buscar
     * @param vector Vector de elementos donde buscar (ha de estar ordenado)
     * @param tama Tamaño del elemento del vector
     * @param tamv Número de elementos del vector
     * @param fcomp Función de comparación de los elementos
     * @return Devuelve la posición del elemento si lo encuentra, -1 si no.
     */
    int busqueda_Binaria(const void *a, const void *vector, int tama, int tamv, int (*fcomp)(const void *a, const void *b)){
        int bajo;           //< Posición más baja para buscar
        int alto;           //< Posición más alta para buscar
        int mitad;          //< Mitad del vector
        int encontrado=0;   //< Se pone a uno si se encuentra el elemento

        bajo=0;
        alto=tamv-1;
        while((bajo<=alto)&&(!encontrado)){
            mitad=(alto+bajo)/2;
            if(fcomp(a,vector+(mitad*tama))==0)
                encontrado=1;
             else if(fcomp(a,vector+(mitad*tama))<0)
                    alto=mitad-1;
                else
                    bajo=mitad+1;
        }
        if(encontrado)
            return mitad;
        else
            return -1;
    }
