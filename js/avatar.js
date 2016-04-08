/**
  The Avatar object handles display changes for any sprite.
  @param avatar The avatar element (should contain sprite element).
  @param sprite The sprite element (should have a sprite backgroud image).
**/
function Avatar(avatar, sprite) {
  this.avatarEl = avatar; // The avatar element (contains sprite).
  this.spriteEl = sprite; // The sprite element.

  // Sprite constant values.
  this.SPRITE_WIDTH = 23;
  this.SPRITE_HEIGHT = 29;
  this.X_OFFSET = 3;
  this.Y_OFFSET = 1;
}

/**
  Shows the entire avatar.
**/
Avatar.prototype.show = function() {
  this.avatarEl.show();
}

/**
  Hides the entire avatar.
**/
Avatar.prototype.hide = function() {
  this.avatarEl.hide();
}

/**
  Sets the left value for the avatar.
  @param x The left offset in blocks.
**/
Avatar.prototype.setLeft = function(x) {
  this.avatarEl.css("left", ((x * BLOCK - this.X_OFFSET) * MULT).toString() + "px");
}

/**
  Sets the left value and z-index for the avatar.
  @param y          The bottom offset in blocks.
  @param areaHeight The height of the current area. (Optional, used to set z-index.)
**/
Avatar.prototype.setBottom = function(y, areaHeight) {
  this.avatarEl.css("bottom", ((y * BLOCK - this.Y_OFFSET) * MULT).toString() + "px");

  areaHeight = areaHeight || "";
  if (areaHeight != "") {
    this.avatarEl.css("z-index", (areaHeight - y) * 10);
  }
}

/**
  Adjusts sprite to face left.
**/
Avatar.prototype.faceLeft = function() {
  this.spriteEl.css("background-position", "0 " + (-3 * this.SPRITE_HEIGHT * MULT).toString() + "px");
}

/**
  Adjusts sprite to face up.
**/
Avatar.prototype.faceUp = function() {
  this.spriteEl.css("background-position", "0 " + (-2 * this.SPRITE_HEIGHT * MULT).toString() + "px");
}

/**
  Adjusts sprite to face right.
**/
Avatar.prototype.faceRight = function() {
  this.spriteEl.css("background-position", "0 " + (-1 * this.SPRITE_HEIGHT * MULT).toString() + "px");
}

/**
  Adjusts sprite to face down.
**/
Avatar.prototype.faceDown = function() {
  this.spriteEl.css("background-position", "0 0");
}

/**
  Called to begining sprite's walking animation.
  @param dir The direction to walk in.
**/
Avatar.prototype.walk = function(dir) {
  switch(dir) {
    case "lf":
      this.spriteEl.addClass("walk-left");
      break;

    case "up":
      this.spriteEl.addClass("walk-up");
      break;
      
    case "rt":
      this.spriteEl.addClass("walk-right");
      break;
      
    case "dw":
      this.spriteEl.addClass("walk-down");
      break;

    default:
      break;
  }
}

/**
  Called to stop walking animation.
**/
Avatar.prototype.stopWalking = function() {
  this.spriteEl.removeClass();
}