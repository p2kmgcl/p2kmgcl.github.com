# Instalación y uso
Esta web está generada con [Harp](http://harpjs.com/), pero para su fácil
desarrollo puede compilarse y/o ser desarrollada mediante las órdenes incluídas
en el fichero Makefile:

 - **install**: Instala harp (instalará la última versión).
 - **develop**: Inicia harp para su desarrollo. En la propia consola informará de la
    url local disponible para visualizar la página.
 - **develop_c9**: Versión modificada de develop necesaria para desarrollar en la
    web c9.io. Especifica un puerto válido en dicho entorno.
 - **build**: Compila la aplicación en una carpeta denominada output donde se puede
    comprobar que todo el código se ha generado correctamente. Esta carpeta
    contendrá una página estática por lo que no es necesario un servidor para
    probarla.
 - **publish**: Ejecuta una compilación similar e integra los cambios en la rama
    master del repositorio dejandola lista para hacer un commit y publicarla.
    > **Importante**: los ficheros que se encuentren fueran de la carpeta app NO serán
    copiados automáticamente (p.ej. en el fichero Makefile se ve como se copia
    manualmente CNAME).

# Estructura de la web

 - La rama main contiene el código que genera la web.
 - La rama master contiene versiones estáticas de la web (creada exclusivamente
    para que github publique la página).

# Notas sobre Harp

 - Genera una página estática.
 - Compila automáticamente less, jade y coffeescript.
