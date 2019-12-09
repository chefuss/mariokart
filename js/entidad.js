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
  this.velocidad = 10;
  this.vidas = 4;
  this.topKey = false;
  this.rightKey = false;
  this.bottomKey = false;
  this.leftKey = false;
  this.mover = function() {
    if (this.topKey) {
      this.y -= this.velocidad * 2;
    }
    if (this.rightKey) {
      this.x += this.velocidad * 2;
    }
    if (this.bottomKey) {
      this.y += this.velocidad * 2;
    }
    if (this.leftKey) {
      this.x -= this.velocidad * 2;
    }
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