/**
  Simon is a character in the game.
**/
function Simon() {
  $.extend(this, new NPC('simon', 'characters/simon', 'shadow_lg'));
}

/**
  Called when the player interacts with Simon.
  @param prompt The interface to the on-screen prompter.
  @param dir    The direction the user is facing.
  @return The current game status.
**/
Simon.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return 'free';
}

// Add Simon object to game's NPC collection.
var simon = new Simon();
game.addNPC(simon.name, simon);