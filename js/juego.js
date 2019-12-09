// Escenario.inicializarCanvas(961, 577);
// Escenario.dibujarEntidad(Mario);

var Juego = {
  anchoCanvas: 860,
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
  Escenario.canvas.getContext("2d").setTransform(1, 0, 0, 1, 0, 0);
  Escenario.canvas.getContext("2d").clearRect(0, 0, this.anchoCanvas, this.altoCanvas);

  this.moverDecoraciones();
  this.dibujar();
  requestAnimationFrame(this.buclePrincipal.bind(this));
}


Juego.dibujar = function() {

  Escenario.borrarAreaDeJuego();
  Escenario.dibujarRectangulo("#2196f3",0,0,this.anchoCanvas,this.altoCanvas / 2);

  this.crearCalle(26);

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

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") {
    Mario.topKey = true;
  } else if (e.key === "ArrowRight") {
    Mario.rightKey = true;
  } else if (e.key === "ArrowDown") {
    Mario.bottomKey = true;
  } else if (e.key === "ArrowLeft") {
    Mario.leftKey = true;
  }
  Mario.mover();
});

document.addEventListener("keyup", e => {
  if (e.key === "ArrowUp") {
    Mario.topKey = false;
  } else if (e.key === "ArrowRight") {
    Mario.rightKey = false;
  } else if (e.key === "ArrowDown") {
    Mario.bottomKey = false;
  } else if (e.key === "ArrowLeft") {
    Mario.leftKey = false;
  }
});

Juego.iniciarJuego();


