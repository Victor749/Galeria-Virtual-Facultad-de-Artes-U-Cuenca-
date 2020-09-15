# `Galeria Virtual para la Facultad de Artes de la Universidad de Cuenca`

Este es el código fuente de un aplicación de Galería Virtual construida sobre React 360 para la Facultad de Artes
de la Universidad de Cuenca (Cuenca, Ecuador).

1. Pasos para Ejecutar

- Clone o descargue el código de este repositorio de Github.
- Para ejecutar este proyecto es necesario tener instalado NodeJS.
- Ejecute una línea de comandos desde el directorio raíz de este proyecto e ingrese el comando `npm install` para
instalar las dependencias necesarias.
- Luego ejecute `npm run bundle` para generar los archivos `.html` y `.js` que puede incluir dentro la aplicacion de Express `PrivateFacArtes`. Los archivos se generan en la carpeta  `build` de este proyecto. Incluir el archivo `index.html` en la carpeta `views` de `PrivateFacArtes` y cambiar su nombre a `appMuseo.ejs`. Incluir `index.bundle.js` y  `client.bundle.js` en la carpeta `public/javascripts` de `PrivateFacArtes` e indicar la ruta necesaria a los mismos en el script de inicialización de React 360 al final de `appMuseo.ejs`. Incluir las hojas de estilo y javascripts que se llaman desde `appMuseo.ejs` (estos recursos están en la carpeta `public` de `PrivateFacArtes`) en la carpeta `public` de `PrivateFacArtes` según corresponda e indicar las rutas a los mismos en `appMuseo.ejs`.

2. Autores

- Berenice Guerrero
- Víctor Herrera
- Pablo Solano

Estudiantes de Ingeniería en Sistemas de la Facultad de Ingeniería de la Universidad de Cuenca.



