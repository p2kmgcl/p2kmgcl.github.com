---
title: Radix Sort
---

La ordenación Radix se basa en la clasificación de los datos que queremos ordenar por una clave. Dicha clave ha de ser una característica de cada dato que pueda ser descompuesta el elementos más pequeños que permitan clasificar los elementos poco a poco. Suponiendo los números enteros, la clave se tomaría como las cifras.

## Explicación

Supongamos un vector de elementos sencillo con números del 0 al 99 que queremos ordenar, como por ejemplo `91 35 25 79 17 1`.

## Primer paso: Creando las cubetas

Para ordenar los elementos tenemos que crear un número finito de cubetas, de forma que en cada cubeta los elementos estén relacionados por la clave y que así podamos separarlos. Por ello en nuestro caso, como la clave son las cifras de los elementos, creamos 10 cubetas, la cubeta 0, 1, 2, etc...

## Segundo paso: Obteniendo la clave

Ahora tenemos que recorrer el vector entero colocando cada uno de los elementos en una de las cubetas observando su clave. ¿Cómo obtenemos dicha clave? Sabiendo que cada elemento puede tener como máximo 2 cifras, la primera clasificación ha de ser por la menos significativa: las unidades.

Para obtener las unidades de un número entero:

    76 -> 76 % 10 = 6

Y las decenas:

    76 -> 76 % 100 = 7

Y si nos pasamos:

    76 -> 76 % 1000 (o más) = 0

Por si alguien está extrañado con ese '%', 'a%b' nos da el resto de dividir a entre b, ahora sigamos ^^

## Tercer paso: Rellenando las cubetas, primera clasificación

Ya que sabemos como obtener la clave, tenemos que ir organizando los números por su clave y rellenando las cubetas. En la primera pasada observaremos las unidades de los números, de forma que las cubetas se asignarían de la siguiente forma:

    0:
    1: 91, 1
    2:
    3:
    4:
    5: 35, 25
    6:
    7: 17
    8:
    9: 79

Al concatenar las cubetas el vector quedaría de la siguiente forma: `91 1 35 25 17 79`

Parece que el vector no ha quedado muy ordenado, pero en la siguiente pasada veréis como queda perfectamente ordenado.

## Último paso: Repitiendo el proceso

Como último paso nos queda repetir el tercer paso tantas veces como elementos puedan separarse de las claves, es decir, en nuestro caso repetiríamos el proceso una única vez más, hasta las decenas. En la segunda pasada las cubetas quedarían así:

    0: 1
    1: 17
    2: 25
    3: 35
    4:
    5:
    6:
    7: 79
    8:
    9: 91

Y como vemos el vector queda perfectamente ordenado: `1 17 25 35 79 91`

## Demostración en C

    /****************************************************************
    * PROCEDIMIENTO RADIX SORT
    ***************************************************************/

    typedef struct{
            int *num;   ///< Vector de elementos
            int tam;    ///< Numero de lementos insertados en la urna
            int max;    ///< Maximo de elementos en la urna
    }Turna;

    int mayor(int *v, int tamv){
        int max=v[0],i;
        for(i=1;i<tamv;i++)
            if(max<v[i])
                max=v[i];
        return max;
    }

    Turna urna_Insertar(int num, Turna urna){
        if(urna.tam==0){
            urna.num=(int*)malloc(2*sizeof(int));
            urna.num[urna.tam]=num;
            urna.tam=1;
            urna.max=2;
        }else{
            if((urna.tam+1)==urna.max){
                urna.max*=2;
                urna.num=(int*)realloc(urna.num,urna.max*sizeof(int));
            }
            urna.num[urna.tam]=num;
            urna.tam++;
        }
        return urna;
    }

    Turna urna_Concatenar(Turna u1, Turna u2){
        Turna u3;
        int i,j=0;

        u3.tam=u1.tam+u2.tam;
        u3.num=(int*)malloc(u3.tam*sizeof(int));
        for(i=0;i<u1.tam;i++){
            u3.num[j]=u1.num[i];
            j++;
        }
        for(i=0;i<u2.tam;i++){
            u3.num[j]=u2.num[i];
            j++;
        }
        return u3;
    }

    void ordenacion_RadixSort_Enteros(int *v, int tamv){
        int aux=mayor(v,tamv);   //< Mayor elemento de v
        int n_digitos=0;        //< Número de urnas
        int peso,d;
        int i,j;                //< Variables contador
        Turna urnas[10];        //< Vector de urnas (0 para unidades, 1 para decenas...)

        while(aux>=1){
            aux/=10;
            n_digitos++;
        }
        peso=1;
        for(i=0;i<n_digitos;i++){
            for(j=0;j<10;j++){
                urnas[j].max=0;
                urnas[j].tam=0;
                if(i!=0)
                    free(urnas[j].num);
                    urnas[j].num==NULL;
            }
            for(j=0;j<tamv;j++){
                d=(v[j]/peso)%10;
                urnas[d]=urna_Insertar(v[j],urnas[d]);
            }
            for(j=1;j<=9;j++)
                urnas[0]=urna_Concatenar(urnas[0],urnas[j]);
            for(j=0;j<tamv;j++)
                v[j]=urnas[0].num[j];
            peso*=10;
        }
    }
