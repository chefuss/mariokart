// Escenario.inicializarCanvas(961, 577);
// Escenario.dibujarEntidad(Mario);

var Juego = {
  anchoCanvas: 1860,
  altoCanvas: 640,
  canvas: Escenario,
  jugador: Mario,
  decoraciones: [
    new Decoraciones("img/cloud.png", 30, 30, 283, 196, 0.02),
    new Decoraciones("img/sun.png", 10, 40, 120, 120, 0.03),
    new Decoraciones("img/cloud.png", 10, 10, 283 / 2, 196 / 2, 0.05)
  ],
  obstaculos: [
    new Obstaculo("img/piedra-1.png", 530, 450, 90, 90, 2),
    new Obstaculo("img/piedra-2.png", 630, 300, 90, 90, 2),
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

  this.obstaculos.forEach(function(obstaculo) {
    Escenario.dibujarEntidad(obstaculo);
  })
}

Juego.moverDecoraciones = function() {
  this.decoraciones.forEach(function(decoracion) {
    decoracion.movimiento();
  })
}
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


