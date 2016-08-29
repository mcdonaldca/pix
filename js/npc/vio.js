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

  if (dir == DIR.LF) {
    this.faceRight();
  } else if (dir == DIR.UP) {
    this.faceDown();
  } else if (dir == DIR.RT) {
    this.faceLeft();
  } else if (dir == DIR.DW) {
    this.faceUp();
  } 

  this.reactLove();
  return "free";
}

// Add Vio object to game's NPC collection.
var vio = new Vio();
game.addNPC(vio.name, vio);