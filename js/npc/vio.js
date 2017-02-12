/** 
  Vio is a test pet.
**/
function Vio() {
  $.extend(this, new NPC("vio", "pets/white-cat", "shadow_sm", SCHEDULE, SCHEDULE_STATUSES));
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