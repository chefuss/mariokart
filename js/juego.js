// Escenario.inicializarCanvas(961, 577);
// Escenario.dibujarEntidad(Mario);

var Juego = {
  anchoCanvas: 1860,
  altoCanvas: 640,
  jugador: Mario,
  decoraciones: [
    new Decoraciones("img/cloud.png", 30, 30, 283, 196, 0.42),
    new Decoraciones("img/sun.png", 10, 40, 120, 120, 0.1),
    new Decoraciones("img/cloud.png", 10, 10, 283 / 2, 196 / 2, 0.15)
  ],
  teclas : {
    arriba: false,
    abajo: false,
    derecha: false,
    izquierda: false
  }
};

Juego.iniciarJuego = function() {
  Resources.load([
    "img/mario.png",
    "img/cloud.png",
    "img/sun.png"
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
}
Juego.comenzar = function() {
  Escenario.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  this.buclePrincipal();
}

Juego.buclePrincipal = function() {
  this.moverDecoraciones();
  this.dibujar();
  requestAnimationFrame(this.buclePrincipal.bind(this));
}


Juego.dibujar = function() {

  Escenario.borrarAreaDeJuego();
  Escenario.dibujarRectangulo("#2196f3",0,0,this.anchoCanvas,this.altoCanvas / 2);

  this.crearCalle(96);

  Escenario.dibujarEntidad(Mario);

  this.decoraciones.forEach(function(decoracion) {
    Escenario.dibujarEntidad(decoracion);
  })
  
}
Juego.moverDecoraciones = function() {
  this.decoraciones.forEach(function(decoracion) {
    decoracion.movimiento();
  })
}

Juego.crearCalle = function(cantidadLineas) {
  var distancia = 0;
  for (var i = 0; i < cantidadLineas; i++) {
    Escenario.dibujarRectangulo("white", 65 + distancia , 430, 30, 10);
    distancia += 50;
  }
}
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
   this.jugador.mover(movX, movY);
   Escenario.canvas.getContext("2d").translate(-Juego.jugador.velocidad, 0);
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


