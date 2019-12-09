function Entidad(imagen, posx, posy, ancho, alto) {
  this.imagen = imagen;
  this.x = posx;
  this.y = posy;
  this.ancho = ancho;
  this.alto = alto;
}

//===================

function Jugador(imagen, posx, posy, ancho, alto) {
  Entidad.call(this, imagen, posx, posy, ancho, alto);
  this.velocidad = 25;
  this.vidas = 4;
  this.mover = function(movX, movY) {
    this.x += movX;
    this.y += movY;
  };
  this.perderVidas = function(cantidadVidas) {
    this.vidas -= cantidadVidas;
  }
}
Jugador.prototype = Object.create(Entidad.prototype);
Jugador.prototype.constructor = Jugador;

var Mario = new Jugador("img/mario.png", 30, 350, 119, 127);

//===================

function Decoraciones(imagen, posx, posy, ancho, alto, velocidad) {
  Entidad.call(this, imagen, posx, posy, ancho, alto);
  this.velocidad = velocidad;
  //aca tendríamos que agregar movimiento a cada decoración (sol y nubes);
  this.movimiento = function() {
    this.x += this.velocidad;
    this.velocidad *= 1;
  }
}
Decoraciones.prototype = Object.create(Entidad.prototype);
Decoraciones.prototype.constructor = Decoraciones;

// var sol = new Decoraciones("img/sun.png", 10, 40, 120, 120, 30);
// var nubeGrande = new Decoraciones("img/cloud.png", 30, 30, 283, 196, 40);
// var nubeChica = new Decoraciones("img/cloud.png", 10, 10, 283 / 2, 196 / 2, 35);

var Obstaculo = function(imagen, x, y, ancho, alto, potencia) {
  Entidad.call(this, imagen, x, y, ancho, alto);
  this.potencia = potencia;
  this.chocar = function(jugador) {
    jugador.perderVidas(this.potencia);
    this.potencia = 0;
  }
}
