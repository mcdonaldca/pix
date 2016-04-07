function Mirror() {
  this.BLOCK = 16;
  this.MULT = 4;

  this.mirror = $("#mirror");
  this.doppelganger = $(".npc-doppelganger");
  this.avatar = $("#doppelganger");

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

Mirror.prototype.getAreaObjects = function() {
  return this.areaObjects;
}

Mirror.prototype.createAreaObjects = function() {
  var doppelganger = document.createElement("div");
  $(doppelganger).addClass("npc npc-doppelganger")
                 .css("display", "none")
                 .css("left", ((8 * this.BLOCK - 3) * this.MULT).toString() + "px")
                 .css("bottom", ((13 * this.BLOCK - 1) * this.MULT).toString() + "px");
  var avatar = document.createElement("div");
  $(avatar).addClass("avatar")
           .attr("id", "doppelganger")
           .css("background-image", "url(img/characters/adele.svg)");
  var shadow = document.createElement("div");
  $(shadow).addClass("shadow");
  var shadow_img = document.createElement("img");
  $(shadow_img).attr("src", "img/characters/shadow_sm.svg");
  $(shadow).append(shadow_img);
  $(doppelganger).append(avatar)
                 .append(shadow);
  this.areaObjects.push(doppelganger);

  var mirror = document.createElement("div");
  $(mirror).addClass("item")
           .attr("id", "mirror")
           .css("display", "block")
           .css("z-index", "4")
           .css("height", (4 * this.BLOCK * this.MULT).toString() + "px")
           .css("width", (9 * this.BLOCK * this.MULT).toString() + "px")
           .css("left", (8 * this.BLOCK * this.MULT).toString() + "px")
           .css("bottom", (13 * this.BLOCK * this.MULT).toString() + "px");
  var mirror_img = document.createElement("img");
  $(mirror_img).attr("src", "img/items/mirror.svg");
  $(mirror).append(mirror_img);
  this.areaObjects.push(mirror);

  this.mirror = $(mirror);
  this.doppelganger = $(doppelganger);
  this.avatar = $(avatar);
}