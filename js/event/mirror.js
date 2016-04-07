/**
  The Mirror object is for a mirror event zone. 
  Manages the copy of the user's avatar.
**/
function Mirror() {
  this.x = 0; // Current x coordinate of doppelganger. 
  this.y = 0; // Current y coordinate of doppelganger.

  // Following variables are set in Mirror.createAreaElements
  this.mirror = undefined;       // The mirror HTML element.
  this.doppelganger = undefined; // The doppelganger HTML element.
  this.avatar = undefined;       // The doppelganger's avatar HTML element.

  this.areaElements = []; // HTML elements for the functional Mirror.
  this.createAreaElements();
}

/**
  Called when the mirror event should begin (when event zone entered).
  @param x   The x coordinate of the player.
  @param y   The y coordinate of the player.
  @param dir The direction the player is facing.
**/
Mirror.prototype.begin = function(x, y, dir) {
  this.fireFace(dir);
  this.fireMove(x, y);
  this.doppelganger.show();
}

/**
  Event fired when player changes the direction they're facing.
  @param dir The direction the player is facing.
**/
Mirror.prototype.fireFace = function(dir) {
  switch(dir) {
    case "lf":
      this.avatar.faceLeft();
      break;

    case "up":
      this.avatar.faceDown();
      break;

    case "rt":
      this.avatar.faceRight();
      break;

    case "dw":
      this.avatar.faceUp();
      break;

    default:
      break;
  }
}

/**
  Event fired when player moves.
  @param x The x coordinate of the player.
  @param y The y coordinate of the player.
**/
Mirror.prototype.fireMove = function(x, y) {
  this.x = x;

  // Doppelganger mirrors on x-axis.
  if (y == 10) { this.y = 15; }
  else if (y == 11) { this.y = 14; }
  else { this.y = 13 ;}

  this.doppelganger.css("left", (this.x * BLOCK - 3) * MULT);
  this.doppelganger.css("bottom", (this.y * BLOCK - 1) * MULT);
}

/**
  Called when the mirror event should end (when event zone exited).
**/
Mirror.prototype.end = function() {
  this.doppelganger.hide();
}

/**
  Getter for Mirror.areaElements.
  @return Array A list of elements.
**/
Mirror.prototype.getAreaElements = function() {
  return this.areaElements;
}

/** 
  Generates the necessary HTML elements & adds them to Mirror.areaElements.
**/
Mirror.prototype.createAreaElements = function() {
  /* Ouput HTML:
      <div class="npc npc-doppelganger">
        <div class="avatar" id="doppelganger"></div>
        <div class="shadow">
          <img src="img/characters/shadow_sm.svg">
        </div>
      </div>
  */

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
  this.areaElements.push(doppelganger);

  /* Output HTML:
      <div id="mirror" class="item">
        <img src="img/items/mirror.svg">
      </div>
  */

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
  this.areaElements.push(mirror);

  // Save necessary HTML elements.
  this.mirror = $(mirror);
  this.doppelganger = $(doppelganger);
  this.avatar = new Avatar($(avatar));
}