/**
  The Avatar object handles display changes for any sprite.
  @param avatar   The avatar element (should contain sprite element).
  @param reaction The element used to display reactions.
  @param sprite   The sprite element (should have a sprite backgroud image).
**/
function Avatar(avatar, reaction, sprite) {
  this.avatarEl = avatar;     // The avatar element (contains sprite).
  this.reactionEl = reaction; // The reaction element.
  this.spriteEl = sprite;     // The sprite element.

  this.spriteImageURL = "img/characters/adele.svg";

  // Sprite constant values.
  this.SPRITE_WIDTH = 23;
  this.SPRITE_HEIGHT = 29;
  this.X_OFFSET = 3;
  this.Y_OFFSET = 12;

  this.x = 0;
  this.y = 0;
  this.face = 0;
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
  Initializes surprise reaction for avatar.
**/
Avatar.prototype.reactSurprise = function() {
  this.reactionEl.addClass("react-surprise");
  var avatar = this;
  setTimeout(function() {
    avatar.reactionEl.removeClass("react-surprise");
  }, 1000);
}

/**
  Initializes love reaction for avatar.
**/
Avatar.prototype.reactLove = function() {
  this.reactionEl.addClass("react-love");
  var avatar = this;
  setTimeout(function() {
    avatar.reactionEl.removeClass("react-love");
  }, 1000);
}

/**
  Initializes wat reaction for avatar.
**/
Avatar.prototype.reactWat = function() {
  this.reactionEl.addClass("react-wat");
  var avatar = this;
  setTimeout(function() {
    avatar.reactionEl.removeClass("react-wat");
  }, 2000);
}

/**
  Initializes sleep reaction for avatar.
**/
Avatar.prototype.reactSleep = function() {
  this.reactionEl.addClass("react-sleep");
  var avatar = this;
  setTimeout(function() {
    avatar.reactionEl.removeClass("react-sleep");
  }, 4000);
}

/**
  Calls setPosition with new x value.
  @param x The left offset in blocks.
**/
Avatar.prototype.setLeft = function(x) {
  this.setPosition(x, this.y);
}

/**
  Calls setPosition with new y value.
  @param y The bottom offset in blocks.
**/
Avatar.prototype.setBottom = function(y) {
  this.setPosition(this.x, y);
}

/**
  Sets the transform value + z-index for the avatar.
  @param x The left offset in blocks.
  @param y The bottom offset in blocks.
**/
Avatar.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;

  var translateX = ((x * BLOCK - this.X_OFFSET) * MULT).toString() + "px";
  var translateY = ((y * BLOCK - this.Y_OFFSET) * MULT).toString() + "px";

  this.avatarEl.css("transform", "translate(" + translateX + ", " + translateY + ")");

  this.avatarEl.css("z-index", (y + 1) * 10);
  if (this.reactionEl != null) {
    this.reactionEl.css("z-index", (y + 1) * 10 + 1);
  }
};

/**
  Adjusts sprite to face left.
**/
Avatar.prototype.faceLeft = function() {
  this.face = "lf";
  this.spriteEl.css("background-position", "0 " + (-3 * this.SPRITE_HEIGHT * MULT).toString() + "px");
}

/**
  Adjusts sprite to face up.
**/
Avatar.prototype.faceUp = function() {
  this.face = "up";
  this.spriteEl.css("background-position", "0 " + (-2 * this.SPRITE_HEIGHT * MULT).toString() + "px");
}

/**
  Adjusts sprite to face right.
**/
Avatar.prototype.faceRight = function() {
  this.face = "rt";
  this.spriteEl.css("background-position", "0 " + (-1 * this.SPRITE_HEIGHT * MULT).toString() + "px");
}

/**
  Adjusts sprite to face down.
**/
Avatar.prototype.faceDown = function() {
  this.face = "dw";
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
  this.spriteEl.addClass("sprite");
}

/**
  Sets the background image for the avatar's sprite.
  @param url The url (or dataURL) for the avatar.
**/
Avatar.prototype.setBackgroundImage = function(url) {
  this.spriteEl.css("background-image", "url(" + url + ")");
  this.spriteImageURL = url;
}