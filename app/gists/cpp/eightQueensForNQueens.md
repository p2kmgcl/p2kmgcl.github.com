```cpp
class OchoReinas {
public:
    OchoReinas(int tamTablero, int maxSoluciones);
private:
    void colocar(int posiciones[], int tamTablero, int reinaActual,
                 int* numSoluciones, int maxSoluciones);
    bool hayJaque(int posiciones[], int reinaActual);
    void mostrarSolucion(int posiciones[], int tamTablero);
};
```

```cpp
/**
 * Inicia el algoritmo de las ocho reinas
 * @param tamTablero Tamaño del tablero (minimo 4).
 * @param numSoluciones Cantidad de soluciones a calcular (0 para todas).
 */
OchoReinas::OchoReinas(int tamTablero, int maxSoluciones) {
    tamTablero = (tamTablero < 4) ? 4 : tamTablero;
    maxSoluciones = (maxSoluciones < 0) ? 0 : maxSoluciones;
    
    int posiciones[tamTablero];
    int numSoluciones = 0;

    for (unsigned int i = 0; i < tamTablero; i++) {
        posiciones[i] = 0;
    }

    colocar(posiciones, tamTablero, 0, &numSoluciones, maxSoluciones);
    cout << "\nSe han generado " << numSoluciones << " soluciones." << endl;
}

/**
 * Busca la siguiente reina a colocar en el tablero recursivamente.
 * @param posiciones Estado actual del tablero.
 * @param tamTablero Tamaño del tablero.
 * @param reinaActual Reina desde a que se parte (inicialmente 0).
 * @param numSoluciones Soluciones ya calculadas (inicialmente 0).
 * @param maxSoluciones Cantidad de soluciones que se desean calcular.
 *  El algoritmo se detendrá al llegar a este límite. Indicar 0 para calcular
 *  todas las soluciones.
 */
void OchoReinas::colocar(int posiciones[], int tamTablero, int reinaActual,
                         int* numSoluciones, int maxSoluciones) {

    if ((*numSoluciones < maxSoluciones) || maxSoluciones == 0) {
        if (reinaActual == tamTablero) {
            (*numSoluciones)++;
            mostrarSolucion(posiciones, tamTablero);
        } else {
            for (unsigned int i = 0; i < tamTablero; i++) {
                posiciones[reinaActual] = i;            
                if (!hayJaque(posiciones, reinaActual)) {
                    colocar(posiciones, tamTablero, reinaActual + 1,
                            numSoluciones, maxSoluciones);
                }
            }
        }
    }
}

bool OchoReinas::hayJaque(int posiciones[], int reinaActual) {
    for (unsigned int i = 0; i < reinaActual; i++) {
        // Jaque en filas/columnas
        if (posiciones[i] == posiciones[reinaActual]) {
            return true;
        }
    
        // Jaque en diagonales
        if (abs((int)(posiciones[i] - posiciones[reinaActual])) ==
            abs((int)(i - reinaActual))) {
            return true;
        }
    }
    
    return false;
}

void OchoReinas::mostrarSolucion(int posiciones[], int tamTablero) {
    cout << "\nSolución: [";
    
    for (unsigned int i = 0; i < tamTablero - 1; i++) {
        cout << posiciones[i] + 1 << ", ";
    }
    cout << posiciones[tamTablero - 1] + 1 << "]\n";
    
    for (unsigned int i = 0; i < tamTablero; i++) {
        cout << "| ";
        for (unsigned int j = 0; j < tamTablero; j++) {
            if (posiciones[j] == i) {
                cout << "· ";
            } else {
                cout << "0 ";
            }
        }
        cout << "|" << endl;
    }
}
```

```cpp
OchoReinas ochoReinas(8, 0);
```
