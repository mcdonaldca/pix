function Mirror() {
  this.mirror = $("#mirror");
  this.doppelganger = $(".npc-doppelganger");
  this.avatar = $("#doppelganger");

  this.x = 0;
  this.y = 0;

  this.BLOCK = 16;
  this.MULT = 4;
}

Mirror.prototype.begin = function(x, y, dir) {
  this.fireFace(dir);
  this.fireMove(x, y);
  this.doppelganger.show();
}

Mirror.prototype.fireFace = function(dir) {
  switch(dir) {
    case "lf":
      this.avatar.css("background-position", "0 " + (-87 * this.MULT).toString() + "px");
      break;

    case "up":
      this.avatar.css("background-position", "0 0");
      break;

    case "rt":
      this.avatar.css("background-position", "0 " + (-29 * this.MULT).toString() + "px");
      break;

    case "dw":
      this.avatar.css("background-position", "0 " + (-58 * this.MULT).toString() + "px");
      break;

    default:
      break;
  }
}

Mirror.prototype.fireMove = function(x, y) {
  this.x = x;

  if (y == 10) { this.y = 15; }
  else if (y == 11) { this.y = 14; }
  else { this.y = 13 ;}

  this.doppelganger.css("left", (this.x * this.BLOCK - 3) * this.MULT);
  this.doppelganger.css("bottom", (this.y * this.BLOCK - 1) * this.MULT);
}

Mirror.prototype.end = function() {
  this.doppelganger.hide();
}