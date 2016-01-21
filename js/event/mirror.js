function Mirror() {
  this.mirror = $("#mirror");
  this.doppelganger = $(".npc-doppelganger");
  this.avatar = $("#doppelganger");

  this.x = 0;
  this.y = 0;

  this.BLOCK = 16;
  this.MULT = 2;
}

Mirror.prototype.begin = function(x, y, dir) {
  this.fireFace(dir);
  this.fireMove(x, y);
  this.doppelganger.show();
}

Mirror.prototype.fireFace = function(dir) {
  switch(dir) {
    case "lf":
      this.avatar.css("background-image", "url(img/characters/adele_left.svg)");
      break;

    case "up":
      this.avatar.css("background-image", "url(img/characters/adele_front.svg)");
      break;

    case "rt":
      this.avatar.css("background-image", "url(img/characters/adele_right.svg)");
      break;

    case "dw":
      this.avatar.css("background-image", "url(img/characters/adele_back.svg)");
      break;

    default:
      break;
  }
}

Mirror.prototype.fireMove = function(x, y) {
  this.x = x;

  if (y == 11) { this.y = 14; }
  else { this.y = 13 ;}

  this.doppelganger.css("left", this.x * this.BLOCK * this.MULT);
  this.doppelganger.css("bottom", this.y * this.BLOCK * this.MULT);
}

Mirror.prototype.end = function() {
  this.doppelganger.hide();
}