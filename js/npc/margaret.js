/**
  Margaret is a character in the game.
**/
function Margaret() {
  $.extend(this, new NPC("margaret", "characters/margaret", "shadow_sm"));
}

/**
  Called when the player interacts with Margaret.
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Margaret.prototype.interact = function(prompt, dir) {
  
}

// Add Margaret object to game's NPC collection.
var margaret = new Margaret();
game.addNPC(margaret.name, margaret);