/**
  The Pool object is for a pool event zone. 
  Places a semi-transparent layer over the user + water.
**/
function Pool() {
  // Following variables are set in Mirror.createElements
  this.water = undefined;       // The mirror HTML element.
  this.elements = []; // HTML elements for the functional Mirror.
  this.createElements();

  // Pool constraints.
  this.X_MIN = 21;
  this.X_MAX = 25;
  this.Y_MIN = 3;
  this.Y_MAX = 9;
}

/**
  Called when the water event should begin (when event zone entered).
  @param x   The x coordinate of the player.
  @param y   The y coordinate of the player.
  @param dir The direction the player is facing.
**/
Pool.prototype.begin = function(x, y, dir) {
  this.fireMove(x, y);
  // If entering pool from the bottom
  if (y == this.Y_MAX && x != this.X_MIN) {
    var pool = this;
    // Don't have water appear right away (avoids flash)
    setTimeout(function() {
      pool.water.show();
    }, ANIM_LENGTH * 2 / 3)
  } else {
    this.water.show();
  }
}

/**
  Event fired when player changes the direction they're facing.
  @param dir The direction the player is facing.
**/
Pool.prototype.fireFace = function(dir) {
  // Not used in this event zone.
}

/**
  Event fired when player moves.
  @param x The x coordinate of the player.
  @param y The y coordinate of the player.
**/
Pool.prototype.fireMove = function(x, y) {
  // Restrictive in case the event zone exceeds pool size.
  if ((x >= this.X_MIN && x <= this.X_MAX) && y >= this.Y_MIN && y <= this.Y_MAX) {
    translateX = 0;
    if (x == this.X_MIN) {
      translateX = ((x * BLOCK + 3) * MULT).toString() + "px";
    } else {
      translateX = (x * BLOCK * MULT).toString() + "px";
    }
    var translateY = (y * BLOCK * MULT).toString() + "px";
    this.water.css("transform", "translate(" + translateX + ", " + translateY + ")")
  }
}

/**
  Event fired when player starts walking animation.
  @param dir The walking direction.
**/
Pool.prototype.fireWalkStart = function(dir) {
  // Not used in this event zone.
}

/**
  Event fired when player stops walking animation.
**/
Pool.prototype.fireWalkStop = function() {
  // Not used in this event zone.
}

/**
  Called when the pool event should end (when event zone exited).
**/
Pool.prototype.end = function() {
  this.water.hide();
}

/**
  Getter for Pool.elements.
  @return Array A list of elements.
**/
Pool.prototype.getElements = function() {
  return this.elements;
}

/** 
  Generates the necessary HTML elements & adds them to Mirror.elements.
**/
Pool.prototype.createElements = function() {
  /* Ouput HTML:
      <div class="item item-water"></div>
  */

  var water = document.createElement("div");
  $(water).addClass("item item-water")
          .css("background-image", "url(img/items/apt-1/water.svg)")
          .css("height", (BLOCK * MULT).toString() + "px")
          .css("width",  (BLOCK * MULT).toString() + "px")
          .css("z-index", 400);
  this.elements.push(water);

  // Save necessary HTML elements.
  this.water = $(water);
  this.water.hide();
}