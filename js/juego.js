var Juego = {
  anchoCanvas: //definir el ancho de nuestro canvas, que no sea menor a 3000 (no lleva medida, es decir omitir px, em, etc),
  altoCanvas: //definir el altoo de nuestro canvas, alrededor de 640 está bien,
  canvas: //llamar a la clase que tiene definido el canvas,
  jugador: //designar la entidad de nuestro jugador,
  decoraciones: [
    //crear decoraciones como sol y nubes
  ],
  obstaculos: [
    //crear obstáculos
  ]
};

Juego.iniciarJuego = function() {
  Resources.load([
    "img/mario.png",
    "img/cloud.png",
    "img/sun.png",
    "img/piedra-1.png",
    "img/piedra-2.png"
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
}
Juego.comenzar = function() {

  //debemos inicializar el Canvas.
  //qué método tiene el canvas para inicializarse y  qué argumentos (propiedades) necesita?
  this.buclePrincipal();
}

Juego.buclePrincipal = function() {
  this.moverDecoraciones();
  this.dibujar();
  requestAnimationFrame(this.buclePrincipal.bind(this));
}

Juego.dibujar = function() {

  canvas.borrarAreaDeJuego();
  //dibujar el cielo, es sólo un rectángulo de color "#2196f3", que ocupa todo el ancho del canvas y solo la mitad del alto. Fijate en Escenario si no hay un método que pueda ayudarte.

  //aquí deberíamos llamar a un método del objeto juego, que cree tantas líneas de calle como le pasemos por parámetro.
  //por ejemplo: this.crearCalle(100) creará 100 líneas de la calle.

  //Deberíamos dibujar a Mario??

  //por cada entidad tipo nube o sol (no sé que nombre le has puesto) y que hayas creado previamente en Juego.decoraciones deberas dibujarla. Piensa en el forEach, después de todo this.decoraciones es un array.
  
  //siguiendo el paso anterior, debes repetir la acción para cada obstáculo.

}

//esta función está comentada porque la funcionalidad no está genial, pero si quieres puedes descomentarla y arreglarla. En el caso de que quieras mover los elementos que están dentro de this.decoraciones (que serán de la clase que le hayas puesto) debes agregarles el método movimiento. 

// Juego.moverDecoraciones = function() {
//   this.decoraciones.forEach(function(decoracion) {
//     decoracion.movimiento();
//   })
// }

//esta es una función vital, es la que nos va a permitir impedir a mario avanzar en caso de chocarse con un obstáculo.
//la dejamos lista ya que no nos interesa tanto la lógica en este práctico.
Juego.colisiones = function(x, y) {
  var puedeMoverse = true;
  this.obstaculos.forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      obstaculo.chocar(this.jugador);
      puedeMoverse = false;
    } else {
      puedeMoverse = true;
    }
  }, this);
  return puedeMoverse;
}
Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x;
  var derecha1 = izquierda1 + elemento1.ancho;
  var techo1 = elemento1.y;
  var piso1 = techo1 + elemento1.alto;
  var izquierda2 = x;
  var derecha2 = izquierda2 + elemento2.ancho;
  var techo2 = y;
  var piso2 = y + elemento2.alto;

  return (
    piso1 >= techo2 &&
    techo1 <= piso2 &&
    derecha1 >= izquierda2 &&
    izquierda1 <= derecha2
  );
};

//deberías definir un método de Juego que cree las línea de la calle.

//esta función la dejamos lista, es para capturar las teclas del usuario. Fijate los datos que utiliza. No nos interesa tanto la lógica como que veas que hace con el jugador y que propiedad de éste busca para hacerlo avanzar.

Juego.capturarMovimiento = function(tecla) {
   var movX = 0;
   var movY = 0;
   var velocidad = this.jugador.velocidad;

   if (tecla == "izq") {
     movX = -velocidad;
   }
   if (tecla == "der") {
     movX = velocidad;
   }
   if (tecla == "arriba") {
     movY = -velocidad;
   }
   if (tecla == "abajo") {
     movY = velocidad;
   }
  //  this.jugador.mover(movX, movY);

  if (this.colisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    this.jugador.mover(movX, movY);
    if(tecla == 'der' || tecla == 'izq') {
      this.canvas.mover();
    }
  }
}
document.addEventListener("keydown", function(e) {
  var allowedKeys = {
    37: "izq",
    38: "arriba",
    39: "der",
    40: "abajo"
  };
  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});

Juego.iniciarJuego();


