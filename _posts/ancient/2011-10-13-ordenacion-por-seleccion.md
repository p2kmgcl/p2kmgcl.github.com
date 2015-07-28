---
title: Ordenación por selección
---

Este algoritmo de eficiencia lineal es adecuado para conjuntos relativamente pequeños. Hace n (número de elementos del vector) pasadas eliminando en cada una el elemento más pequeño encontrado y colocándolo al principio.

## Implementación en C (enteros)

    /**
     * @brief Procedimiento para ordenacion por seleccion genérica
     * @param vector Vector de elementos para ordenar
     * @param tamv Número de elementos del vector
     */
    void ordenacion_Seleccion(int *v, int tamv){
        int i,j;                //< Variables contador
        int posmin;             //< Posición del próximo elemento que se cambiará
        int min;                //< Variable auxiliar para cambiar un elemento

        for(i=0;i<tamv-1;i++){
            min=v[i];
            posmin=i;
            for(j=i+1;j<tamv;j++){
                if(v[j]<min){
                    min=v[j];
                    posmin=j;
                }
            }
            v[posmin]=v[i];
            v[i]=v[min];
        }
    }

## Implementación en C (genérico)

    /**
     * @brief Procedimiento para ordenacion por seleccion genérica
     * @param vector Vector de elementos para ordenar
     * @param tama Tamaño del elemento del vector
     * @param tamv Número de elementos del vector
     * @param fcomp Función de comparación de los elementos
     */
    void ordenacion_Seleccion(const void *v, int tama, int tamv, int (*fcomp)(const void *a, const void *b)){
        int i,j;                //< Variables contador
        int posmin;             //< Posición del próximo elemento que se cambiará
        const void *min;        //< Variable auxiliar para cambiar un elemento
        min=(void*)malloc(tama);

        for(i=0;i<tamv-1;i++){
            memcpy((void*)min,v+(tama*i),tama);
            posmin=i;
            for(j=i+1;j<tamv;j++){
                if(fcomp(v+(tama*j),min)<0){
                    memcpy((void*)min,v+(tama*j),tama);
                    posmin=j;
                }
            }
            memcpy((void*)(v+(posmin*tama)),v+(i*tama),tama);
            memcpy((void*)(v+(i*tama)),min,tama);
        }
    }
