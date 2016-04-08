/**
  The Mirror object is for a mirror event zone. 
  Manages the copy of the user's avatar.
**/
function Mirror() {
  this.x = 0; // Current x coordinate of doppelganger. 
  this.y = 0; // Current y coordinate of doppelganger.

  // Following variables are set in Mirror.createElements
  this.mirror = undefined;       // The mirror HTML element.
  this.avatar = undefined;       // The doppelganger Avatar.

  this.elements = []; // HTML elements for the functional Mirror.
  this.createElements();
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
  this.avatar.show();
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

  this.avatar.setLeft(this.x);
  this.avatar.setBottom(this.y);
}

/**
  Called when the mirror event should end (when event zone exited).
**/
Mirror.prototype.end = function() {
  this.avatar.hide();
}

/**
  Getter for Mirror.elements.
  @return Array A list of elements.
**/
Mirror.prototype.getElements = function() {
  return this.elements;
}

/** 
  Generates the necessary HTML elements & adds them to Mirror.elements.
**/
Mirror.prototype.createElements = function() {
  /* Ouput HTML:
      <div class="npc npc-doppelganger">
        <div class="avatar" id="doppelganger"></div>
        <div class="shadow">
          <img src="img/characters/shadow_sm.svg">
        </div>
      </div>
  */

  var doppelganger = document.createElement("div");
  $(doppelganger).addClass("npc npc-doppelganger");
  var sprite = document.createElement("div");
  $(sprite).addClass("sprite")
           .css("background-image", "url(img/characters/adele.svg)");
  var shadow = document.createElement("div");
  $(shadow).addClass("shadow")
           .css("background-image", "url(img/characters/shadow_sm.svg)");
  $(doppelganger).append(sprite)
                 .append(shadow);
  this.elements.push(doppelganger);

  /* Output HTML:
      <div id="mirror" class="item">
        <img src="img/items/mirror.svg">
      </div>
  */

  var mirror = document.createElement("div");
  $(mirror).addClass("item item-mirror")
           .css("display", "block")
           .css("z-index", "3")
           .css("height", (4 * BLOCK * MULT).toString() + "px")
           .css("width", (11 * BLOCK * MULT).toString() + "px")
           .css("left", (7 * BLOCK * MULT).toString() + "px")
           .css("bottom", (13 * BLOCK * MULT).toString() + "px")
           .css("background-image", "url(img/items/apt-1/mirror.svg)");
  this.elements.push(mirror);

  // Save necessary HTML elements.
  this.mirror = $(mirror);
  this.avatar = new Avatar($(doppelganger), $(sprite));
  this.avatar.hide();
  this.avatar.setLeft(8);
  this.avatar.setBottom(13);
}