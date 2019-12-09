# Mario Kart

## Instrucciones.

### Vamos a crear un juego al estilo de Mario Kart, la idea es podes aplicar los conceptos que aprendimos de clases y prototypos.

Veamos los archivos. 

1. Tenemos un index.html que se encargará de mostrar el juego.
2. La carpeta img/ tiene todas las imágenes que vamos a necesitar.
3. La carpeta css/ tiene los estilos.
4. La carpeta js/ es donde vamos a trabajar.


### Nuestro objetivo

Nuestro objetivo es que se muestre en la pantalla la Entidad Mario, unas nubes, el sol, el cielo y la ruta que debe recorrer

1. Escenario

El escenario es dónde se va a mostrar todo nuestro juego. Ya está lista por lo que no tenemos que hacer nada por ahí. 

2. Juego

Es el "controlador" de nuestro juego, es el que se encargará de llamar a los métodos según corresponda para cada objeto,o situación que se presente.

El código está comentado con lo que hay que hacer.

3. Entidades

Para ello debemos hacer uso de la clase Entidad que está en el archivo entidad.js
Todos los elemetos nube, mario, sol y obstáculos heredan de Entidad sus propiedades, pero tienen más propiedades o métodos distintos. Por lo que deberíamos evaluar crear nuevas clases que hereden de la instancia principal.
Para mantenerlo simple pueden crear estas nuevas instancias dentro del mismo archivo entidad.js, pero si lo desean también pueden crear nuevos archivos y linkearlos desde el html.


