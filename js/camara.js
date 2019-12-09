function MapRegion(img) {
  this.img = img;
  this.w = img.width;
  this.h = img.height;
  this.draw = function(ctx) {
    ctx.drawImage(this.img, 0, 0);
  }
}
function Player(x, y, w, h) {
  topKey = false;
  rightKey = false;
  bottomKey = false;
  leftKey = false;

  this.w = w || 30;
  this.h = h || 40;
  // This is where the player will spawn relative to the map
  this.x = x || this.w;
  this.y = y || this.h;
  this.update = function(map) {
    this.move();
    // Optional, so they don't walk out of map boundaries
    this.enclose(map);
  }
  this.move = function() {
    if (this.topKey) {
      this.y -= 2;
    }
    if (this.rightKey) {
      this.x += 2;
    }
    if (this.bottomKey) {
      this.y += 2;
    }
    if (this.leftKey) {
      this.x -= 2;
    }
  }
  this.enclose = function(map) {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > map.w - this.w) {
      this.x = map.w - this.w;
    }

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > map.h - this.h) {
      this.y = map.h - this.h;
    }
  }
  this.draw = function(ctx) {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
function Camera (x, y) {
  // x and y are top-left coordinates of the camera rectangle relative to the map.
  // This rectangle is exctaly cvs.width px wide and cvs.height px tall.
  this.x = x || 0;
  this.y = y || 0;
  this.focus = function(cvs, map, player) {
    // Account for half of player w/h to make their rectangle centered
    this.x = this.clamp(
      player.x - cvs.width / 2 + player.w / 2,
      0,
      map.w - cvs.width
    );
    this.y = this.clamp(
      player.y - cvs.height / 2 + player.h / 2,
      0,
      map.h - cvs.height
    );
  }
  this.clamp = function(coord, min, max) {
    if (coord < min) {
      return min;
    } else if (coord > max) {
      return max;
    } else {
      return coord;
    }
  }
}

function Controls(player) {
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") {
      player.topKey = true;
    } else if (e.key === "ArrowRight") {
      player.rightKey = true;
    } else if (e.key === "ArrowDown") {
      player.bottomKey = true;
    } else if (e.key === "ArrowLeft") {
      player.leftKey = true;
    }
  });

  document.addEventListener("keyup", e => {
    if (e.key === "ArrowUp") {
      player.topKey = false;
    } else if (e.key === "ArrowRight") {
      player.rightKey = false;
    } else if (e.key === "ArrowDown") {
      player.bottomKey = false;
    } else if (e.key === "ArrowLeft") {
      player.leftKey = false;
    }
  });
}

var img = new Image();
img.src = "https://img.unocero.com/2012/04/libertaed-pixel-cup.jpg";
img.addEventListener("load", () => {
  // Canvas/context
  var cvs = document.getElementById("canvas");
  cvs.width = 300;
  cvs.height = 200;
  var ctx = cvs.getContext("2d");

  // Entities
  const map = new MapRegion(img);
  const player = new Player();
  const camera = new Camera();
  const controls = new Controls(player);

  const loop = () => {
    requestAnimationFrame(loop);

    // Reset
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    // Reposition player
    player.update(map);

    // Focus camera
    camera.focus(cvs, map, player);
    // Flip the sign b/c positive shifts the canvas to the right, negative - to the left
    ctx.translate(-camera.x, -camera.y);

    // Draw
    map.draw(ctx);
    player.draw(ctx);
  };

  requestAnimationFrame(loop);
});
