---
title: Obteniendo una web mediante un script
---

Hoy mi novia me ha dicho que estaba copiando el texto de una web para que su padre tuviera unos apuntes offline en un documento de texto. Sorpresa la mía cuando he visto que dicha web tenía 11 secciones, y cada sección tenía unos 30 capítulos dentro (vamos que estaba mas cerca de quedarse sin mano que de copiarla entera).

El caso es que he visto que la url tenía siempre la misma estructura, así que he hecho un script que le ha descargado la estructura de documentos para poder leerlos sin problemas:

    #!/bin/csh

    @ seccion = 1
    @ capitulo = 1
    set url1 = "http://www.eccpn.aibarra.org/temario/seccion"
    set url2 = "/capitulo"
    set url3 = "/capitulo"
    set url4 = ".htm"

    while ( $seccion < 15 )
        mkdir "Seccion $seccion"
        echo "Sec $seccion"
        @ capitulo = 1
        while ( $capitulo < 200 )
            echo "Cap $capitulo"
            wget --quiet ${url1}${seccion}${url2}${capitulo}${url3}${capitulo}${url4} -O "Seccion ${seccion}/Capitulo${capitulo}.htm"
            @ capitulo = $capitulo + 1
        end
        @ seccion = $seccion + 1
    end
