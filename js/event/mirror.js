function Mirror() {
  this.x = 0;
  this.y = 0;

  this.areaObjects = [];
  this.createAreaObjects();
}

Mirror.prototype.begin = function(x, y, dir) {
  this.fireFace(dir);
  this.fireMove(x, y);
  this.doppelganger.show();
}

Mirror.prototype.fireFace = function(dir) {
  switch(dir) {
    case "lf":
      this.avatar.css("background-position", "0 " + (-87 * MULT).toString() + "px");
      break;

    case "up":
      this.avatar.css("background-position", "0 0");
      break;

    case "rt":
      this.avatar.css("background-position", "0 " + (-29 * MULT).toString() + "px");
      break;

    case "dw":
      this.avatar.css("background-position", "0 " + (-58 * MULT).toString() + "px");
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

  this.doppelganger.css("left", (this.x * BLOCK - 3) * MULT);
  this.doppelganger.css("bottom", (this.y * BLOCK - 1) * MULT);
}

Mirror.prototype.end = function() {
  this.doppelganger.hide();
}

Mirror.prototype.getAreaObjects = function() {
  return this.areaObjects;
}

Mirror.prototype.createAreaObjects = function() {
  var doppelganger = document.createElement("div");
  $(doppelganger).addClass("npc npc-doppelganger")
                 .css("display", "none")
                 .css("left", ((8 * BLOCK - 3) * MULT).toString() + "px")
                 .css("bottom", ((13 * BLOCK - 1) * MULT).toString() + "px");
  var avatar = document.createElement("div");
  $(avatar).addClass("avatar")
           .css("background-image", "url(img/characters/adele.svg)");
  var shadow = document.createElement("div");
  $(shadow).addClass("shadow");
  var shadowImg = document.createElement("img");
  $(shadowImg).attr("src", "img/characters/shadow_sm.svg");
  $(shadow).append(shadowImg);
  $(doppelganger).append(avatar)
                 .append(shadow);
  this.areaObjects.push(doppelganger);

  var mirror = document.createElement("div");
  $(mirror).addClass("item")
           .css("display", "block")
           .css("z-index", "4")
           .css("height", (4 * BLOCK * MULT).toString() + "px")
           .css("width", (9 * BLOCK * MULT).toString() + "px")
           .css("left", (8 * BLOCK * MULT).toString() + "px")
           .css("bottom", (13 * BLOCK * MULT).toString() + "px");
  var mirrorImg = document.createElement("img");
  $(mirrorImg).attr("src", "img/items/mirror.svg");
  $(mirror).append(mirrorImg);
  this.areaObjects.push(mirror);

  this.mirror = $(mirror);
  this.doppelganger = $(doppelganger);
  this.avatar = $(avatar);
}