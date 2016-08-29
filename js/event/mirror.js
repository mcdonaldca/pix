/**
  The Mirror object is for a mirror event zone. 
  Manages the copy of the user's avatar.
**/
function Mirror() {
  this.x = 0; // Current x coordinate of doppelganger. 
  this.y = 0; // Current y coordinate of doppelganger.

  // Following variables are set in Mirror.createElements
  this.mirror = undefined;       // The mirror HTML element.
  this.doppelganger = undefined;       // The doppelganger Avatar.

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
  this.doppelganger.show();
}

/**
  Event fired when player changes the direction they're facing.
  @param dir The direction the player is facing.
**/
Mirror.prototype.fireFace = function(dir) {
  switch(dir) {
    case DIR.LF:
      this.doppelganger.faceLeft();
      break;

    case DIR.UP:
      this.doppelganger.faceDown();
      break;

    case DIR.RT:
      this.doppelganger.faceRight();
      break;

    case DIR.DW:
      this.doppelganger.faceUp();
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
  if (y == 7) { this.y = 2; }
  else if (y == 6) { this.y = 3; }
  else { this.y = 4 ;}

  this.doppelganger.setPosition(this.x, this.y);
}

/**
  Event fired when player starts walking animation.
  @param dir The walking direction.
**/
Mirror.prototype.fireWalkStart = function(dir) {
  switch(dir) {
    case DIR.LF:
      this.doppelganger.walk(DIR.LF);
      break;

    case DIR.UP:
      this.doppelganger.walk(DIR.DW);
      break;

    case DIR.RT:
      this.doppelganger.walk(DIR.RT);
      break;

    case DIR.DW:
      this.doppelganger.walk(DIR.UP);
      break;

    default:
      break;
  }
}

/**
  Event fired when player stops walking animation.
**/
Mirror.prototype.fireWalkStop = function() {
  this.doppelganger.stopWalking();
}

/**
  Called when the mirror event should end (when event zone exited).
**/
Mirror.prototype.end = function() {
  this.doppelganger.hide();
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
  var doppelganger = new Avatar(
    false, 
    'doppelganger', 
    'characters/adele', 
    'shadow_sm'
  );
  this.elements.push(doppelganger.getEl());

  /* Output HTML:
      <div id="mirror" class="item">
        <img src="img/items/mirror.svg">
      </div>
  */
  var translateX = (7 * BLOCK * MULT).toString() + "px";
  var translateY = (1 * BLOCK * MULT).toString() + "px";

  var mirror = document.createElement("div");
  $(mirror).addClass("item item-mirror")
           .css("display", "block")
           .css("z-index", "55")
           .css("height", (4 * BLOCK * MULT).toString() + "px")
           .css("width", (11 * BLOCK * MULT).toString() + "px")
           .css("transform", "translate(" + translateX + ", " + translateY + ")")
           .css("background-image", "url(img/items/apt-1/mirror.svg)");
  this.elements.push(mirror);

  // Save necessary HTML elements.
  this.mirror = $(mirror);
  this.doppelganger = doppelganger;
  this.doppelganger.hide();
}