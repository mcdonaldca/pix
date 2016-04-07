/**
  The Avatar object handles directional facing for any sprite.
  @param el The avatar element (should have a sprite backgroud image).
**/
function Avatar(el) {
  this.el = el // The avatar element.
}

/**
  Adjusts sprite to face left.
**/
Avatar.prototype.faceLeft = function() {
  this.el.css("background-position", "0 " + (-87 * MULT).toString() + "px");
}

/**
  Adjusts sprite to face up.
**/
Avatar.prototype.faceUp = function() {
  this.el.css("background-position", "0 " + (-58 * MULT).toString() + "px");
}

/**
  Adjusts sprite to face right.
**/
Avatar.prototype.faceRight = function() {
  this.el.css("background-position", "0 " + (-29 * MULT).toString() + "px");
}

/**
  Adjusts sprite to face down.
**/
Avatar.prototype.faceDown = function() {
  this.el.css("background-position", "0 0");
}