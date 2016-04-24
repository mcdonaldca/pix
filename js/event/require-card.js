/**
  The RequireCard object checks for the player's library card.
**/
function RequireCard() {
}

/**
  Called when the require card event should begin (when event zone entered).
**/
RequireCard.prototype.begin = function() {
  if (!game.player.hasLibraryCard()) {
    game.startWalkthrough("no-library-card");
  }
}

/**
  Event functions (unused here);
**/
RequireCard.prototype.fireFace = function() {}
RequireCard.prototype.fireMove = function() {}
RequireCard.prototype.fireWalkStart = function() {}
RequireCard.prototype.fireWalkStop = function() {}
RequireCard.prototype.end = function() {}
RequireCard.prototype.getElements = function() { return []; }