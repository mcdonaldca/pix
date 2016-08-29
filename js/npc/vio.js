/** 
  Vio is a test pet.
**/
function Vio() {
  $.extend(this, new NPC("vio", "pets/white-cat", "shadow_sm"));
}

/**
  Called when the player interacts with Vio.
  @param prompt (Not used here) The interface to the on-screen prompter.
  @param dir    The direction the user is facing.
  @return The current game status.
**/
Vio.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;

  if (dir == "lf") {
    this.faceRight();
  } else if (dir == "up") {
    this.faceDown();
  } else if (dir == "rt") {
    this.faceLeft();
  } else if (dir == "dw") {
    this.faceUp();
  } 

  this.reactLove();
  return "free";
}

// Add Vio object to game's NPC collection.
var vio = new Vio();
game.addNPC(vio.name, vio);